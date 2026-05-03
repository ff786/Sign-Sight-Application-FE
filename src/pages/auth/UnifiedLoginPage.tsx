import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

export default function UnifiedLoginPage() {
  const [isMentor, setIsMentor] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (!emailOrUsername || !password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }
      if (isMentor) {
        // Mentor login: use email directly
        console.log('Attempting mentor login with email:', emailOrUsername);
        const userCredential = await signInWithEmailAndPassword(auth, emailOrUsername, password);
        console.log('Mentor login successful:', userCredential.user.email);
        
        // Update AuthContext
        await authLogin(emailOrUsername, 'mentor');
        localStorage.setItem('mentorEmail', emailOrUsername);
        
        console.log('Navigating to /mentorDash');
        navigate('/mentorDash');
      } else {
        // Student login: lookup by username, then login with email
        const { data: studentData } = await axios.get(`/api/students/by-username/${emailOrUsername}`);
        if (!studentData) {
          setError('Username not found 👀');
          setIsLoading(false);
          return;
        }
        await signInWithEmailAndPassword(auth, studentData.email, password);
        
        // Update AuthContext
        await authLogin(studentData.email, 'student');
        localStorage.setItem('studentName', studentData.username);
        localStorage.setItem('studentUserId', studentData._id);
        localStorage.setItem('studentFullName', studentData.name);
        localStorage.setItem('studentEmail', studentData.email);
        
        navigate('/student/landing');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(getFirebaseErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  function getFirebaseErrorMessage(error: any) {
    // Axios HTTP errors (e.g. 404 username not found)
    if (error?.response) {
      const status = error.response.status;
      if (status === 404) return 'Username not found 👀';
      if (status === 500) return 'Server error. Try again later 🌐';
      return error.response.data?.message || 'Login failed. Please try again 😕';
    }
    const code = error?.code || '';
    switch (code) {
      case 'auth/user-not-found':
        return isMentor ? 'No mentor account found 👀' : 'No account found 👀';
      case 'auth/wrong-password':
        return 'Incorrect password 🔑';
      case 'auth/invalid-email':
        return isMentor ? 'Invalid email address ✉️' : 'Invalid credentials ✉️';
      case 'auth/network-request-failed':
        return 'Network error. Try again 🌐';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later ⏰';
      default:
        return 'Login failed. Please try again 😕';
    }
  }

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-yellow-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-700 rounded-lg shadow-lg mb-4">
              <span className="text-white font-bold text-2xl">🤟</span>
            </div>
            <h1 className="text-3xl font-bold text-yellow-900">SignSight</h1>
            <p className="text-gray-600 mt-2">
              {isMentor ? 'Mentor Portal' : 'Student Login'}
            </p>
          </div>
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isMentor}
                onChange={(e) => setIsMentor(e.target.checked)}
                className="w-5 h-5 text-yellow-600 rounded accent-yellow-600"
              />
              <span className="ml-3 font-semibold text-gray-700">
                {isMentor ? 'Mentor Login' : 'Switch to Mentor Login'}
              </span>
            </label>
            <p className="text-xs text-gray-600 mt-2">
              {isMentor ? 'Are you a student instead?' : 'Are you a mentor instead?'}
            </p>
          </div>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {isMentor ? 'Email Address' : 'Username'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-yellow-600" size={20} />
                <input
                  type={isMentor ? 'email' : 'text'}
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder={isMentor ? 'your@email.com' : 'student username'}
                  className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-yellow-600" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-600 hover:text-yellow-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-yellow-600 rounded accent-yellow-600"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-yellow-700 text-white font-bold rounded-lg shadow-sm hover:bg-yellow-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-gray-500 text-sm">or</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="py-2 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all text-xl">👤</button>
            <button className="py-2 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all text-xl">f</button>
            <button className="py-2 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all text-xl">G</button>
          </div>
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-yellow-600 font-bold hover:text-yellow-700">
              Create one now
            </Link>
          </p>

          {/* Admin Login Button */}
          <div className="mt-4">
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full py-3 bg-gray-800 text-white font-bold rounded-lg shadow-sm hover:bg-gray-900 transition-all flex items-center justify-center space-x-2"
            >
              <span>🛡️</span>
              <span>Admin Login</span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-700">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Email: demo@example.com</p>
            <p>Password: password123</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-yellow-600 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}


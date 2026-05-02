import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function UnifiedLoginPage() {
  const [isMentor, setIsMentor] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email');
        return;
      }

      const role = isMentor ? 'mentor' : 'student';
      await login(email, role);

      // Redirect based on role
      if (isMentor) {
        navigate('/mentorDash');
      } else {
        navigate('/student/landing');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-yellow-100">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg mb-4">
              <span className="text-white font-bold text-2xl">🤟</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              SignSight
            </h1>
            <p className="text-gray-600 mt-2">
              {isMentor ? 'Mentor Portal' : 'Student Login'}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
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

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-yellow-600" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
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

            {/* Remember & Forgot */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-gray-500 text-sm">or</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-3">
            <button className="py-2 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all text-xl">
              👤
            </button>
            <button className="py-2 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all text-xl">
              f
            </button>
            <button className="py-2 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all text-xl">
              G
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-yellow-600 font-bold hover:text-yellow-700">
              Create one now
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-700">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Email: demo@example.com</p>
            <p>Password: password123</p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-yellow-600 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '../../firebase';
//import { useToast } from "../../hooks/useToast";

export default function UnifiedSignupPage() {
  const [isMentor, setIsMentor] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    username: '', // Only for students
    age: '', // Only for students
    gender: '', // Only for students
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      newErrors.terms = 'You must agree to terms';
    }
    if (!isMentor) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }
      if (!formData.age.trim()) {
        newErrors.age = 'Age is required';
      }
      if (!formData.gender.trim()) {
        newErrors.gender = 'Gender is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    let firebaseUser = null;
    try {
      // Step 1: Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      firebaseUser = userCred.user;
      if (isMentor) {
        // Step 2: Save mentor to DB
        await axios.post('/api/mentors', {
          name: formData.name,
          email: formData.email,
          firebaseUid: firebaseUser.uid,
        });
        localStorage.clear();
        localStorage.setItem('mentorEmail', formData.email);
        navigate('/mentorDash');
      } else {
        // Step 2: Save student to DB
        await axios.post('/api/students', {
          username: formData.username,
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age),
          gender: formData.gender,
          firebaseUid: firebaseUser.uid,
        });
        localStorage.clear();
        localStorage.setItem('studentName', formData.username);
        localStorage.setItem('studentFullName', formData.name);
        localStorage.setItem('studentEmail', formData.email);
        navigate('/student/landing');
      }
    } catch (err: any) {
      // If Firebase Auth succeeded but DB failed, delete the auth user
      if (firebaseUser) {
        try { await deleteUser(firebaseUser); } catch (_) {}
      }
      setErrors({ submit: getErrorMessage(err) });
    } finally {
      setIsLoading(false);
    }
  };

  function getErrorMessage(error: any) {
    if (error?.response) {
      return error.response.data?.message || 'Server error. Please try again 🌐';
    }
    const code = error?.code || '';
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered 📧';
      case 'auth/invalid-email':
        return 'Please enter a valid email address ✉️';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters 🔐';
      case 'auth/network-request-failed':
        return 'Network error. Check your connection 🌐';
      default:
        return 'Something went wrong. Please try again 😕';
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === 'checkbox' && 'checked' in e.target) {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-yellow-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-700 rounded-lg shadow-lg mb-4">
              <span className="text-white font-bold text-2xl">🤟</span>
            </div>
            <h1 className="text-3xl font-bold text-yellow-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join SignSight Community</p>
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
                {isMentor ? 'Register as Mentor' : 'Register as Student'}
              </span>
            </label>
            <p className="text-xs text-gray-600 mt-2">
              {isMentor ? 'You will have access to mentor dashboard' : 'You will be able to learn and take quizzes'}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isMentor && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-yellow-600" size={20} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="student123"
                    className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-yellow-600" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-yellow-600" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            {!isMentor && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-full border-2 border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-200 text-center"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-full border-2 border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-200 text-center"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.age && <p className="text-red-500 text-xs col-span-2">{errors.age}</p>}
                {errors.gender && <p className="text-red-500 text-xs col-span-2">{errors.gender}</p>}
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-yellow-600" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-yellow-600" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-600 hover:text-yellow-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
            <label className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="w-4 h-4 mt-1 text-yellow-600 rounded accent-yellow-600"
              />
              <span className="text-xs text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-yellow-600 hover:underline font-semibold">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-yellow-600 hover:underline font-semibold">Privacy Policy</Link>
              </span>
            </label>
            {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                <span className="text-red-500 text-xl">⚠️</span>
                <p className="text-red-700 text-xs">{errors.submit}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-yellow-700 text-white font-bold rounded-lg shadow-sm hover:bg-yellow-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <CheckCircle size={20} />
                </>
              )}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-600 font-bold hover:text-yellow-700">Sign in here</Link>
          </p>
        </div>
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-yellow-600 font-medium">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}


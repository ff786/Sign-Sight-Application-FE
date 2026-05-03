import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Edit2, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../Components/common/ProtectedRoute';

function ProfileContent() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: 'Lessons Completed', value: user?.role === 'student' ? '24' : '5', icon: '📚' },
    { label: 'Accuracy Rate', value: '92%', icon: '🎯' },
    { label: 'Total Hours', value: '42', icon: '⏰' },
    { label: 'Achievements', value: '8', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-yellow-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account and view your progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-yellow-100 sticky top-4">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full shadow-md mb-4 border-4 border-yellow-300"
                />
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-yellow-600 font-semibold uppercase text-sm mt-2">
                  {user?.role}
                </p>
              </div>

              {/* Info */}
              <div className="space-y-3 py-6 border-y border-gray-200">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail size={18} className="text-yellow-600" />
                  <span className="text-sm break-all">{user?.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Calendar size={18} className="text-yellow-600" />
                  <span className="text-sm">Member since May 2026</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-6">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full py-3 bg-yellow-700 text-white font-bold rounded-lg hover:bg-yellow-800 transition-all flex items-center justify-center space-x-2"
                >
                  <Edit2 size={18} />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all flex items-center justify-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 border border-yellow-100 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Activity Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { activity: 'Completed Lesson: Basic Signs', date: '2 hours ago', icon: '✅' },
                  { activity: 'Passed Quiz: Level 1', date: '1 day ago', icon: '🎯' },
                  { activity: 'Earned Badge: Fast Learner', date: '3 days ago', icon: '🏆' },
                  { activity: 'Joined Sign Learning Group', date: '1 week ago', icon: '👥' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.activity}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Goals</h3>
              <div className="space-y-4">
                {[
                  { goal: 'Learn 100 new signs', progress: 65 },
                  { goal: 'Achieve 95% accuracy', progress: 78 },
                  { goal: 'Complete intermediate level', progress: 45 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-gray-900">{item.goal}</p>
                      <p className="text-sm text-yellow-600 font-bold">{item.progress}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-yellow-700 h-full rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h3>
              <div className="grid grid-cols-4 gap-4">
                {['🌟', '⭐', '🏆', '🎖️', '🥇', '🥈', '🎗️', '✨'].map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow text-center"
                  >
                    <span className="text-3xl mb-2">{badge}</span>
                    <p className="text-xs font-semibold text-gray-700">Badge {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}


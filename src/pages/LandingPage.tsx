import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap, Users, Heart } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: '🎙️',
      title: 'Audio-Sign Conversion',
      description: 'Convert audio or spoken words into beautiful sign language animations instantly',
      link: '/convert',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: '📚',
      title: 'Sign Learning Platform',
      description: 'Learn sign language through interactive lessons with expert mentors',
      link: '/lessons',
      color: 'from-purple-400 to-purple-600',
      badge: 'Login Required'
    },
    {
      icon: '😊',
      title: 'Emotions Detection',
      description: 'Recognize and understand facial emotions in sign language',
      link: '/emotion_landing',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: '📹',
      title: 'Live Sign Detection',
      description: 'Real-time detection and translation of live sign language',
      link: '/detection',
      color: 'from-green-400 to-green-600'
    },
  ];

  const stats = [
    { number: '10K+', label: 'Students Learning', icon: '👥' },
    { number: '500+', label: 'Sign Variations', icon: '🤟' },
    { number: '98%', label: 'Accuracy Rate', icon: '🎯' },
    { number: '24/7', label: 'Available', icon: '⏰' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Breaking Barriers
              </h1>
              <p className="text-2xl text-gray-700">
                Through Sign Language Technology
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              SignSight is your comprehensive platform for learning, teaching, and mastering sign language through cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <span>Start Learning</span>
                <ArrowRight size={20} />
              </Link>
              <button className="px-8 py-4 border-2 border-yellow-500 text-yellow-700 font-bold rounded-lg hover:bg-yellow-50 transition-all flex items-center justify-center space-x-2">
                <Play size={20} />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-3xl shadow-2xl flex items-center justify-center group">
            <div className="text-9xl group-hover:scale-120 transition-transform">🤟</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-yellow-600">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to excel in sign language
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
            >
              {feature.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                  {feature.badge}
                </div>
              )}

              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>

              <div className={`h-1 w-16 bg-gradient-to-r ${feature.color} rounded-full group-hover:w-32 transition-all`}></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose SignSight?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI-Powered', desc: 'Machine learning adapts to your pace', icon: <Zap className="w-8 h-8 text-yellow-600" /> },
              { title: 'Expert Mentors', desc: 'Learn from professional instructors', icon: <Users className="w-8 h-8 text-yellow-600" /> },
              { title: 'Community', desc: 'Connect with thousands of learners', icon: <Heart className="w-8 h-8 text-yellow-600" /> },
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Start?</h2>
          <p className="text-xl opacity-90">
            Join thousands of learners today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white bg-opacity-20 text-white font-bold rounded-lg hover:bg-opacity-30 border-2 border-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

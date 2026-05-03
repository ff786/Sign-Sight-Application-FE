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
    <div className="min-h-screen bg-yellow-50 text-stone-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold text-stone-900">
                Breaking Barriers
              </h1>
              <p className="text-2xl text-stone-700">
                Through Sign Language Technology
              </p>
            </div>

            <p className="text-lg text-stone-600 leading-relaxed max-w-md">
              SignSight is your comprehensive platform for learning, teaching, and mastering sign language through cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-yellow-700 text-white font-bold rounded-lg shadow-sm hover:bg-yellow-800 transition-all flex items-center justify-center space-x-2"
              >
                <span>Start Learning</span>
                <ArrowRight size={20} />
              </Link>
              <button className="px-8 py-4 border-2 border-yellow-700 text-yellow-800 font-bold rounded-lg hover:bg-yellow-100 transition-all flex items-center justify-center space-x-2">
                <Play size={20} />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 bg-amber-100 border border-amber-200 rounded-3xl shadow-sm flex items-center justify-center group">
            <div className="text-9xl">🤟</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-y border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-sm text-center">
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-yellow-800">{stat.number}</div>
                <div className="text-stone-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-stone-600">
            Everything you need to excel in sign language
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-yellow-100"
            >
              {feature.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-700 text-white text-xs font-bold rounded-full">
                  {feature.badge}
                </div>
              )}

              <div className="text-6xl mb-4">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-stone-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-stone-600 mb-4">
                {feature.description}
              </p>

              <div className="h-1 w-16 bg-yellow-700 rounded-full"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-yellow-100 py-16 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-stone-900">Why Choose SignSight?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI-Powered', desc: 'Machine learning adapts to your pace', icon: <Zap className="w-8 h-8 text-yellow-800" /> },
              { title: 'Expert Mentors', desc: 'Learn from professional instructors', icon: <Users className="w-8 h-8 text-yellow-800" /> },
              { title: 'Community', desc: 'Connect with thousands of learners', icon: <Heart className="w-8 h-8 text-yellow-800" /> },
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center border border-yellow-100">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-stone-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-900 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Start?</h2>
          <p className="text-xl opacity-90">
            Join thousands of learners today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-yellow-100 text-yellow-900 font-bold rounded-lg hover:bg-yellow-200"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent text-yellow-100 font-bold rounded-lg hover:bg-yellow-800 border-2 border-yellow-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

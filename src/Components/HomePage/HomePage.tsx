import logo from '../../assets/logo-sign-sight.webp'
import heroVideo from '../../assets/nandri.mp4'

const HomePage = () => {
  return (
    <main className="min-h-screen bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Sign Sight" className="h-12 w-12 object-contain" />
            <h1 className="text-2xl font-extrabold text-yellow-900">Sign Sight</h1>
          </div>
          <nav className="space-x-4">
            <a href="/convert" className="px-4 py-2 rounded-full bg-yellow-600 text-white font-semibold">Try Converter</a>
          </nav>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl leading-tight font-extrabold text-yellow-900 mb-4">Transform audio into sign language — instantly</h2>
            <p className="text-gray-700 text-lg">Upload audio or video and let our AI convert speech to Tamil Sign Language animations and GIFs. Fast, accessible, and designed for real users.</p>
            <div className="flex items-center space-x-4">
              <a href="/convert" className="px-6 py-3 rounded-2xl bg-yellow-600 text-white font-bold shadow-lg transition-transform transform hover:-translate-y-1">Start Converting</a>
              <button
                type="button"
                onClick={() => document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-yellow-800 font-medium underline"
              >
                Learn how it works
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-yellow-900">Accessibility-first</h4>
                <p className="text-sm text-gray-600">Designed to help communicate across hearing differences.</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-yellow-900">Cloud-powered</h4>
                <p className="text-sm text-gray-600">Fast processing with Cloudinary-backed delivery.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <div className="p-4">
              <video autoPlay muted loop playsInline className="w-full h-64 object-cover rounded-md">
                <source src={heroVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <section id="learn" className="mt-16 bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-yellow-900 mb-4">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-yellow-50 rounded-lg transition hover:shadow-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Upload</h4>
              <p className="text-sm text-gray-700">Drop an audio or video file (WAV/MP3/MP4).</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg transition hover:shadow-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">AI Processing</h4>
              <p className="text-sm text-gray-700">Our model analyzes audio and maps words to sign animations or GIFs.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg transition hover:shadow-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">View & Share</h4>
              <p className="text-sm text-gray-700">Watch the generated sign preview, download or share the result.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomePage


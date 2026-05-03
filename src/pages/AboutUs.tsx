import logo from '../assets/logo-sign-sight.webp'

export default function AboutUs() {
  return (
    <main className="min-h-screen flex items-start justify-center bg-yellow-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center gap-4 mb-6">
          <img src={logo} alt="Sign Sight" className="w-14 h-14 object-contain" />
          <h1 className="text-2xl font-extrabold text-yellow-900">About Sign Sight</h1>
        </div>
        <p className="text-gray-700 leading-relaxed">Sign Sight was created to make communication more inclusive. We provide tools to convert audio to Tamil Sign Language animations, teach sign language lessons, and detect emotions visually to help bridge communication gaps.</p>
        <div className="mt-6">
          <h2 className="font-semibold text-yellow-900">Our mission</h2>
          <p className="text-gray-700 mt-2">To empower everyone with accessible, easy-to-use signing tools, learning materials, and AI-driven features that help people connect across hearing differences.</p>
        </div>
      </div>
    </main>
  )
}


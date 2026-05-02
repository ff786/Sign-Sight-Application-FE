const Footer = () => {
  return (
    <footer className="mt-12 bg-white/90 border-t py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
        <p className="font-medium">© {new Date().getFullYear()} Sign Sight — Powered by AI</p>
        <p className="mt-1">Built for accessibility and rapid speech-to-sign prototyping.</p>
      </div>
    </footer>
  )
}

export default Footer


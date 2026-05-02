import logoSignSight from '../../assets/logo-sign-sight.webp'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={logoSignSight} alt="Sign Sight" className="h-10 w-10 object-contain" />
          </Link>
          <h1 className="text-lg font-extrabold text-yellow-900">Sign Sight</h1>
        </div>

        <nav className="flex items-center space-x-4">
          <Link className="text-sm font-medium text-yellow-800 hover:underline" to="/">Home</Link>
          <Link className="text-sm font-medium text-yellow-800 hover:underline" to="/convert">Converter</Link>
          <a className="text-sm font-medium text-yellow-800 hover:underline" href="#">Docs</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar


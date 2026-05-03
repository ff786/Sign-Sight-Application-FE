import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo-sign-sight.webp'

export default function UnifiedFooter() {
  return (
	<footer className="bg-yellow-50 border-t border-yellow-100 mt-12">
	  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
		<div className="flex flex-col items-start space-y-4">
		  <div className="flex items-center gap-3">
			<img src={logo} alt="Sign Sight" className="w-12 h-12 object-contain" />
			<div>
              {/* Compact mobile footer - floating quick actions */}
              <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2 z-50 border border-yellow-100">
                <nav className="flex items-center justify-between px-2">
                  <NavLink to="/" className={({ isActive }) => `flex flex-col items-center text-xs gap-1 px-3 py-1 rounded-full ${isActive ? 'text-yellow-700' : 'text-gray-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>
                    <span>Home</span>
                  </NavLink>
                  <NavLink to="/convert" className={({ isActive }) => `flex flex-col items-center text-xs gap-1 px-3 py-1 rounded-full ${isActive ? 'text-yellow-700' : 'text-gray-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>Convert</span>
                  </NavLink>
                  <NavLink to="/lessons" className={({ isActive }) => `flex flex-col items-center text-xs gap-1 px-3 py-1 rounded-full ${isActive ? 'text-yellow-700' : 'text-gray-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v12H4z"/></svg>
                    <span>Lessons</span>
                  </NavLink>
                  <NavLink to="/aboutus" className={({ isActive }) => `flex flex-col items-center text-xs gap-1 px-3 py-1 rounded-full ${isActive ? 'text-yellow-700' : 'text-gray-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2c-3 0-5 2-5 4v1h10v-1c0-2-2-4-5-4z"/></svg>
                    <span>About</span>
                  </NavLink>
                </nav>
              </div>

			</div>
		  </div>
		  <div className="flex items-center space-x-3">
			<a href="/convert" className="text-sm text-yellow-700 hover:underline">Converter</a>
			<a href="/lessons" className="text-sm text-yellow-700 hover:underline">Lessons</a>
			<a href="/emotion_landing" className="text-sm text-yellow-700 hover:underline">Emotions</a>
		  </div>
		</div>

		<div className="flex flex-col">
		  <h4 className="text-sm font-semibold text-gray-800 mb-3">Resources</h4>
		  <nav className="flex flex-col space-y-2 text-sm text-gray-600">
			<a href="#" className="hover:text-gray-800">Documentation</a>
			<a href="#" className="hover:text-gray-800">Privacy Policy</a>
			<a href="#" className="hover:text-gray-800">Terms of Service</a>
			<a href="/instructions" className="hover:text-gray-800">How it works</a>
		  </nav>
		</div>

		<div className="flex flex-col">
		  <h4 className="text-sm font-semibold text-gray-800 mb-3">Contact & Social</h4>
		  <p className="text-sm text-gray-600 mb-3">Have questions or feedback? Reach out to us.</p>
		  <div className="flex items-center space-x-3">
			<a href="mailto:hello@signsight.org" className="text-sm text-gray-700 hover:underline">hello@signsight.org</a>
		  </div>

		  <div className="mt-4 flex items-center space-x-3">
			<a href="#" aria-label="Twitter" className="text-gray-500 hover:text-yellow-600">
			  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
				<path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.95 13.95 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.574 4.897 4.897 0 0 1-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.92 4.92 0 0 0 4.59 3.417A9.868 9.868 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.056 0 14.01-7.497 14.01-13.986 0-.21-.005-.423-.014-.633A9.936 9.936 0 0 0 24 4.557z" />
			  </svg>
			</a>
			<a href="#" aria-label="YouTube" className="text-gray-500 hover:text-yellow-600">
			  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
				<path d="M23.498 6.186a2.998 2.998 0 0 0-2.11-2.116C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.389.57A2.998 2.998 0 0 0 .5 6.186C0 7.877 0 12 0 12s0 4.123.5 5.814a2.998 2.998 0 0 0 2.111 2.116C4.3 20.5 12 20.5 12 20.5s7.7 0 9.389-.57a2.998 2.998 0 0 0 2.11-2.116C24 16.123 24 12 24 12s0-4.123-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
			  </svg>
			</a>
			<a href="#" aria-label="GitHub" className="text-gray-500 hover:text-yellow-600">
			  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 .5C5.7.5.6 5.6.6 11.9c0 5 3.3 9.2 7.8 10.7.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.9-1.1.1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C18.8 3.1 19.8 3.4 19.8 3.4c.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.7 7.8-10.7C23.4 5.6 18.3.5 12 .5z" />
			  </svg>
			</a>
		  </div>
		</div>
	  </div>

	  <div className="border-t px-6 py-4">
		<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
		  <p className="mb-3 md:mb-0">© {new Date().getFullYear()} Sign Sight. All rights reserved.</p>
		  <div className="flex items-center space-x-4">
			<a href="#" className="hover:underline">Contact</a>
			<a href="#" className="hover:underline">Status</a>
			<a href="#" className="hover:underline">Careers</a>
		  </div>
		</div>
	  </div>
	</footer>
  )
}


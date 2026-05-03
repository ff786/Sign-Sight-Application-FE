
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logoSignSight from '../../assets/logo-sign-sight.webp';

export default function Navbar() {
  const nav = useNavigate();
  const [portalOpen, setPortalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPortalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-yellow-500 shadow-md border-b border-yellow-600">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => nav("/student/landing")}
        >
            <div className="bg-white/30 rounded-full p-2">
             <img src={logoSignSight} alt="SignSight Logo" className="w-8 h-8 rounded-full" />
          </div>
          <h1 className="text-white text-2xl font-extrabold tracking-wide">SignSight</h1>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => nav("/student/landing")}
            className="text-white text-lg font-semibold hover:underline"
          >
            Home
          </button>

          <button
            onClick={() => nav("/instructions")}
            className="text-white text-lg font-semibold hover:underline"
          >
            Instructions
          </button>

          {/* Portal Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPortalOpen(!portalOpen)}
              className="flex items-center gap-1 text-white text-lg font-semibold hover:underline focus:outline-none"
            >
              Portal
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${portalOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {portalOpen && (
              <div className="absolute top-full mt-3 right-0 bg-white rounded-2xl shadow-2xl overflow-hidden min-w-[180px] z-50 border border-orange-100">
                <button
                  onClick={() => { nav("/mentor/login"); setPortalOpen(false); }}
                  className="w-full px-5 py-3 text-left font-semibold text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-3"
                >
                  <span className="text-xl">🎓</span>
                  <span>Mentor Login</span>
                </button>
                <div className="h-px bg-yellow-100" />
                <button
                  onClick={() => { nav("/admin/login"); setPortalOpen(false); }}
                  className="w-full px-5 py-3 text-left font-semibold text-pink-600 hover:bg-pink-50 transition-colors flex items-center gap-3"
                >
                  <span className="text-xl">🛡️</span>
                  <span>Admin Login</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => nav("/instructions")}
          className="ml-4 px-6 py-2 bg-white text-yellow-700 rounded-full font-bold shadow-sm hover:bg-yellow-50 active:scale-95 transition"
        >
          Start 🌈
        </button>
      </div>
    </nav>
  );
}

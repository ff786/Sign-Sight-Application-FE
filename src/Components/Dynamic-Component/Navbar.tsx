import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const DynamicNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');

                /* ── Navigation Root ── */
                .nav-root {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    font-family: 'Outfit', sans-serif;
                    background: transparent;
                }

                .nav-root.scrolled {
                    background: rgba(255, 251, 240, 0.88);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-bottom: 1px solid rgba(232, 185, 35, 0.2);
                    box-shadow: 0 8px 32px rgba(107, 76, 47, 0.12);
                }

                /* ── Navigation Inner Container ── */
                .nav-inner {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                /* ── Logo Section ── */
                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    text-decoration: none;
                    transition: transform 0.3s ease;
                }

                .nav-logo:hover {
                    transform: translateY(-2px);
                }

                .logo-icon {
                    width: 44px;
                    height: 44px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, rgba(232, 185, 35, 0.15) 0%, rgba(200, 144, 0, 0.08) 100%);
                    border-radius: 14px;
                    border: 1.5px solid rgba(232, 185, 35, 0.3);
                    animation: logoFloat 3s ease-in-out infinite;
                }

                @keyframes logoFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }

                .logo-icon svg {
                    width: 24px;
                    height: 24px;
                    filter: drop-shadow(0 2px 4px rgba(232, 185, 35, 0.2));
                }

                .logo-text {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* CSS Variables from home */
                :root {
                    --color-cream: #FFFBF0;
                    --color-gold: #E8B923;
                    --color-gold-dark: #C89000;
                    --color-brown: #6B4C2F;
                    --color-brown-dark: #5C3D1F;
                    --color-text: #3D2A1F;
                    --color-light-text: rgba(61, 42, 31, 0.7);
                }

                /* ── Navigation Links ── */
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 3.5rem;
                }

                .nav-link {
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--color-light-text);
                    transition: color 0.3s ease;
                    position: relative;
                    padding-bottom: 6px;
                    font-family: 'Outfit', sans-serif;
                }

                .nav-link::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2.5px;
                    background: linear-gradient(90deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
                    border-radius: 2px;
                    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .nav-link:hover,
                .nav-link.active {
                    color: var(--color-gold);
                }

                .nav-link:hover::before,
                .nav-link.active::before {
                    width: 100%;
                }

                /* ── CTA Button ── */
                .nav-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 28px;
                    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
                    border: none;
                    border-radius: 100px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: white;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    box-shadow: 0 6px 20px rgba(232, 185, 35, 0.25);
                    font-family: 'Outfit', sans-serif;
                    position: relative;
                    overflow: hidden;
                }

                .nav-cta::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(255, 255, 255, 0.15);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    border-radius: 100px;
                }

                .nav-cta:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 32px rgba(232, 185, 35, 0.35);
                }

                .nav-cta:hover::before {
                    opacity: 1;
                }

                /* ── Hamburger Menu ── */
                .hamburger {
                    display: none;
                    flex-direction: column;
                    gap: 6px;
                    cursor: pointer;
                    background: none;
                    border: none;
                    padding: 8px;
                    z-index: 101;
                }

                .hamburger span {
                    display: block;
                    width: 26px;
                    height: 2.5px;
                    background: var(--color-brown);
                    border-radius: 2px;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    transform-origin: center;
                }

                .hamburger:hover span {
                    background: var(--color-gold);
                }

                .hamburger.open span:nth-child(1) {
                    transform: rotate(45deg) translateY(10px);
                }

                .hamburger.open span:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.open span:nth-child(3) {
                    transform: rotate(-45deg) translateY(-10px);
                }

                /* ── Mobile Menu ── */
                .mobile-menu {
                    display: none;
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, rgba(255, 251, 240, 0.96) 0%, rgba(255, 251, 240, 0.92) 100%);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-bottom: 1px solid rgba(232, 185, 35, 0.2);
                    padding: 2rem;
                    flex-direction: column;
                    gap: 1.5rem;
                    z-index: 99;
                    box-shadow: 0 8px 32px rgba(107, 76, 47, 0.1);
                    animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .mobile-menu.open {
                    display: flex;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .mobile-menu .nav-link {
                    font-size: 1rem;
                    color: var(--color-brown);
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(232, 185, 35, 0.1);
                }

                .mobile-menu .nav-link:last-of-type {
                    border-bottom: none;
                }

                .mobile-menu .nav-cta {
                    margin-top: 1rem;
                    width: 100%;
                    justify-content: center;
                }

                /* ── Responsive Design ── */
                @media (max-width: 768px) {
                    .nav-inner {
                        height: 70px;
                        padding: 0 1.5rem;
                    }

                    .nav-links {
                        display: none;
                    }

                    .hamburger {
                        display: flex;
                    }

                    .logo-text {
                        font-size: 1.3rem;
                    }

                    .nav-inner {
                        gap: 1rem;
                    }

                    .mobile-menu {
                        top: 70px;
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .nav-inner {
                        height: 65px;
                        padding: 0 1rem;
                    }

                    .logo-icon {
                        width: 40px;
                        height: 40px;
                    }

                    .logo-text {
                        font-size: 1.1rem;
                    }

                    .mobile-menu {
                        top: 65px;
                        padding: 1rem;
                    }
                }
            `}</style>

            <nav className={`nav-root ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-inner">
                    <NavLink to="/" className="nav-logo">
                        <div className="logo-icon">
                            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Outer ring */}
                                <circle cx="18" cy="18" r="17" stroke="url(#navGrad1)" strokeWidth="1.5" opacity="0.6"/>
                                
                                {/* Center circle */}
                                <circle cx="18" cy="18" r="8" fill="url(#navGrad2)" opacity="0.25"/>
                                <circle cx="18" cy="18" r="4" fill="url(#navGrad2)"/>
                                
                                {/* Hand gesture wave */}
                                <path d="M8 18 Q13 10 18 18 Q23 26 28 18" stroke="url(#navGrad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8"/>
                                
                                {/* Accent dots for sign language essence */}
                                <circle cx="12" cy="12" r="1.5" fill="url(#navGrad2)" opacity="0.4"/>
                                <circle cx="24" cy="14" r="1.5" fill="url(#navGrad2)" opacity="0.4"/>
                                <circle cx="14" cy="26" r="1.5" fill="url(#navGrad2)" opacity="0.4"/>
                                
                                <defs>
                                    <linearGradient id="navGrad1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#E8B923"/>
                                        <stop offset="1" stopColor="#C89000"/>
                                    </linearGradient>
                                    <linearGradient id="navGrad2" x1="10" y1="10" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#E8B923"/>
                                        <stop offset="1" stopColor="#C89000"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span className="logo-text">SignSight</span>
                    </NavLink>

                    <div className="nav-links">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/real-time" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            Real-Time
                        </NavLink>
                        <NavLink 
                            to="/upload" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            Upload
                        </NavLink>
                    </div>

                    <NavLink to="/real-time" className="nav-cta">
                        Launch <span>→</span>
                    </NavLink>

                    <button 
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)} 
                        aria-label="Menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                    onClick={() => setMenuOpen(false)}
                >
                    Home
                </NavLink>
                <NavLink 
                    to="/real-time" 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                    onClick={() => setMenuOpen(false)}
                >
                    Real-Time
                </NavLink>
                <NavLink 
                    to="/upload" 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                    onClick={() => setMenuOpen(false)}
                >
                    Upload
                </NavLink>
                <NavLink 
                    to="/real-time" 
                    className="nav-cta" 
                    onClick={() => setMenuOpen(false)}
                >
                    Launch <span>→</span>
                </NavLink>
            </div>
        </>
    );
};

export default DynamicNavbar;
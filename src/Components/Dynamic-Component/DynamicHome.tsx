import React, { useRef } from "react";
import { Link } from "react-router-dom";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');

.home-root,
.home-root * ,
.home-root *::before,
.home-root *::after {
  box-sizing: border-box;
}

.home-root {
  --color-cream: #FFFBF0;
  --color-bg-light: #FFFBF0;
  --color-gold: #E8B923;
  --color-gold-dark: #C89000;
  --color-accent: #F5D76E;
  --color-brown: #6B4C2F;
  --color-brown-dark: #5C3D1F;
  --color-text: #3D2A1F;
  --color-light-text: rgba(61, 42, 31, 0.7);
  --color-muted: rgba(61, 42, 31, 0.45);
  --color-purple: #C4B5D4;
  --color-rose: #D4A4B4;
  --color-teal: #7BA29C;

  min-height: 100vh;
  background: var(--color-bg-light);
  color: var(--color-text);
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden;
}

/* ── Advanced Sign Language Background ── */
.organic-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

/* Flowing gradient mesh background */
.gradient-mesh {
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 15% 30%, rgba(232, 185, 35, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 85% 20%, rgba(200, 144, 0, 0.08) 0%, transparent 35%),
        radial-gradient(circle at 50% 70%, rgba(245, 215, 110, 0.1) 0%, transparent 45%),
        radial-gradient(circle at 70% 85%, rgba(232, 185, 35, 0.08) 0%, transparent 40%);
    animation: meshFlow 15s ease-in-out infinite;
}

@keyframes meshFlow {
    0%, 100% {
        background-position: 0% 0%;
    }
    50% {
        background-position: 100% 100%;
    }
}

/* Animated blob shapes with sign language essence */
.gesture-blob {
    position: absolute;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    filter: blur(50px);
    pointer-events: none;
}

.blob1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, rgba(232, 185, 35, 0.1), rgba(200, 144, 0, 0.07));
    top: -150px;
    left: -100px;
    animation: blobDrift1 18s ease-in-out infinite;
}

.blob2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(45deg, rgba(107, 76, 47, 0.06), rgba(232, 185, 35, 0.08));
    top: 15%;
    right: -80px;
    animation: blobDrift2 22s ease-in-out infinite;
}

.blob3 {
    width: 480px;
    height: 480px;
    background: linear-gradient(225deg, rgba(245, 215, 110, 0.09), rgba(200, 144, 0, 0.07));
    bottom: -120px;
    left: 10%;
    animation: blobDrift3 20s ease-in-out infinite;
}

.blob4 {
    width: 450px;
    height: 450px;
    background: linear-gradient(315deg, rgba(232, 185, 35, 0.08), rgba(107, 76, 47, 0.06));
    bottom: 10%;
    right: 5%;
    animation: blobDrift1 24s ease-in-out infinite reverse;
}

@keyframes blobDrift1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    33% { transform: translate(60px, -80px) rotate(120deg) scale(1.1); }
    66% { transform: translate(-40px, 50px) rotate(240deg) scale(0.95); }
}

@keyframes blobDrift2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    33% { transform: translate(-70px, 60px) rotate(120deg) scale(1.05); }
    66% { transform: translate(50px, -70px) rotate(240deg) scale(0.98); }
}

@keyframes blobDrift3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    33% { transform: translate(80px, 40px) rotate(120deg) scale(1.02); }
    66% { transform: translate(-60px, -80px) rotate(240deg) scale(0.96); }
}

/* Sign Language Hand Gestures with enhanced animations */
.hand-gesture {
    position: absolute;
    font-size: 140px;
    pointer-events: none;
    filter: drop-shadow(0 10px 20px rgba(232, 185, 35, 0.12));
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
}

.hand1 {
    top: 5%;
    left: 8%;
    animation: gestureFlow1 7s ease-in-out infinite;
}

.hand2 {
    top: 35%;
    right: 10%;
    animation: gestureFlow2 8s ease-in-out infinite;
    animation-delay: -2s;
}

.hand3 {
    bottom: 18%;
    left: 15%;
    animation: gestureFlow3 9s ease-in-out infinite;
    animation-delay: -4s;
}

.hand4 {
    top: 50%;
    right: 12%;
    animation: gestureFlow4 7.5s ease-in-out infinite;
    animation-delay: -1.5s;
}

.hand5 {
    bottom: 20%;
    right: 8%;
    animation: gestureFlow2 8.5s ease-in-out infinite;
    animation-delay: -3.5s;
}

.hand6 {
    top: 25%;
    left: 5%;
    animation: gestureFlow1 8s ease-in-out infinite;
    animation-delay: -2.5s;
}

@keyframes gestureFlow1 {
    0%, 100% { 
        opacity: 0.2;
        transform: translate(0, 0) scale(0.8) rotate(0deg);
    }
    20% { 
        opacity: 0.32;
        transform: translate(-40px, -50px) scale(1) rotate(15deg);
    }
    50% { 
        opacity: 0.42;
        transform: translate(20px, 0) scale(1.1) rotate(-10deg);
    }
    80% { 
        opacity: 0.26;
        transform: translate(-30px, 40px) scale(0.9) rotate(20deg);
    }
}

@keyframes gestureFlow2 {
    0%, 100% { 
        opacity: 0.2;
        transform: translate(0, 0) scale(0.8) rotate(0deg);
    }
    25% { 
        opacity: 0.35;
        transform: translate(50px, -30px) scale(1.05) rotate(-20deg);
    }
    50% { 
        opacity: 0.42;
        transform: translate(-60px, 40px) scale(1.1) rotate(25deg);
    }
    75% { 
        opacity: 0.28;
        transform: translate(40px, -50px) scale(0.95) rotate(-15deg);
    }
}

@keyframes gestureFlow3 {
    0%, 100% { 
        opacity: 0.2;
        transform: translate(0, 0) scale(0.85) rotate(0deg);
    }
    30% { 
        opacity: 0.33;
        transform: translate(-50px, 40px) scale(1.08) rotate(10deg);
    }
    60% { 
        opacity: 0.41;
        transform: translate(30px, -50px) scale(1.12) rotate(-25deg);
    }
}

@keyframes gestureFlow4 {
    0%, 100% { 
        opacity: 0.2;
        transform: translate(0, 0) scale(0.8) rotate(0deg);
    }
    35% { 
        opacity: 0.32;
        transform: translate(-60px, -40px) scale(1.1) rotate(20deg);
    }
    70% { 
        opacity: 0.4;
        transform: translate(50px, 30px) scale(1.05) rotate(-15deg);
    }
}

/* Particle effects */
.particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--color-gold);
    border-radius: 50%;
    pointer-events: none;
    box-shadow: 0 0 15px rgba(232, 185, 35, 0.7);
}

.particle:nth-child(1) { top: 20%; left: 15%; animation: float 8s ease-in-out infinite; }
.particle:nth-child(2) { top: 40%; right: 10%; animation: float 10s ease-in-out infinite; animation-delay: -2s; }
.particle:nth-child(3) { bottom: 30%; left: 20%; animation: float 12s ease-in-out infinite; animation-delay: -4s; }
.particle:nth-child(4) { top: 60%; right: 20%; animation: float 9s ease-in-out infinite; animation-delay: -3s; }
.particle:nth-child(5) { bottom: 15%; right: 30%; animation: float 11s ease-in-out infinite; animation-delay: -5s; }

@keyframes float {
    0%, 100% { 
        opacity: 0.3;
        transform: translate(0, 0) scale(1);
    }
    20% { 
        opacity: 0.8;
        transform: translate(-30px, -30px) scale(1.6);
    }
    50% { 
        opacity: 0.5;
        transform: translate(40px, 40px) scale(1);
    }
    80% { 
        opacity: 0.7;
        transform: translate(-20px, 50px) scale(1.4);
    }
}

/* ── Hero ── */
.hero {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 2rem 80px;
    text-align: center;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 28px;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: white;
    margin-bottom: 2.5rem;
    animation: slideDown 0.8s ease both;
    box-shadow: 0 8px 24px rgba(232, 185, 35, 0.3);
    backdrop-filter: blur(10px);
}

.badge-dot {
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: pulse 2.5s ease infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
}

.hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 9vw, 7rem);
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    color: var(--color-text);
    animation: slideDown 0.8s 0.1s ease both;
}

.title-highlight {
    display: block;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    filter: drop-shadow(0 4px 12px rgba(232, 185, 35, 0.2));
}

.hero-sub {
    max-width: 600px;
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--color-light-text);
    line-height: 1.8;
    margin-bottom: 3rem;
    animation: slideDown 0.8s 0.2s ease both;
}

.hero-sub strong {
    color: var(--color-gold);
    font-weight: 700;
}

.hero-actions {
    display: flex;
    gap: 1.2rem;
    flex-wrap: wrap;
    justify-content: center;
    animation: slideDown 0.8s 0.3s ease both;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 40px;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    border: none;
    border-radius: 100px;
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 8px 28px rgba(232, 185, 35, 0.35);
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.2);
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: 100px;
}

.btn-primary:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(232, 185, 35, 0.45);
}

.btn-primary:hover::before {
    opacity: 1;
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 40px;
    background: rgba(232, 185, 35, 0.12);
    border: 2px solid var(--color-gold);
    border-radius: 100px;
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--color-brown);
    text-decoration: none;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: var(--color-gold);
    color: white;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(232, 185, 35, 0.35);
}

/* Scroll indicator */
.scroll-hint {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0.5;
    animation: slideDown 1s 0.8s ease both;
}

.scroll-line {
    width: 2px;
    height: 50px;
    background: var(--color-gold);
    animation: scroll-animation 2s ease infinite;
}

@keyframes scroll-animation {
    0% { transform: scaleY(0) translateY(-10px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: scaleY(1) translateY(10px); opacity: 0; }
}

.scroll-label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-gold);
    font-weight: 600;
}

/* ── Stats Section ── */
.stats-section {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto 6rem;
    padding: 0 2rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.stat-card {
    background: linear-gradient(135deg, rgba(232, 185, 35, 0.08) 0%, rgba(200, 144, 0, 0.05) 100%);
    padding: 2.5rem;
    border-radius: 20px;
    border: 1px solid rgba(232, 185, 35, 0.2);
    text-align: center;
    transition: all 0.4s ease;
    animation: slideUp 0.8s ease both;
}

.stat-card:nth-child(2) { animation-delay: 0.1s; }
.stat-card:nth-child(3) { animation-delay: 0.2s; }

.stat-card:hover {
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    border-color: var(--color-gold);
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(232, 185, 35, 0.25);
    color: white;
}

.stat-card:hover .stat-number,
.stat-card:hover .stat-label {
    color: white;
}

.stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 900;
    color: var(--color-gold);
    margin-bottom: 0.5rem;
    line-height: 1;
    transition: color 0.4s ease;
}

.stat-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-light-text);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: color 0.4s ease;
}

/* ── Features Section ── */
.features-section {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto 8rem;
    padding: 0 2rem;
}

.section-label {
    text-align: center;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-gold);
    margin-bottom: 1rem;
}

.section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    text-align: center;
    color: var(--color-text);
    margin-bottom: 4rem;
    letter-spacing: -0.02em;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 251, 240, 0.3) 100%);
    padding: 2.5rem;
    border-radius: 20px;
    border: 1px solid rgba(232, 185, 35, 0.15);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    animation: slideUp 0.8s ease both;
    backdrop-filter: blur(10px);
}

.feature-card:nth-child(2) { animation-delay: 0.1s; }
.feature-card:nth-child(3) { animation-delay: 0.2s; }

.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-gold), var(--color-gold-dark));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
}

.feature-card:hover {
    transform: translateY(-8px);
    border-color: var(--color-gold);
    box-shadow: 0 16px 48px rgba(232, 185, 35, 0.12);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 251, 240, 0.5) 100%);
}

.feature-card:hover::before {
    transform: scaleX(1);
}

.feature-num {
    display: inline-flex;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    color: white;
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 900;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 2px 4px rgba(232, 185, 35, 0.15));
}

.feature-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
}

.feature-desc {
    font-size: 0.95rem;
    font-weight: 400;
    color: var(--color-light-text);
    line-height: 1.8;
}

/* ── CTA Section ── */
.cta-section {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto 6rem;
    padding: 0 2rem;
}

.cta-card {
    background: linear-gradient(135deg, #6B4C2F 0%, #5C3D1F 100%);
    padding: 4rem;
    border-radius: 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(107, 76, 47, 0.3);
}

.cta-card::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(232, 185, 35, 0.12) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}

.cta-card::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(245, 215, 110, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}

.cta-content {
    position: relative;
    z-index: 2;
}

.cta-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 900;
    color: white;
    margin-bottom: 1.2rem;
    letter-spacing: -0.02em;
}

.cta-sub {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 3rem;
    font-weight: 400;
    line-height: 1.7;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 40px;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    border: none;
    border-radius: 100px;
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 24px rgba(232, 185, 35, 0.3);
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 36px rgba(232, 185, 35, 0.4);
}

/* Animations */
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

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .hero {
        padding: 80px 1.5rem 60px;
    }

    .hero-title {
        margin-bottom: 1.2rem;
    }

    .cta-card {
        padding: 3rem 2rem;
    }

    .hero-actions {
        flex-direction: column;
        gap: 1rem;
    }

    .btn-primary,
    .btn-secondary {
        width: 100%;
        justify-content: center;
    }

    .gesture-blob {
        opacity: 0 !important;
    }
}
`;

const DynamicHome = () => {
    const bgRef = useRef(null);

    return (
        <div className="home-root">
            <style>{STYLES}</style>

            {/* Enhanced Sign Language Background */}
            <div className="organic-bg" ref={bgRef}>
                {/* Gradient mesh foundation */}
                <div className="gradient-mesh" />
                
                {/* Flowing blob shapes */}
                <div className="gesture-blob blob1" />
                <div className="gesture-blob blob2" />
                <div className="gesture-blob blob3" />
                <div className="gesture-blob blob4" />
                
                {/* Animated Hand Gestures */}
                <div className="hand-gesture hand1">👋</div>
                <div className="hand-gesture hand2">🤟</div>
                <div className="hand-gesture hand3">✋</div>
                <div className="hand-gesture hand4">👐</div>
                <div className="hand-gesture hand5">🤞</div>
                <div className="hand-gesture hand6">🙌</div>

                {/* Subtle particles */}
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
            </div>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-badge">
                    <span className="badge-dot" />
                    AI-Powered Sign Language Recognition
                </div>

                <h1 className="hero-title">
                    Hands Speak.
                    <span className="title-highlight">SignSight</span>
                    Listens.
                </h1>

                <p className="hero-sub">
                    Real-time gesture recognition that converts sign language directly into <strong>Tamil text</strong> — empowering communication through intelligent AI technology.
                </p>

                <div className="hero-actions">
                    <Link to="/real-time" className="btn-primary">
                        Start Detection
                        <span>→</span>
                    </Link>
                    <Link to="/upload" className="btn-secondary">
                        <span>⬆</span> Upload Video
                    </Link>
                </div>

                <div className="scroll-hint">
                    <div className="scroll-line" />
                    <span className="scroll-label">Scroll to explore</span>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-number">Real-Time</div>
                        <div className="stat-label">Live Detection</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">Tamil</div>
                        <div className="stat-label">Output Support</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">AI</div>
                        <div className="stat-label">Powered Models</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <p className="section-label">Core Features</p>
                <h2 className="section-title">What We Offer</h2>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-num">01</div>
                        <div className="feature-icon">🎯</div>
                        <h3 className="feature-title">Real-Time Detection</h3>
                        <p className="feature-desc">
                            Live webcam feed captures hand gestures and instantly identifies sign language movements with precision and accuracy.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-num">02</div>
                        <div className="feature-icon">🎬</div>
                        <h3 className="feature-title">Video Analysis</h3>
                        <p className="feature-desc">
                            Upload pre-recorded sign language videos for accurate gesture recognition with confidence-scored predictions.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-num">03</div>
                        <div className="feature-icon">🌐</div>
                        <h3 className="feature-title">Tamil Output</h3>
                        <p className="feature-desc">
                            Recognized gestures convert seamlessly to clear, readable Tamil text for effortless communication.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Transform Communication?</h2>
                        <p className="cta-sub">
                            Experience the power of AI-driven sign language detection. Start now with real-time recognition.
                        </p>
                        <Link to="/real-time" className="cta-button">
                            Launch SignSight <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DynamicHome;

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    SIGN_LANGUAGE_MODEL_OPTIONS,
    SIGN_SIGHT_ML_BASE_URI,
    fetchSignsightMlHealthVariants,
    type SignLanguageModelValue,
    type SignsightMlHealthVariantRow,
} from '../../config/CONFIG';

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');

.home-root,
.home-root * ,
.home-root *::before,
.home-root *::after {
  box-sizing: border-box;
}


:root {
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
}

.rt-root {
    min-height: 100vh;
    background: var(--color-bg-light);
    color: var(--color-text);
    font-family: 'Outfit', sans-serif;
    padding-top: 80px;
    position: relative;
    overflow-x: hidden;
}

/* ── Sign Language Animated Background ── */
.organic-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.gradient-mesh {
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 15% 30%, rgba(232, 185, 35, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 20%, rgba(200, 144, 0, 0.06) 0%, transparent 35%),
        radial-gradient(circle at 50% 70%, rgba(245, 215, 110, 0.07) 0%, transparent 45%),
        radial-gradient(circle at 70% 85%, rgba(232, 185, 35, 0.06) 0%, transparent 40%);
    animation: meshFlow 15s ease-in-out infinite;
}

@keyframes meshFlow {
    0%, 100% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
}

/* Animated blob shapes */
.gesture-blob {
    position: absolute;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    filter: blur(80px);
    pointer-events: none;
}

.blob1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, rgba(232, 185, 35, 0.08), rgba(200, 144, 0, 0.05));
    top: -200px;
    left: -150px;
    animation: blobDrift1 18s ease-in-out infinite;
}

.blob2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(45deg, rgba(107, 76, 47, 0.05), rgba(232, 185, 35, 0.06));
    top: 10%;
    right: -100px;
    animation: blobDrift2 22s ease-in-out infinite;
}

.blob3 {
    width: 480px;
    height: 480px;
    background: linear-gradient(225deg, rgba(245, 215, 110, 0.07), rgba(200, 144, 0, 0.05));
    bottom: -150px;
    left: 5%;
    animation: blobDrift3 20s ease-in-out infinite;
}

.blob4 {
    width: 450px;
    height: 450px;
    background: linear-gradient(315deg, rgba(232, 185, 35, 0.06), rgba(107, 76, 47, 0.04));
    bottom: 5%;
    right: 10%;
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

/* Hand Gestures */
.hand-gesture {
    position: absolute;
    font-size: 120px;
    pointer-events: none;
    filter: drop-shadow(0 10px 20px rgba(232, 185, 35, 0.1));
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.hand1 {
    top: 8%;
    left: 12%;
    animation: gestureFlow1 7s ease-in-out infinite;
}

.hand2 {
    top: 40%;
    right: 8%;
    animation: gestureFlow2 8s ease-in-out infinite;
    animation-delay: -2s;
}

.hand3 {
    bottom: 20%;
    left: 10%;
    animation: gestureFlow3 9s ease-in-out infinite;
    animation-delay: -4s;
}

.hand4 {
    top: 55%;
    right: 15%;
    animation: gestureFlow4 7.5s ease-in-out infinite;
    animation-delay: -1.5s;
}

.hand5 {
    bottom: 25%;
    right: 5%;
    animation: gestureFlow2 8.5s ease-in-out infinite;
    animation-delay: -3.5s;
}

.hand6 {
    top: 20%;
    left: 3%;
    animation: gestureFlow1 8s ease-in-out infinite;
    animation-delay: -2.5s;
}

@keyframes gestureFlow1 {
    0%, 100% { opacity: 0.15; transform: translate(0, 0) scale(0.8) rotate(0deg); }
    20% { opacity: 0.25; transform: translate(-40px, -50px) scale(1) rotate(15deg); }
    50% { opacity: 0.35; transform: translate(20px, 0) scale(1.1) rotate(-10deg); }
    80% { opacity: 0.2; transform: translate(-30px, 40px) scale(0.9) rotate(20deg); }
}

@keyframes gestureFlow2 {
    0%, 100% { opacity: 0.15; transform: translate(0, 0) scale(0.8) rotate(0deg); }
    25% { opacity: 0.28; transform: translate(50px, -30px) scale(1.05) rotate(-20deg); }
    50% { opacity: 0.35; transform: translate(-60px, 40px) scale(1.1) rotate(25deg); }
    75% { opacity: 0.22; transform: translate(40px, -50px) scale(0.95) rotate(-15deg); }
}

@keyframes gestureFlow3 {
    0%, 100% { opacity: 0.15; transform: translate(0, 0) scale(0.85) rotate(0deg); }
    30% { opacity: 0.26; transform: translate(-50px, 40px) scale(1.08) rotate(10deg); }
    60% { opacity: 0.33; transform: translate(30px, -50px) scale(1.12) rotate(-25deg); }
}

@keyframes gestureFlow4 {
    0%, 100% { opacity: 0.15; transform: translate(0, 0) scale(0.8) rotate(0deg); }
    35% { opacity: 0.25; transform: translate(-60px, -40px) scale(1.1) rotate(20deg); }
    70% { opacity: 0.32; transform: translate(50px, 30px) scale(1.05) rotate(-15deg); }
}

/* Particles */
.particle {
    position: absolute;
    width: 5px;
    height: 5px;
    background: var(--color-gold);
    border-radius: 50%;
    pointer-events: none;
    box-shadow: 0 0 12px rgba(232, 185, 35, 0.6);
    opacity: 0.25;
}

.particle:nth-child(1) { top: 15%; left: 18%; animation: float 8s ease-in-out infinite; }
.particle:nth-child(2) { top: 45%; right: 12%; animation: float 10s ease-in-out infinite; animation-delay: -2s; }
.particle:nth-child(3) { bottom: 35%; left: 25%; animation: float 12s ease-in-out infinite; animation-delay: -4s; }
.particle:nth-child(4) { top: 65%; right: 18%; animation: float 9s ease-in-out infinite; animation-delay: -3s; }
.particle:nth-child(5) { bottom: 18%; right: 28%; animation: float 11s ease-in-out infinite; animation-delay: -5s; }

@keyframes float {
    0%, 100% { opacity: 0.2; transform: translate(0, 0) scale(1); }
    20% { opacity: 0.6; transform: translate(-30px, -30px) scale(1.4); }
    50% { opacity: 0.3; transform: translate(40px, 40px) scale(1); }
    80% { opacity: 0.5; transform: translate(-20px, 50px) scale(1.3); }
}

/* ── Container ── */
.rt-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 2rem;
    position: relative;
    z-index: 1;
}

/* ── Header ── */
.rt-header {
    margin-bottom: 3rem;
    animation: slideDown 0.8s ease both;
}

.rt-eyebrow {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-gold);
    margin-bottom: 0.8rem;
}

.rt-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 5vw, 3.2rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    color: var(--color-text);
}

.rt-title span {
    display: block;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* ── Layout ── */
.rt-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: start;
}

@media (max-width: 1024px) {
    .rt-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}

/* ── Camera Section ── */
.cam-wrap {
    position: relative;
    animation: slideDown 0.8s 0.1s ease both;
}

.cam-frame {
    position: relative;
    background: linear-gradient(135deg, rgba(255, 251, 240, 0.9) 0%, rgba(255, 251, 240, 0.7) 100%);
    border-radius: 24px;
    overflow: hidden;
    aspect-ratio: 16/9;
    border: 1.5px solid rgba(232, 185, 35, 0.25);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5), 0 20px 60px rgba(107, 76, 47, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transition: all 0.4s ease;
}

.cam-frame:hover {
    border-color: rgba(232, 185, 35, 0.4);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.6), 0 25px 70px rgba(107, 76, 47, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.cam-frame video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    display: block;
}

.cam-overlay-idle {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 251, 240, 0.7);
    backdrop-filter: blur(8px);
    flex-direction: column;
    gap: 1.5rem;
    border-radius: 24px;
}

.rec-btn {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px rgba(232, 185, 35, 0.3);
}

.rec-btn:hover {
    transform: scale(1.12);
    box-shadow: 0 12px 48px rgba(232, 185, 35, 0.4);
}

.rec-btn:active {
    transform: scale(0.98);
}

.rec-btn-label {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-light-text);
    font-weight: 600;
}

/* Recording indicator */
.rec-badge {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(107, 76, 47, 0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(232, 185, 35, 0.3);
    border-radius: 100px;
    padding: 8px 14px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-gold);
    animation: slideDown 0.4s ease both;
}

.rec-dot {
    width: 7px;
    height: 7px;
    background: var(--color-gold);
    border-radius: 50%;
    animation: blink 1.2s ease infinite;
    box-shadow: 0 0 8px rgba(232, 185, 35, 0.6);
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

/* Processing overlay */
.processing-overlay {
    position: absolute;
    inset: 0;
    background: rgba(255, 251, 240, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    backdrop-filter: blur(8px);
    border-radius: 24px;
}

.spinner {
    width: 52px;
    height: 52px;
    border: 2.5px solid rgba(232, 185, 35, 0.15);
    border-top-color: var(--color-gold);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.processing-label {
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-gold);
    font-weight: 600;
}

/* Camera error overlay */
.cam-error-overlay {
    position: absolute;
    inset: 0;
    background: rgba(255, 251, 240, 0.96);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
    text-align: center;
    border-radius: 24px;
}

.cam-error-icon {
    font-size: 3.5rem;
    opacity: 0.5;
}

.cam-error-msg {
    font-size: 0.9rem;
    color: var(--color-brown);
    line-height: 1.6;
    max-width: 280px;
}

.cam-enable-btn {
    padding: 12px 28px;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    border: none;
    border-radius: 100px;
    color: white;
    font-family: 'Outfit', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(232, 185, 35, 0.3);
}

.cam-enable-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(232, 185, 35, 0.4);
}

/* Progress bar */
.progress-track {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(232, 185, 35, 0.1);
    border-radius: 0 0 24px 24px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(232, 185, 35, 0.4);
}

/* ── Right Panel ── */
.right-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    animation: slideDown 0.8s 0.2s ease both;
}

/* Control Card */
.ctrl-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 251, 240, 0.5) 100%);
    border: 1.5px solid rgba(232, 185, 35, 0.2);
    border-radius: 20px;
    padding: 2rem;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 24px rgba(107, 76, 47, 0.08);
    transition: all 0.4s ease;
}

.ctrl-card:hover {
    border-color: rgba(232, 185, 35, 0.3);
    box-shadow: 0 8px 32px rgba(107, 76, 47, 0.12);
}

.ctrl-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--color-brown);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.rt-model-picker { margin-bottom: 1.25rem; }
.rt-model-picker label {
    display: block; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.35rem;
}
.rt-model-picker select {
    width: 100%; padding: 12px 14px; border-radius: 12px;
    border: 1.5px solid rgba(232, 185, 35, 0.25); background: rgba(255,255,255,0.9);
    font-family: 'Outfit', sans-serif; font-size: 0.88rem; color: var(--color-text); cursor: pointer;
}

.main-btn {
    width: 100%;
    padding: 16px;
    border-radius: 14px;
    border: none;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-transform: uppercase;
}

.main-btn.start {
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    color: white;
    box-shadow: 0 6px 24px rgba(232, 185, 35, 0.3);
}

.main-btn.start:hover {
    box-shadow: 0 10px 36px rgba(232, 185, 35, 0.4);
    transform: translateY(-2px);
}

.main-btn.stop {
    background: rgba(200, 144, 0, 0.1);
    color: var(--color-brown-dark);
    border: 1.5px solid rgba(200, 144, 0, 0.3);
}

.main-btn.stop:hover {
    background: rgba(200, 144, 0, 0.15);
    border-color: rgba(200, 144, 0, 0.4);
}

.main-btn.processing {
    background: rgba(107, 76, 47, 0.06);
    color: var(--color-muted);
    cursor: not-allowed;
}

.status-row {
    margin-top: 1.25rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    transition: all 0.3s ease;
}

.status-dot.green {
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

.status-dot.yellow {
    background: var(--color-gold);
    box-shadow: 0 0 8px rgba(232, 185, 35, 0.5);
    animation: blink 1.5s ease infinite;
}

.status-dot.red {
    background: #dc2626;
    box-shadow: 0 0 8px rgba(220, 38, 38, 0.5);
}

.status-text {
    color: var(--color-light-text);
    font-weight: 500;
}

/* Output Card */
.output-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 251, 240, 0.5) 100%);
    border: 1.5px solid rgba(232, 185, 35, 0.2);
    border-radius: 20px;
    padding: 2rem;
    flex: 1;
    box-shadow: 0 4px 24px rgba(107, 76, 47, 0.08);
    transition: all 0.4s ease;
}

.output-card:hover {
    border-color: rgba(232, 185, 35, 0.3);
    box-shadow: 0 8px 32px rgba(107, 76, 47, 0.12);
}

.output-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 0.5rem;
}

.detected-sign {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    color: var(--color-brown);
    margin-bottom: 1.5rem;
    min-height: 3.5rem;
}

.tamil-sign {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 600;
    color: var(--color-brown);
    margin-bottom: 1.5rem;
    font-family: 'Outfit', sans-serif;
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Confidence section */
.conf-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.75rem;
}

.conf-label {
    font-size: 0.75rem;
    color: var(--color-muted);
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
}

.conf-pct {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-brown);
}

.conf-track {
    height: 4px;
    background: rgba(232, 185, 35, 0.12);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1.75rem;
}

.conf-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    border-radius: 4px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 8px rgba(232, 185, 35, 0.4);
}

/* Sentence box */
.sentence-box {
    background: rgba(232, 185, 35, 0.08);
    border: 1.5px solid rgba(232, 185, 35, 0.15);
    border-radius: 14px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
}

.sentence-en {
    font-size: 1rem;
    color: var(--color-text);
    margin-bottom: 0.5rem;
    line-height: 1.6;
    font-weight: 500;
}

.sentence-ta {
    font-size: 0.95rem;
    color: var(--color-brown);
    line-height: 1.6;
    font-weight: 500;
}

/* Sequence */
.sequence-box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 1.5rem;
}

.seq-tag {
    padding: 6px 12px;
    background: rgba(232, 185, 35, 0.1);
    border: 1px solid rgba(232, 185, 35, 0.25);
    border-radius: 100px;
    font-size: 0.75rem;
    color: var(--color-brown);
    font-weight: 600;
    transition: all 0.2s ease;
}

.seq-tag:hover {
    background: rgba(232, 185, 35, 0.15);
    border-color: rgba(232, 185, 35, 0.35);
}

.seq-arrow {
    font-size: 0.75rem;
    color: var(--color-muted);
    align-self: center;
}

/* Action buttons */
.action-btns {
    display: flex;
    gap: 0.75rem;
}

.icon-btn {
    flex: 1;
    padding: 12px;
    background: rgba(232, 185, 35, 0.06);
    border: 1.5px solid rgba(232, 185, 35, 0.15);
    border-radius: 12px;
    color: var(--color-brown);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'Outfit', sans-serif;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.icon-btn:hover {
    background: rgba(232, 185, 35, 0.12);
    color: var(--color-brown-dark);
    border-color: rgba(232, 185, 35, 0.3);
}

.icon-btn.danger:hover {
    background: rgba(200, 144, 0, 0.15);
    color: var(--color-brown-dark);
    border-color: rgba(200, 144, 0, 0.3);
}

/* Context suggestions */
.ctx-wrap {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(232, 185, 35, 0.15);
}

.ctx-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-gold);
    margin-bottom: 1rem;
}

.ctx-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.ctx-chip {
    padding: 8px 14px;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1.5px solid rgba(232, 185, 35, 0.2);
    background: rgba(232, 185, 35, 0.06);
    color: var(--color-brown);
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.ctx-chip:hover {
    background: rgba(232, 185, 35, 0.12);
    border-color: rgba(232, 185, 35, 0.35);
    color: var(--color-brown-dark);
}

.ctx-chip.active {
    background: rgba(232, 185, 35, 0.15);
    border-color: rgba(232, 185, 35, 0.4);
    color: var(--color-brown-dark);
    box-shadow: 0 0 12px rgba(232, 185, 35, 0.2);
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

/* Responsive */
@media (max-width: 768px) {
    .rt-container {
        padding: 2rem 1.5rem;
    }

    .rt-layout {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .cam-frame {
        aspect-ratio: 4/3;
    }

    .right-panel {
        gap: 1.25rem;
    }

    .ctrl-card,
    .output-card {
        padding: 1.5rem;
    }

    .main-btn {
        padding: 14px;
        font-size: 0.9rem;
    }

    .gesture-blob {
        opacity: 0 !important;
    }

    .hand-gesture {
        font-size: 80px;
        opacity: 0;
    }
}

@media (max-width: 480px) {
    .rt-container {
        padding: 1.5rem 1rem;
    }

    .rt-title {
        font-size: clamp(1.8rem, 4vw, 2.2rem);
    }

    .detected-sign {
        font-size: clamp(1.5rem, 3vw, 2.2rem);
    }

    .cam-frame {
        aspect-ratio: 1/1;
    }

    .action-btns {
        flex-direction: column;
    }

    .icon-btn {
        flex: none;
        width: 100%;
    }
}
`;

const RealTime = () => {
    const [modelVariant, setModelVariant] = useState<SignLanguageModelValue>('bilstm');
    const [mlHealthRows, setMlHealthRows] = useState<SignsightMlHealthVariantRow[] | null>(null);
    const [lastRunModel, setLastRunModel] = useState<{ label: string; variant: string } | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [prediction, setPrediction] = useState("Waiting for sign...");
    const [tamilPrediction, setTamilPrediction] = useState("");
    const [confidence, setConfidence] = useState(0);
    const [cameraError, setCameraError] = useState("");
    const [cameraReady, setCameraReady] = useState(false);
    const [recordSeconds, setRecordSeconds] = useState(0);
    const [englishSentence, setEnglishSentence] = useState("");
    const [tamilSentence, setTamilSentence] = useState("");
    const [detectedSequence, setDetectedSequence] = useState<string[]>([]);
    const [contextSuggestions, setContextSuggestions] = useState<string[]>([]);
    const [selectedContext, setSelectedContext] = useState("general");
    const modelOptionsListed = useMemo(() => {
        if (mlHealthRows === null) return [...SIGN_LANGUAGE_MODEL_OPTIONS];
        const ok = new Set(mlHealthRows.filter((r) => r.artifact_paths_ok).map((r) => r.variant));
        const filt = SIGN_LANGUAGE_MODEL_OPTIONS.filter((o) => ok.has(o.value));
        return filt.length ? filt : [...SIGN_LANGUAGE_MODEL_OPTIONS];
    }, [mlHealthRows]);

    useEffect(() => {
        fetchSignsightMlHealthVariants(SIGN_SIGHT_ML_BASE_URI)
            .then((rows) => setMlHealthRows(rows))
            .catch(() => setMlHealthRows(null));
    }, []);

    useEffect(() => {
        const allowed = modelOptionsListed.map((o) => o.value);
        if (!allowed.includes(modelVariant)) {
            const first = allowed[0] as SignLanguageModelValue | undefined;
            if (first) setModelVariant(first);
        }
    }, [modelOptionsListed, modelVariant]);

    // FIX 1: Explicitly typed refs
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);           // FIX 5 (part): typed as Blob[]
    const recordTimerRef = useRef<number | null>(null);     // FIX 6: typed as number | null

    const RECORD_DURATION_SECONDS = 2.0;

    const startCamera = async () => {
        try {
            if (!navigator.mediaDevices?.getUserMedia) throw new Error("Camera API not supported");
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play();
                    setCameraReady(true);
                    setCameraError("");
                };
                videoRef.current.onerror = () => setCameraError("Camera error. Please try again.");
            }
        } catch (err) {
            // FIX 2: Type guard for unknown error
            let msg = "Camera access error. ";
            if (err && typeof err === "object" && "name" in err) {
                const name = (err as Error).name;
                const message = (err as Error).message;
                if (name === "NotAllowedError") msg += "Please allow camera permission.";
                else if (name === "NotFoundError") msg += "No camera found.";
                else if (name === "NotReadableError") msg += "Camera is in use by another app.";
                else msg += message || "Unknown error.";
            } else {
                msg += "Unknown error.";
            }
            setCameraError(msg);
            setCameraReady(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            // FIX 3: Explicit MediaStreamTrack type on parameter
            (videoRef.current.srcObject as MediaStream)
                .getTracks()
                .forEach((t: MediaStreamTrack) => t.stop());
            videoRef.current.srcObject = null;
        }
        setCameraReady(false);
    };

    useEffect(() => {
        return () => {
            stopCamera();
            if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop();
            // FIX 7: Null check before clearInterval
            if (recordTimerRef.current !== null) clearInterval(recordTimerRef.current);
        };
    }, []);

    const startRecording = async () => {
        if (!cameraReady) await startCamera();
        const stream = videoRef.current?.srcObject as MediaStream | null;
        if (!stream) {
            setCameraError("Camera not ready. Please try again.");
            return;
        }
        recordedChunksRef.current = [];
        setRecordSeconds(0);
        try {
            // FIX 4: mediaRecorderRef is typed as MediaRecorder | null, assignment is valid
            const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.ondataavailable = (e) => {
                if (e.data?.size > 0) recordedChunksRef.current.push(e.data); // FIX 5: Blob[] allows push(Blob)
            };
            mediaRecorder.onstop = async () => {
                if (!recordedChunksRef.current.length) {
                    setIsProcessing(false);
                    setIsRecording(false);
                    return;
                }
                await sendClipToBackend(new Blob(recordedChunksRef.current, { type: "video/webm" }));
            };
            mediaRecorder.start(100);
            setIsRecording(true);
            setIsProcessing(false);
            setPrediction("Detecting...");
            setTamilPrediction("");
            setConfidence(0);
            const startTime = Date.now();
            // FIX 6: setInterval returns number; ref typed as number | null
            recordTimerRef.current = window.setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000;
                setRecordSeconds(Math.min(elapsed, RECORD_DURATION_SECONDS));
                if (elapsed >= RECORD_DURATION_SECONDS) {
                    // FIX 7: Null check before clearInterval
                    if (recordTimerRef.current !== null) {
                        clearInterval(recordTimerRef.current);
                        recordTimerRef.current = null;
                    }
                    if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
                    setIsProcessing(true);
                    setIsRecording(false);
                }
            }, 100);
        } catch {
            setCameraError("Browser does not support video recording.");
        }
    };

    const stopRecording = () => {
        // FIX 7: Null check before clearInterval
        if (recordTimerRef.current !== null) {
            clearInterval(recordTimerRef.current);
            recordTimerRef.current = null;
        }
        if (mediaRecorderRef.current?.state !== "inactive") {
            mediaRecorderRef.current?.stop();
            setIsProcessing(true);
        }
        setIsRecording(false);
    };

    const toggleRecording = () => (isRecording ? stopRecording() : startRecording());

    // FIX 8a: Explicit Blob type for blob parameter
    const sendClipToBackend = async (blob: Blob) => {
        try {
            const formData = new FormData();
            formData.append("video", blob, "clip.webm");
            formData.append("model_variant", modelVariant);
            const ctrl = new AbortController();
            const tid = window.setTimeout(() => ctrl.abort(), 180000);
            let response!: Response;
            try {
                response = await fetch(`${SIGN_SIGHT_ML_BASE_URI}/predict_video`, {
                    method: "POST",
                    body: formData,
                    signal: ctrl.signal,
                });
            } finally {
                window.clearTimeout(tid);
            }
            if (!response.ok) {
                setPrediction("Error in detection");
                setConfidence(0);
                setLastRunModel(null);
                setIsProcessing(false);
                return;
            }
            const data = await response.json();
            if (data.error) {
                setPrediction(data.error);
                setTamilPrediction("");
                setEnglishSentence("");
                setTamilSentence("");
                setConfidence(0);
                setLastRunModel(null);
            } else {
                setPrediction(data.action_english || "No sign detected");
                setTamilPrediction(data.action_tamil || "");
                setEnglishSentence(data.english_sentence || "");
                setTamilSentence(data.tamil_sentence || "");
                setDetectedSequence(data.detected_sequence || []);
                setContextSuggestions(data.context_suggestions || []);
                setConfidence(data.confidence || 0);
                if (data.model_label || data.model_variant) {
                    setLastRunModel({
                        label: String(data.model_label || data.model_variant),
                        variant: String(data.model_variant || modelVariant),
                    });
                }
            }
        } catch (e: unknown) {
            let msg =
                typeof e === "object" &&
                e !== null &&
                "name" in e &&
                (e as DOMException).name === "AbortError"
                    ? "Timed out loading model (first inference can take long). Retry; watch Flask logs."
                    : e instanceof TypeError &&
                        typeof (e as Error).message === "string" &&
                        ((e as Error).message.includes("fetch") ||
                            (e as Error).message.includes("Failed to fetch"))
                      ? `Failed to fetch ${SIGN_SIGHT_ML_BASE_URI} — Flask down, crashed loading weights, or blocked. Start jeranapp.py and check terminal errors.`
                      : "Connection failed";
            setPrediction(msg);
            setTamilPrediction("");
            setEnglishSentence("");
            setTamilSentence("");
            setConfidence(0);
            setLastRunModel(null);
        } finally {
            setIsProcessing(false);
            setRecordSeconds(0);
        }
    };

    /** Local reset — inference API (`jeranapp.py`) has no session; clear UI state only. */
    const resetSequence = () => {
        setDetectedSequence([]);
        setEnglishSentence("");
        setTamilSentence("");
        setContextSuggestions([]);
    };

    /** Placeholder contexts for UI — pair with detections via `generateSentenceForContext`. */
    const getContextSuggestions = () => {
        setContextSuggestions(["general", "greeting", "formal"]);
    };

    // FIX 8b: Explicit string type for context parameter
    const generateSentenceForContext = (context: string) => {
        setSelectedContext(context);
        const pending =
            !prediction ||
            prediction === "Waiting for sign..." ||
            prediction === "Detecting..." ||
            prediction === "Error in detection" ||
            prediction === "Connection failed";
        if (!pending) {
            setDetectedSequence([prediction]);
            setEnglishSentence(prediction);
            setTamilSentence(tamilPrediction || "");
        } else {
            setEnglishSentence(`Record a sign first, then pick context: ${context}`);
            setTamilSentence("");
        }
    };

    const progressPct = `${(recordSeconds / RECORD_DURATION_SECONDS) * 100}%`;


    return (
        <div className="rt-root">
            <style>{STYLES}</style>

            {/* Animated Background */}
            <div className="organic-bg">
                <div className="gradient-mesh" />
                <div className="gesture-blob blob1" />
                <div className="gesture-blob blob2" />
                <div className="gesture-blob blob3" />
                <div className="gesture-blob blob4" />
                
                <div className="hand-gesture hand1">👋</div>
                <div className="hand-gesture hand2">🤟</div>
                <div className="hand-gesture hand3">✋</div>
                <div className="hand-gesture hand4">👐</div>
                <div className="hand-gesture hand5">🤞</div>
                <div className="hand-gesture hand6">🙌</div>

                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
            </div>

            <div className="rt-container">
                <div className="rt-header">
                    <p className="rt-eyebrow">Live Detection</p>
                    <h1 className="rt-title">
                        Real-Time <span>Sign Detection</span>
                    </h1>
                </div>

                <div className="rt-layout">
                    {/* Camera Section */}
                    <div className="cam-wrap">
                        <div className="cam-frame">
                            <video ref={videoRef} autoPlay playsInline muted />

                            {cameraError && (
                                <div className="cam-error-overlay">
                                    <div className="cam-error-icon">📷</div>
                                    <p className="cam-error-msg">{cameraError}</p>
                                    <button className="cam-enable-btn" onClick={startCamera}>
                                        Enable Camera
                                    </button>
                                </div>
                            )}

                            {!isRecording && !isProcessing && !cameraError && (
                                <div className="cam-overlay-idle">
                                    <button className="rec-btn" onClick={toggleRecording}>
                                        🎥
                                    </button>
                                    <span className="rec-btn-label">Tap to Begin</span>
                                </div>
                            )}

                            {isRecording && (
                                <>
                                    <div className="rec-badge">
                                        <span className="rec-dot" />
                                        Recording
                                    </div>
                                    <div className="progress-track">
                                        <div className="progress-fill" style={{ width: progressPct }} />
                                    </div>
                                </>
                            )}

                            {isProcessing && (
                                <div className="processing-overlay">
                                    <div className="spinner" />
                                    <span className="processing-label">Analyzing gesture…</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="right-panel">
                        {/* Controls */}
                        <div className="ctrl-card">
                            <p className="ctrl-title">Controls</p>
                            <div className="rt-model-picker">
                                <label htmlFor="sign-model-rt">Recognition model</label>
                                <select
                                    id="sign-model-rt"
                                    value={modelVariant}
                                    disabled={isRecording || isProcessing}
                                    onChange={(e) =>
                                        setModelVariant(e.target.value as SignLanguageModelValue)
                                    }
                                >
                                    {modelOptionsListed.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className={`main-btn ${isRecording ? 'stop' : isProcessing ? 'processing' : 'start'}`}
                                onClick={toggleRecording}
                                disabled={isProcessing}
                            >
                                {isRecording ? '⏹ Stop Recording' : isProcessing ? '⏳ Processing…' : '⏺ Start Recording'}
                            </button>
                            <div className="status-row">
                                <span className={`status-dot ${cameraError ? 'red' : cameraReady ? 'green' : 'yellow'}`} />
                                <span className="status-text">
                                    {cameraError
                                        ? 'Camera unavailable'
                                        : cameraReady
                                            ? isRecording
                                                ? `Recording — ${recordSeconds.toFixed(1)}s / ${RECORD_DURATION_SECONDS}s`
                                                : isProcessing
                                                    ? 'Analyzing…'
                                                    : 'Camera ready'
                                            : 'Initializing camera…'}
                                </span>
                            </div>
                        </div>

                        {/* Output */}
                        <div className="output-card">
                            <p className="output-label">Detected Sign (English)</p>
                            <div className="detected-sign">{prediction}</div>

                            {tamilPrediction && (
                                <>
                                    <p className="output-label">Tamil Meaning</p>
                                    <div className="tamil-sign">{tamilPrediction}</div>
                                </>
                            )}

                            {lastRunModel && (
                                <>
                                    <p className="output-label" style={{ marginTop: '1rem' }}>Model used</p>
                                    <div className="detected-sign" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)' }}>
                                        {lastRunModel.label} ({lastRunModel.variant})
                                    </div>
                                </>
                            )}

                            <p className="output-label" style={{ marginTop: '1.5rem' }}>Confidence Score</p>
                            <div className="conf-row">
                                <span className="conf-pct">{(confidence * 100).toFixed(1)}%</span>
                                <span className="conf-label">Accuracy</span>
                            </div>
                            <div className="conf-track">
                                <div className="conf-fill" style={{ width: `${confidence * 100}%` }} />
                            </div>

                            {(englishSentence || tamilSentence) && (
                                <div className="sentence-box">
                                    {englishSentence && <p className="sentence-en">"{englishSentence}"</p>}
                                    {tamilSentence && <p className="sentence-ta">"{tamilSentence}"</p>}
                                </div>
                            )}

                            {detectedSequence.length > 0 && (
                                <div className="sequence-box">
                                    {detectedSequence.map((s, i) => (
                                        <React.Fragment key={i}>
                                            <span className="seq-tag">{s}</span>
                                            {i < detectedSequence.length - 1 && <span className="seq-arrow">›</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}

                            <div className="action-btns">
                                <button className="icon-btn">🔊 Speak</button>
                                <button className="icon-btn danger" onClick={resetSequence}>
                                    ↺ Reset
                                </button>
                                <button className="icon-btn" onClick={getContextSuggestions}>
                                    💬 Context
                                </button>
                            </div>

                            {contextSuggestions.length > 0 && (
                                <div className="ctx-wrap">
                                    <p className="ctx-label">Context Options</p>
                                    <div className="ctx-chips">
                                        {contextSuggestions.map((ctx) => (
                                            <button
                                                key={ctx}
                                                className={`ctx-chip ${selectedContext === ctx ? 'active' : ''}`}
                                                onClick={() => generateSentenceForContext(ctx)}
                                            >
                                                {ctx}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealTime;

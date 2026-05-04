import React, { useState, useRef, useEffect, useMemo } from "react";
import {
    SIGN_LANGUAGE_MODEL_OPTIONS,
    SIGN_SIGHT_ML_BASE_URI,
    fetchSignsightMlHealthVariants,
    type SignLanguageModelValue,
    type SignsightMlHealthVariantRow,
} from "../../config/CONFIG";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Inter:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; }

:root {
  --color-cream: #FFFBF0;
  --color-gold: #E8B923;
  --color-gold-dark: #C89000;
  --color-accent: #F5D76E;
  --color-brown: #6B4C2F;
  --color-brown-dark: #5C3D1F;
  --color-light-text: rgba(61, 42, 31, 0.7);
  --color-muted: rgba(61, 42, 31, 0.45);
}

.up-root {
    min-height: 100vh;
    background: var(--color-cream);
    color: var(--color-brown);
    font-family: 'Inter', sans-serif;
    padding-top: 72px;
    position: relative;
    overflow-x: hidden;
}

.up-mesh { 
    position: fixed; 
    inset: 0; 
    pointer-events: none; 
    z-index: 0; 
    overflow: hidden; 
}

/* Animated gradient mesh */
.up-gradient-mesh {
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

/* Animated blobs */
.up-blob {
    position: absolute;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    filter: blur(80px);
    pointer-events: none;
}

.up-blob1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, rgba(232, 185, 35, 0.08), rgba(200, 144, 0, 0.05));
    top: -200px;
    right: -100px;
    animation: blobDrift1 18s ease-in-out infinite;
}

.up-blob2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(45deg, rgba(107, 76, 47, 0.05), rgba(232, 185, 35, 0.06));
    bottom: -150px;
    left: -50px;
    animation: blobDrift2 22s ease-in-out infinite;
}

.up-blob3 {
    width: 480px;
    height: 480px;
    background: linear-gradient(225deg, rgba(245, 215, 110, 0.07), rgba(200, 144, 0, 0.05));
    top: 40%;
    left: 2%;
    animation: blobDrift3 20s ease-in-out infinite;
}

.up-blob4 {
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
.up-particle {
    position: absolute;
    width: 5px;
    height: 5px;
    background: var(--color-gold);
    border-radius: 50%;
    pointer-events: none;
    box-shadow: 0 0 12px rgba(232, 185, 35, 0.6);
    opacity: 0.25;
}

.up-particle:nth-child(1) { top: 15%; left: 18%; animation: float 8s ease-in-out infinite; }
.up-particle:nth-child(2) { top: 45%; right: 12%; animation: float 10s ease-in-out infinite; animation-delay: -2s; }
.up-particle:nth-child(3) { bottom: 35%; left: 25%; animation: float 12s ease-in-out infinite; animation-delay: -4s; }
.up-particle:nth-child(4) { top: 65%; right: 18%; animation: float 9s ease-in-out infinite; animation-delay: -3s; }
.up-particle:nth-child(5) { bottom: 18%; right: 28%; animation: float 11s ease-in-out infinite; animation-delay: -5s; }

@keyframes float {
    0%, 100% { opacity: 0.2; transform: translate(0, 0) scale(1); }
    20% { opacity: 0.6; transform: translate(-30px, -30px) scale(1.4); }
    50% { opacity: 0.3; transform: translate(40px, 40px) scale(1); }
    80% { opacity: 0.5; transform: translate(-20px, 50px) scale(1.3); }
}

.up-orb { display: none; }
.up-grid { display: none; }

.up-container { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem 6rem; position: relative; z-index: 1; }

/* Header */
.up-header { text-align: center; margin-bottom: 3.5rem; }
.up-eyebrow { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-gold); margin-bottom: 0.75rem; }
.up-title { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.03em; color: var(--color-brown); margin-bottom: 1rem; }
.up-title span { background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.up-subtitle { font-size: 1rem; font-weight: 400; color: var(--color-light-text); max-width: 480px; margin: 0 auto; line-height: 1.7; }

/* Layout */
.up-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; max-width: 1000px; margin: 0 auto; }
@media (max-width: 860px) { .up-layout { grid-template-columns: 1fr; } }

/* Upload card */
.upload-card {
    background: rgba(255,255,255,0.8);
    border: 1px solid rgba(232, 185, 35, 0.2);
    border-radius: 24px;
    padding: 2rem;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 24px rgba(107, 76, 47, 0.08);
}
.model-picker { margin-bottom: 1rem; }
.model-picker label { display: block; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.45rem; }
.model-picker select {
    width: 100%; padding: 12px 14px; border-radius: 12px;
    border: 1px solid rgba(232, 185, 35, 0.25); background: rgba(255,255,255,0.95);
    font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-brown); cursor: pointer;
}

/* Drop zone */
.drop-zone {
    border: 1.5px dashed rgba(232, 185, 35, 0.3);
    border-radius: 18px;
    padding: 2rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(232, 185, 35, 0.03);
    position: relative;
    overflow: hidden;
}
.drop-zone:hover { border-color: rgba(232, 185, 35, 0.6); background: rgba(232, 185, 35, 0.06); }
.drop-zone.has-file { border-color: rgba(200, 144, 0, 0.3); background: rgba(200, 144, 0, 0.03); }
.drop-zone.dragging { border-color: var(--color-gold); background: rgba(232, 185, 35, 0.08); box-shadow: 0 0 30px rgba(232, 185, 35, 0.12); }

.drop-icon-wrap {
    width: 64px; height: 64px;
    background: rgba(232, 185, 35, 0.08);
    border: 1px solid rgba(232, 185, 35, 0.15);
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.75rem;
    margin: 0 auto 1.25rem;
}
.drop-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--color-brown); margin-bottom: 0.4rem; }
.drop-sub { font-size: 0.82rem; color: var(--color-muted); margin-bottom: 0.5rem; }
.drop-size { font-size: 0.72rem; color: rgba(107, 76, 47, 0.25); letter-spacing: 0.05em; }

/* Video preview */
.video-preview-wrap { position: relative; }
.video-preview { width: 100%; border-radius: 12px; max-height: 200px; object-fit: cover; display: block; }
.file-name { font-size: 0.8rem; color: rgba(200, 144, 0, 0.8); margin-top: 0.6rem; text-align: center; font-weight: 500; }
.remove-btn { display: block; margin: 0.5rem auto 0; background: none; border: none; font-size: 0.75rem; color: var(--color-muted); cursor: pointer; text-decoration: underline; transition: color 0.2s; }
.remove-btn:hover { color: var(--color-brown); }

/* Analyze button */
.analyze-btn {
    width: 100%; margin-top: 1.5rem; padding: 14px;
    border: none; border-radius: 14px;
    font-family: 'Playfair Display', serif; font-size: 0.95rem;
    font-weight: 700; letter-spacing: 0.03em;
    cursor: pointer; transition: all 0.3s ease;
    display: flex; align-items: center; justify-content: center; gap: 10px;
}
.analyze-btn.active {
    background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
    color: white;
    box-shadow: 0 6px 24px rgba(232, 185, 35, 0.3);
}
.analyze-btn.active:hover { transform: translateY(-1px); box-shadow: 0 10px 36px rgba(232, 185, 35, 0.4); }
.analyze-btn.disabled { background: rgba(107, 76, 47, 0.06); color: var(--color-muted); cursor: not-allowed; }

/* Spinner */
.btn-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.2); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Error */
.error-box {
    margin-top: 1rem; padding: 1rem 1.25rem;
    background: rgba(220, 38, 38, 0.07);
    border: 1px solid rgba(220, 38, 38, 0.15);
    border-radius: 12px;
    display: flex; align-items: flex-start; gap: 10px;
}
.error-icon { font-size: 1rem; flex-shrink: 0; }
.error-text { font-size: 0.85rem; color: rgba(200, 100, 100, 0.9); line-height: 1.5; }

/* ── Results card ── */
.results-card {
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(232, 185, 35, 0.2);
    border-radius: 24px;
    padding: 2rem;
    backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.5s ease both;
    box-shadow: 0 4px 24px rgba(107, 76, 47, 0.08);
}
.results-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--color-gold), var(--color-gold-dark), #D4881A);
}

.results-heading {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 800;
    color: var(--color-brown); margin-bottom: 1.75rem;
    display: flex; align-items: center; gap: 8px;
}

/* Result item */
.result-item { margin-bottom: 1.25rem; }
.result-item-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 0.5rem; }
.result-item-value { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 800; letter-spacing: -0.02em; }
.result-item-value.en { color: var(--color-brown); }
.result-item-value.ta { background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 1.8rem; }

/* Confidence meter */
.conf-section { margin-bottom: 0; }
.conf-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.6rem; }
.conf-pct-label { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 800; color: var(--color-brown); }
.conf-score-label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-muted); }
.conf-bar-track { height: 6px; background: rgba(232, 185, 35, 0.1); border-radius: 6px; overflow: hidden; }
.conf-bar-fill { height: 100%; border-radius: 6px; background: linear-gradient(90deg, var(--color-gold), var(--color-gold-dark), #D4881A); transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 10px rgba(232, 185, 35, 0.3); }

/* Empty state */
.empty-state {
    background: rgba(255,255,255,0.5);
    border: 1.5px dashed rgba(232, 185, 35, 0.15);
    border-radius: 24px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 4rem 2rem; text-align: center;
    min-height: 300px;
}
.empty-icon { font-size: 3rem; opacity: 0.2; margin-bottom: 1rem; }
.empty-label { font-size: 0.85rem; color: var(--color-muted); font-weight: 400; line-height: 1.6; }

/* Divider */
.result-divider { height: 1px; background: rgba(232, 185, 35, 0.07); margin: 1.25rem 0; }

/* Animations */
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .up-blob { opacity: 0.5 !important; }
    .hand-gesture { font-size: 80px; opacity: 0; }
}

@media (max-width: 480px) {
    .up-container { padding: 2rem 1.5rem 4rem; }
    .up-title { font-size: clamp(1.8rem, 4vw, 2.5rem); }
}
`;

const Upload: React.FC = () => {
    const [modelVariant, setModelVariant] = useState<SignLanguageModelValue>("bilstm");
    const [mlHealthRows, setMlHealthRows] = useState<SignsightMlHealthVariantRow[] | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<any>(null);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) { setFile(f); setPreviewUrl(URL.createObjectURL(f)); setResult(null); setError(null); }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true); setError(null); setResult(null);
        const formData = new FormData();
        formData.append("video", file);
        formData.append("model_variant", modelVariant);
        try {
            const ctrl = new AbortController();
            const tid = window.setTimeout(() => ctrl.abort(), 180000);
            const response = await fetch(`${SIGN_SIGHT_ML_BASE_URI}/predict_video`, {
                method: "POST",
                body: formData,
                signal: ctrl.signal,
            });
            window.clearTimeout(tid);
            if (!response.ok) {
                let msg = `HTTP ${response.status}`;
                try {
                    const d = await response.json() as Record<string, unknown>;
                    msg = typeof d?.error === "string" ? d.error : typeof d?.detail === "object"
                        ? JSON.stringify(d.detail)
                        : JSON.stringify(d);
                } catch { /* non-JSON error body */ }
                throw new Error(msg);
            }
            setResult(await response.json());
        } catch (err: unknown) {
            if (err instanceof DOMException && err.name === "AbortError") {
                setError(
                    "Request timed out — the backend may still be loading that model weights (first use can take minutes). Check the Flask terminal, then retry."
                );
            } else if (
                err instanceof TypeError &&
                typeof (err as Error).message === "string" &&
                ((err as Error).message.includes("fetch") ||
                    (err as Error).message.includes("network") ||
                    (err as Error).message.includes("Failed to fetch"))
            ) {
                setError(
                    `Cannot reach the ML backend at ${SIGN_SIGHT_ML_BASE_URI}. Start jeranapp.py (Flask) and verify CORS / firewall. Also ensure the terminal did not crash while loading GPU weights.`
                );
            } else {
                setError(err instanceof Error ? err.message : "Request failed");
            }
        }
        finally { setLoading(false); }
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragging(true); };
    const handleDragLeave = () => setDragging(false);
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation(); setDragging(false);
        const f = e.dataTransfer.files[0];
        if (f?.type.startsWith('video/')) { setFile(f); setPreviewUrl(URL.createObjectURL(f)); setResult(null); setError(null); }
    };

    const removeFile = (e: React.MouseEvent) => { e.stopPropagation(); setFile(null); setPreviewUrl(null); setResult(null); };

    return (
        <div className="up-root">
            <style>{STYLES}</style>

            <div className="up-mesh">
                <div className="up-gradient-mesh" />
                <div className="up-blob up-blob1" />
                <div className="up-blob up-blob2" />
                <div className="up-blob up-blob3" />
                <div className="up-blob up-blob4" />
                
                <div className="hand-gesture hand1">👋</div>
                <div className="hand-gesture hand2">🤟</div>
                <div className="hand-gesture hand3">✋</div>
                <div className="hand-gesture hand4">👐</div>
                <div className="hand-gesture hand5">🤞</div>
                <div className="hand-gesture hand6">🙌</div>
                
                <div className="up-particle" />
                <div className="up-particle" />
                <div className="up-particle" />
                <div className="up-particle" />
                <div className="up-particle" />
            </div>

            <div className="up-container">
                {/* Header */}
                <div className="up-header">
                    <p className="up-eyebrow">Video Analysis</p>
                    <h1 className="up-title">Analyze <span>Sign Language</span></h1>
                    <p className="up-subtitle">Upload a video of a sign language gesture to receive an instant AI-powered prediction with Tamil translation.</p>
                </div>

                <div className="up-layout">
                    {/* Upload */}
                    <div className="upload-card">
                        <div className="model-picker">
                            <label htmlFor="sign-model-upload">Recognition model</label>
                            <select
                                id="sign-model-upload"
                                value={modelVariant}
                                onChange={(e) => setModelVariant(e.target.value as SignLanguageModelValue)}
                            >
                                {modelOptionsListed.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>
                        <div
                            className={`drop-zone ${file ? 'has-file' : ''} ${dragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" style={{ display: 'none' }}/>

                            {previewUrl ? (
                                <div className="video-preview-wrap">
                                    <video src={previewUrl} controls className="video-preview" onClick={e => e.stopPropagation()}/>
                                    <p className="file-name">📁 {file?.name}</p>
                                    <button className="remove-btn" onClick={removeFile}>Remove & upload another</button>
                                </div>
                            ) : (
                                <>
                                    <div className="drop-icon-wrap">⬆</div>
                                    <p className="drop-title">Drop your video here</p>
                                    <p className="drop-sub">or click to browse files</p>
                                    <p className="drop-size">MP4 · WebM · MOV — max 50 MB</p>
                                </>
                            )}
                        </div>

                        <button
                            className={`analyze-btn ${!file || loading ? 'disabled' : 'active'}`}
                            onClick={handleUpload}
                            disabled={!file || loading}
                        >
                            {loading ? (
                                <><div className="btn-spinner"/> Analyzing…</>
                            ) : (
                                <>🔍 Analyze Video</>
                            )}
                        </button>

                        {error && (
                            <div className="error-box">
                                <span className="error-icon">⚠</span>
                                <p className="error-text">{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Results */}
                    {result ? (
                        <div className="results-card">
                            <h3 className="results-heading">
                                <span className="check-icon">✓</span> Analysis Complete
                            </h3>

                            <div className="result-item">
                                <p className="result-item-label">Detected Sign (English)</p>
                                <div className="result-item-value en">{result.action_english}</div>
                            </div>

                            <div className="result-divider"/>

                            <div className="result-item">
                                <p className="result-item-label">Tamil Meaning</p>
                                <div className="result-item-value ta">{result.action_tamil}</div>
                            </div>

                            <div className="result-divider"/>

                            {(result?.model_label || result?.model_variant) && (
                                <>
                                    <div className="result-item">
                                        <p className="result-item-label">Model used</p>
                                        <div className="result-item-value en" style={{ fontSize: '1.1rem' }}>
                                            {(result.model_label as string)} ({String(result.model_variant)})
                                        </div>
                                    </div>
                                    <div className="result-divider"/>
                                </>
                            )}

                            <div className="conf-section">
                                <p className="result-item-label">Confidence Score</p>
                                <div className="conf-header">
                                    <span className="conf-pct-label">{(result.confidence * 100).toFixed(1)}%</span>
                                    <span className="conf-score-label">Accuracy</span>
                                </div>
                                <div className="conf-bar-track">
                                    <div className="conf-bar-fill" style={{ width: `${(result.confidence * 100).toFixed(1)}%` }}/>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">🎬</div>
                            <p className="empty-label">Upload a sign language video to see<br/>the prediction results here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upload;

import React, { useState, useRef } from "react";
import { Upload as UploadIcon, Video, AlertCircle, CheckCircle, Loader, Hand, Zap } from "lucide-react";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append("video", file);

        try {
            // Adjust port if your backend runs on a different port
            const response = await fetch("http://localhost:5000/predict_video", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to process video");
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('video/')) {
            setFile(droppedFile);
            setPreviewUrl(URL.createObjectURL(droppedFile));
            setResult(null);
            setError(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm mb-6">
                        <Video className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-semibold text-cyan-300">Upload & Analyze</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400 mb-4">
                        Video Analysis
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Upload a video of sign language gestures and get instant AI-powered predictions with confidence scores.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-start">

                    {/* Upload Section */}
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur border border-cyan-500/20 p-8 rounded-3xl shadow-xl">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                            <Hand className="w-8 h-8 text-cyan-400" />
                            Upload Your Video
                        </h3>
                        <div
                            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer
                                ${file ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-slate-600 hover:border-cyan-500/50 hover:bg-slate-700/30'}
                            `}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="video/*"
                                className="hidden"
                            />

                            {previewUrl ? (
                                <div className="space-y-4">
                                    <video
                                        src={previewUrl}
                                        controls
                                        className="w-full rounded-xl max-h-64 object-cover mx-auto border border-cyan-500/30"
                                    />
                                    <div className="space-y-2">
                                        <p className="text-sm text-cyan-300 font-medium">✓ {file.name}</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                                setPreviewUrl(null);
                                                setResult(null);
                                            }}
                                            className="text-xs text-slate-400 hover:text-cyan-300 underline transition-colors"
                                        >
                                            Change Video
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-12 flex flex-col items-center">
                                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 border border-cyan-500/30">
                                        <UploadIcon size={32} className="text-cyan-400" />
                                    </div>
                                    <h4 className="text-xl font-semibold mb-2">Click to Upload</h4>
                                    <p className="text-slate-400 text-sm mb-4">or drag and drop your video file here</p>
                                    <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">Max 50MB • MP4, WebM, MOV</span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={!file || loading}
                            className={`w-full mt-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 ${
                                !file || loading
                                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader className="animate-spin" size={20} /> Processing...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" /> Analyze Video
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                                <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
                                <div className="text-red-200 text-sm">{error}</div>
                            </div>
                        )}
                    </div>

                    {/* Results Section */}
                    {result ? (
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur border border-teal-500/20 p-8 rounded-3xl shadow-xl relative overflow-hidden animate-fade-in">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div>

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <CheckCircle className="text-teal-400" size={28} /> Detection Result
                            </h3>

                            <div className="space-y-6">
                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-cyan-500/20">
                                    <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Detected Sign</span>
                                    <div className="text-4xl font-bold text-cyan-400 mt-3">{result.action}</div>
                                </div>

                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-teal-500/20">
                                    <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Tamil Translation</span>
                                    <div className="text-4xl font-bold text-teal-300 mt-3">{result.tamil_action}</div>
                                </div>

                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                                    <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Confidence Score</span>
                                    <div className="mt-4 h-3 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-1000"
                                            style={{ width: `${(result.confidence * 100).toFixed(1)}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-2xl font-bold text-slate-200 mt-3">
                                        {(result.confidence * 100).toFixed(1)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/30 border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center p-12 text-center">
                            <Video size={56} className="mb-4 text-slate-600 opacity-60" />
                            <h4 className="text-xl font-semibold text-slate-400 mb-2">Results Appear Here</h4>
                            <p className="text-slate-500">Upload a video to see the AI analysis and predictions.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Upload;

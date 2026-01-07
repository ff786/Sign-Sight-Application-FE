import React, { useState, useRef, useEffect } from "react";
import { Upload as UploadIcon, X, CheckCircle2, Loader2, AlertCircle, FileVideo } from "lucide-react";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (!selectedFile.type.startsWith('video/')) {
                setError('Please select a valid video file');
                return;
            }
            if (selectedFile.size > 50 * 1024 * 1024) {
                setError('File size must be less than 50MB');
                return;
            }
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
            const response = await fetch("http://localhost:5000/predict_video", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Failed to process video");
                return;
            }
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message || "Connection failed");
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
        if (droppedFile) {
            if (!droppedFile.type.startsWith('video/')) {
                setError('Please drop a valid video file');
                return;
            }
            if (droppedFile.size > 50 * 1024 * 1024) {
                setError('File size must be less than 50MB');
                return;
            }
            setFile(droppedFile);
            setPreviewUrl(URL.createObjectURL(droppedFile));
            setResult(null);
            setError(null);
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
        setResult(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Upload</h1>
                    <p className="text-gray-600">Upload and analyze pre-recorded sign language videos</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div>
                        {!previewUrl ? (
                            <div
                                className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer transition-all"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="video/*"
                                    className="hidden"
                                />
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <UploadIcon className="w-10 h-10 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Drop your video here</h3>
                                    <p className="text-gray-600 mb-4">or click to browse from your device</p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 border border-gray-200">
                                        MP4, WebM, MOV • Max 50MB
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Video Preview */}
                                <div className="relative bg-white rounded-2xl overflow-hidden border-2 border-gray-200">
                                    <video
                                        src={previewUrl}
                                        controls
                                        className="w-full aspect-video object-cover"
                                    />
                                    <button
                                        onClick={removeFile}
                                        className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                {/* File Info */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-lg font-semibold text-gray-900 truncate">{file?.name}</div>
                                            <div className="text-sm text-gray-600">
                                                {(file?.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Analyze Button */}
                                <button
                                    onClick={handleUpload}
                                    disabled={!file || loading}
                                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${
                                        !file || loading
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Analyzing Video...
                                        </>
                                    ) : (
                                        <>
                                            <UploadIcon className="w-6 h-6" />
                                            Analyze with AI
                                        </>
                                    )}
                                </button>

                                {/* Error Display */}
                                {error && (
                                    <div className="bg-red-50 rounded-xl p-6 border border-red-200 flex items-start gap-4">
                                        <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                                        <div>
                                            <div className="text-lg font-bold text-red-900 mb-1">Analysis Failed</div>
                                            <div className="text-sm text-red-700">{error}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Results Section */}
                    <div>
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 sticky top-24">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h3>

                            {result ? (
                                <div className="space-y-6">
                                    {/* Detected Sign */}
                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                        <div className="text-xs text-blue-600 uppercase tracking-wider mb-3 font-semibold">Detected Sign</div>
                                        <div className="text-4xl font-bold text-blue-900 mb-2">
                                            {result.action}
                                        </div>
                                    </div>

                                    {/* Tamil Translation */}
                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                        <div className="text-xs text-blue-600 uppercase tracking-wider mb-3 font-semibold">Tamil Translation</div>
                                        <div className="text-4xl font-bold text-blue-900 font-tamil mb-2">
                                            {result.tamil_action}
                                        </div>
                                    </div>

                                    {/* Confidence Score */}
                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                        <div className="text-xs text-blue-600 uppercase tracking-wider mb-4 font-semibold">Confidence Score</div>
                                        <div className="h-4 bg-blue-200 rounded-full overflow-hidden mb-4">
                                            <div
                                                className={`h-full transition-all duration-1000 ${
                                                    result.confidence >= 0.8 ? 'bg-green-600' : result.confidence >= 0.5 ? 'bg-blue-600' : 'bg-yellow-600'
                                                }`}
                                                style={{ width: `${result.confidence * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <div className="text-5xl font-bold text-blue-900">
                                                {(result.confidence * 100).toFixed(1)}%
                                            </div>
                                            <div className={`text-sm font-semibold ${
                                                result.confidence >= 0.8 ? 'text-green-600' : result.confidence >= 0.5 ? 'text-blue-600' : 'text-yellow-600'
                                            }`}>
                                                {result.confidence >= 0.8 ? 'Excellent' : result.confidence >= 0.5 ? 'Good' : 'Fair'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <FileVideo className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                                    <p className="text-xl text-gray-400 mb-2">No results yet</p>
                                    <p className="text-sm text-gray-500">Upload a video to see AI analysis</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;


import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, Loader2, AlertCircle, Camera } from 'lucide-react';

const RealTime = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [tamilPrediction, setTamilPrediction] = useState(null);
    const [confidence, setConfidence] = useState(0);
    const [cameraError, setCameraError] = useState("");
    const [cameraReady, setCameraReady] = useState(false);
    const [recordSeconds, setRecordSeconds] = useState(0);

    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const recordTimerRef = useRef(null);

    const RECORD_DURATION_SECONDS = 2.0;

    const startCamera = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setCameraError("Camera API not supported in this browser");
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play().catch(() => {});
                    setCameraReady(true);
                    setCameraError("");
                };
            }
        } catch (err) {
            let msg = "Camera access denied. ";
            if (err.name === "NotAllowedError") msg += "Please allow camera permission.";
            else if (err.name === "NotFoundError") msg += "No camera found.";
            else msg += "Please check your camera.";
            setCameraError(msg);
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(t => t.stop());
            videoRef.current.srcObject = null;
        }
        setCameraReady(false);
    };

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
            if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop();
            if (recordTimerRef.current) clearInterval(recordTimerRef.current);
        };
    }, []);

    const startRecording = async () => {
        if (!cameraReady) await startCamera();
        const stream = videoRef.current?.srcObject;
        if (!stream) return;

        recordedChunksRef.current = [];
        setRecordSeconds(0);

        try {
            const types = ["video/webm;codecs=vp8", "video/webm;codecs=vp9", "video/webm"];
            const mimeType = types.find(t => MediaRecorder.isTypeSupported(t)) || types[2];
            const mediaRecorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (e) => {
                if (e.data?.size > 0) recordedChunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                if (!recordedChunksRef.current.length) {
                    setIsProcessing(false);
                    setIsRecording(false);
                    return;
                }
                const blob = new Blob(recordedChunksRef.current, { type: mimeType });
                await sendClipToBackend(blob);
            };

            mediaRecorder.start(100);
            setIsRecording(true);
            setPrediction(null);
            setTamilPrediction(null);
            setConfidence(0);

            const startTime = Date.now();
            recordTimerRef.current = setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000;
                setRecordSeconds(Math.min(elapsed, RECORD_DURATION_SECONDS));
                if (elapsed >= RECORD_DURATION_SECONDS) {
                    clearInterval(recordTimerRef.current);
                    if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
                    setIsProcessing(true);
                    setIsRecording(false);
                }
            }, 100);
        } catch (err) {
            console.error(err);
            setCameraError("Recording not supported in this browser.");
        }
    };

    const stopRecording = () => {
        if (recordTimerRef.current) clearInterval(recordTimerRef.current);
        if (mediaRecorderRef.current?.state !== "inactive") {
            mediaRecorderRef.current.stop();
            setIsProcessing(true);
        }
        setIsRecording(false);
    };

    const sendClipToBackend = async (blob) => {
        try {
            const formData = new FormData();
            formData.append("video", blob, "clip.webm");
            const response = await fetch("http://localhost:5000/predict_video", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                setPrediction("Error in detection");
                setIsProcessing(false);
                return;
            }

            const data = await response.json();
            setPrediction(data.action || "No sign detected");
            setTamilPrediction(data.tamil_action || null);
            setConfidence(data.confidence || 0);
        } catch (err) {
            console.error("Network error:", err);
            setPrediction("Connection failed");
        } finally {
            setIsProcessing(false);
            setRecordSeconds(0);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Detection</h1>
                    <p className="text-gray-600">Real-time sign language recognition with instant AI feedback</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Video Preview */}
                    <div className="lg:col-span-2">
                        <div className="relative bg-black rounded-2xl overflow-hidden aspect-video border-2 border-gray-200">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover"
                            />

                            {cameraError && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 p-8">
                                    <div className="text-center max-w-md">
                                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Camera Access Required</h3>
                                        <p className="text-gray-300 mb-6">{cameraError}</p>
                                        <button
                                            onClick={startCamera}
                                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                                        >
                                            <Camera className="w-5 h-5 inline mr-2" />
                                            Retry Camera
                                        </button>
                                    </div>
                                </div>
                            )}

                            {isRecording && (
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-2 rounded-lg">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    <span className="text-sm font-semibold text-white">Recording {recordSeconds.toFixed(1)}s</span>
                                </div>
                            )}

                            {isProcessing && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                                    <div className="text-center">
                                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
                                        <p className="text-xl font-semibold text-white">Analyzing gesture...</p>
                                    </div>
                                </div>
                            )}

                            {cameraReady && !isRecording && !isProcessing && (
                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500 px-3 py-2 rounded-lg">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="text-sm font-semibold text-white">Ready</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls & Status */}
                    <div className="space-y-6">
                        {/* Control Panel */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Controls</h3>

                            <button
                                onClick={isRecording ? stopRecording : startRecording}
                                disabled={isProcessing || !cameraReady}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                                    isRecording
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : isProcessing || !cameraReady
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                                }`}
                            >
                                {isRecording ? (
                                    <>
                                        <Square className="w-5 h-5 fill-current" />
                                        Stop Recording
                                    </>
                                ) : isProcessing ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5 fill-current" />
                                        Start Recording
                                    </>
                                )}
                            </button>

                            {isRecording && (
                                <div className="mt-4">
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 transition-all"
                                            style={{ width: `${(recordSeconds / RECORD_DURATION_SECONDS) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                                <div className="text-xs text-gray-500 mb-1">Camera</div>
                                <div className={`text-sm font-bold ${cameraReady ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {cameraReady ? '● Ready' : '● Connecting'}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                                <div className="text-xs text-gray-500 mb-1">Status</div>
                                <div className="text-sm font-bold text-gray-900">
                                    {isRecording ? '● Recording' : isProcessing ? '● Processing' : '● Idle'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="mt-8">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Detection Results</h3>

                        {prediction ? (
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-2 font-semibold">Detected Sign</div>
                                    <div className="text-3xl font-bold text-blue-900">{prediction}</div>
                                </div>

                                {tamilPrediction && (
                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                        <div className="text-xs text-blue-600 uppercase tracking-wider mb-2 font-semibold">Tamil</div>
                                        <div className="text-3xl font-bold text-blue-900 font-tamil">{tamilPrediction}</div>
                                    </div>
                                )}

                                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-3 font-semibold">Confidence</div>
                                    <div className="h-3 bg-blue-200 rounded-full overflow-hidden mb-3">
                                        <div
                                            className={`h-full ${
                                                confidence >= 0.8 ? 'bg-green-600' : confidence >= 0.5 ? 'bg-blue-600' : 'bg-yellow-600'
                                            }`}
                                            style={{ width: `${confidence * 100}%` }}
                                        />
                                    </div>
                                    <div className="text-3xl font-bold text-blue-900">
                                        {(confidence * 100).toFixed(1)}%
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-xl text-gray-400">Start recording to see results</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealTime;


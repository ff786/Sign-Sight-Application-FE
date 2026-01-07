import React, { useEffect, useRef, useState } from 'react';
import { Camera, StopCircle, Volume2, RefreshCw } from 'lucide-react';

// New approach:
// - Do NOT run MediaPipe Holistic in the browser (wasm was crashing / freezing the tab).
// - Instead, record a short WebM clip from the webcam and send it to the existing
//   Flask backend `/predict_video` endpoint, which already runs MediaPipe + the model.
// - This avoids all wasm issues and still gives near real-time detection.

const RealTime = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [prediction, setPrediction] = useState("Waiting for sign...");
    const [tamilPrediction, setTamilPrediction] = useState("");
    const [confidence, setConfidence] = useState(0);
    const [cameraError, setCameraError] = useState("");
    const [cameraReady, setCameraReady] = useState(false);
    const [recordSeconds, setRecordSeconds] = useState(0);

    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const recordTimerRef = useRef(null);

    const RECORD_DURATION_SECONDS = 2.0; // length of each clip sent to backend

    // Camera helpers
    const startCamera = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("Camera API not supported in this browser");
            }

            const constraints = {
                video: {
                    facingMode: "user",
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    frameRate: { ideal: 30 },
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play().catch(() => {});
                    setCameraReady(true);
                    setCameraError("");
                };

                videoRef.current.onerror = (e) => {
                    console.error("Video error:", e);
                    setCameraError("Camera error. Please try again.");
                };
            }
        } catch (err) {
            console.error("Camera access error:", err);
            let msg = "Camera access error. ";
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                msg += "Please allow camera permission in your browser settings.";
            } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                msg += "No camera found. Please connect a camera.";
            } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
                msg += "Camera is in use by another application.";
            } else {
                msg += err.message || "Unknown error.";
            }
            setCameraError(msg);
            setCameraReady(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((t) => t.stop());
            videoRef.current.srcObject = null;
        }
        setCameraReady(false);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopCamera();
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                mediaRecorderRef.current.stop();
            }
            if (recordTimerRef.current) {
                clearInterval(recordTimerRef.current);
            }
        };
    }, []);

    const startRecording = async () => {
        if (!cameraReady) {
            await startCamera();
        }

        const stream = videoRef.current?.srcObject;
        if (!stream) {
            setCameraError("Camera not ready. Please try again.");
            return;
        }

        recordedChunksRef.current = [];
        setRecordSeconds(0);

        try {
            const options = { mimeType: "video/webm;codecs=vp9" };
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                if (!recordedChunksRef.current.length) {
                    setIsProcessing(false);
                    setIsRecording(false);
                    return;
                }

                const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
                await sendClipToBackend(blob);
            };

            mediaRecorder.start(100); // gather data in chunks
            setIsRecording(true);
            setIsProcessing(false);
            setPrediction("Detecting...");
            setTamilPrediction("");
            setConfidence(0);

            // Progress timer & auto-stop after fixed duration
            const startTime = Date.now();
            recordTimerRef.current = setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000;
                setRecordSeconds(Math.min(elapsed, RECORD_DURATION_SECONDS));
                if (elapsed >= RECORD_DURATION_SECONDS) {
                    clearInterval(recordTimerRef.current);
                    recordTimerRef.current = null;
                    if (mediaRecorder.state !== "inactive") {
                        mediaRecorder.stop();
                    }
                    setIsProcessing(true);
                    setIsRecording(false);
                }
            }, 100);
        } catch (err) {
            console.error("Error starting MediaRecorder:", err);
            setCameraError("Your browser does not support video recording for this demo.");
        }
    };

    const stopRecording = () => {
        if (recordTimerRef.current) {
            clearInterval(recordTimerRef.current);
            recordTimerRef.current = null;
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
            setIsProcessing(true);
        }
        setIsRecording(false);
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
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
                const err = await response.json().catch(() => ({}));
                console.error("Server error:", err);
                setPrediction("Error in detection");
                setTamilPrediction("");
                setConfidence(0);
                setIsProcessing(false);
                return;
            }

            const data = await response.json();
            if (data.error) {
                console.error("Prediction error:", data.error);
                setPrediction(data.error || "Processing error");
                setTamilPrediction("");
                setConfidence(0);
            } else {
                setPrediction(data.action || "No sign detected");
                setTamilPrediction(data.tamil_action || "");
                setConfidence(data.confidence || 0);
            }
        } catch (err) {
            console.error("Network error:", err);
            setPrediction("Connection failed");
            setTamilPrediction("");
            setConfidence(0);
        } finally {
            setIsProcessing(false);
            setRecordSeconds(0);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-20">
            <div className="container mx-auto px-6">
                <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 bg-teal-500/10 border border-teal-500/30 rounded-full backdrop-blur-sm">
                    <Zap className="w-5 h-5 text-teal-400" />
                    <span className="text-sm font-semibold text-teal-300">Live Sign Detection</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">Real-Time Detection</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Camera Feed */}
                    <div className="relative">
                        <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border-b-8 border-yellow-400 aspect-video relative">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover transform scale-x-[-1]"
                            />

                            {cameraError && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white text-center px-4 rounded-3xl">
                                    <div className="mb-4">
                                        <Camera className="w-16 h-16 text-red-400 mx-auto mb-2" />
                                        <p className="text-red-200 font-semibold mb-2">{cameraError}</p>
                                    </div>
                                    <button
                                        onClick={startCamera}
                                        className="bg-teal-500 hover:bg-teal-400 text-slate-900 px-6 py-3 rounded-xl font-bold transition-all"
                                    >
                                        Enable Camera
                                    </button>
                                    <p className="text-xs text-slate-400 mt-4 max-w-md">
                                        Click the button above to allow camera access. Make sure to:
                                        <br />• Allow camera permission when prompted
                                        <br />• Check browser settings if permission was denied
                                        <br />• Ensure no other app is using the camera
                                    </p>
                                </div>
                            )}

                            {/* Overlay when not recording */}
                            {!isRecording && !isProcessing && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl">
                                    <button
                                        onClick={toggleRecording}
                                        className="bg-red-600 hover:bg-red-500 text-white rounded-full p-6 transition-all hover:scale-110 shadow-2xl"
                                    >
                                        <Camera className="w-12 h-12" />
                                    </button>
                                </div>
                            )}

                            {/* Recording indicator */}
                            {isRecording && (
                                <div className="absolute top-6 right-6 animate-pulse">
                                    <div className="w-5 h-5 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls & Output */}
                    <div className="flex flex-col gap-6">
                        {/* Controls */}
                        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-slate-300">Controls</h3>
                                <button
                                    onClick={toggleRecording}
                                    className="flex items-center gap-2 text-teal-400 hover:text-teal-300"
                                >
                                    {isRecording ? <StopCircle className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />}
                                    {isRecording ? 'Stop' : isProcessing ? 'Processing...' : 'Start'}
                                </button>
                            </div>

                            <button
                                onClick={toggleRecording}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                                    isRecording
                                        ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
                                        : isProcessing
                                            ? 'bg-slate-600 text-slate-300 cursor-wait'
                                            : 'bg-teal-500 text-slate-900 hover:bg-teal-400'
                                }`}
                                disabled={isProcessing}
                            >
                                {isRecording ? 'Stop Recording' : isProcessing ? 'Processing Clip...' : 'Start Recording'}
                            </button>

                            {/* Status */}
                            <div className="mt-4 text-sm text-slate-400 space-y-1">
                                {cameraError ? (
                                    <div className="text-red-400">
                                        <div>Camera: Not Available</div>
                                        <button
                                            onClick={startCamera}
                                            className="text-teal-400 hover:text-teal-300 underline mt-1"
                                        >
                                            Click to enable
                                        </button>
                                    </div>
                                ) : cameraReady ? (
                                    <div className="text-green-400">
                                        <div>Camera: Ready ✓</div>
                                        {isRecording ? (
                                            <div>Status: Recording clip...</div>
                                        ) : isProcessing ? (
                                            <div>Status: Processing...</div>
                                        ) : (
                                            <div>Status: Ready to record</div>
                                        )}
                                        {isRecording && (
                                            <div>Duration: {recordSeconds.toFixed(1)}s / {RECORD_DURATION_SECONDS}s</div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-yellow-400">
                                        <div>Camera: Initializing...</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Detection Output */}
                        <div className="bg-slate-800/70 backdrop-blur-lg p-10 rounded-2xl border border-slate-700 flex-1 flex flex-col justify-center items-center text-center">
                            <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">
                                Detected Sign
                            </p>

                            <div className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-3">
                                {prediction}
                            </div>

                            {tamilPrediction && (
                                <div className="text-4xl font-bold text-teal-300 mb-6 mt-2 font-tamil">
                                    {tamilPrediction}
                                </div>
                            )}

                            <div className="w-full max-w-md bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-teal-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${confidence * 100}%` }}
                                />
                            </div>

                            <p className="text-slate-300 text-lg mb-8">
                                Confidence: {(confidence * 100).toFixed(1)}%
                            </p>

                            <button className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
                                <Volume2 className="w-8 h-8 text-slate-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealTime;

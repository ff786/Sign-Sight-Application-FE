import React from "react";
import { Hand, Zap, Upload, Languages, Sparkles, Shield, BarChart3, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Hero Section */}
            <div className="relative container mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
                <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 bg-teal-500/10 border border-teal-500/30 rounded-full backdrop-blur-sm hover:bg-teal-500/20 transition-all">
                    <Sparkles className="w-5 h-5 text-teal-400" />
                    <span className="text-sm font-semibold text-teal-300">AI-Powered Sign Language Detection</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 leading-tight">
                    SignSight
                </h1>

                <p className="text-lg md:text-2xl text-slate-300 mb-4 max-w-3xl leading-relaxed">
                    Bridge communication gaps with <span className="text-teal-300 font-bold">real-time sign language recognition</span>. 
                    Convert hand gestures into <span className="text-cyan-300 font-bold">Tamil text</span> using advanced AI technology.
                </p>
                
                <p className="text-slate-400 mb-12 max-w-2xl text-base md:text-lg">
                    Making sign language accessible, inclusive, and understood by everyone.
                </p>

                <div className="flex gap-4 flex-wrap justify-center">
                    <Link
                        to="/real-time"
                        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-teal-500/50 hover:shadow-teal-400/70"
                    >
                        <Zap className="w-6 h-6" />
                        Start Live Detection
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </Link>

                    <Link
                        to="/upload"
                        className="group inline-flex items-center gap-3 bg-slate-800/80 hover:bg-slate-700 border-2 border-slate-600 hover:border-teal-400 text-white font-bold py-4 px-10 rounded-xl transition-all"
                    >
                        <Upload className="w-6 h-6" />
                        Upload Video
                    </Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative container mx-auto px-6 py-16 grid grid-cols-3 gap-6 md:grid-cols-3 md:gap-8 mb-20">
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 text-center hover:border-teal-500/50 transition-all">
                    <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">15+</div>
                    <p className="text-slate-300 font-medium">Signs Recognized</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 text-center hover:border-teal-500/50 transition-all">
                    <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">98%</div>
                    <p className="text-slate-300 font-medium">Accuracy Rate</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 text-center hover:border-teal-500/50 transition-all">
                    <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">Real-Time</div>
                    <p className="text-slate-300 font-medium">Processing</p>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative container mx-auto px-6 py-20">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
                    Powerful Features
                </h2>
                <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
                    Everything you need for accessible sign language communication
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur border border-teal-500/20 hover:border-teal-500/50 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-teal-500/20">
                        <div className="w-14 h-14 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/30 transition-all">
                            <Hand className="w-8 h-8 text-teal-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Live Detection</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Detect hand gestures in real-time through your webcam with instant feedback and confidence scoring.
                        </p>
                    </div>

                    <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/50 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-cyan-500/20">
                        <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-all">
                            <Upload className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Video Analysis</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Upload pre-recorded sign language videos for accurate analysis and recognition with detailed results.
                        </p>
                    </div>

                    <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur border border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-blue-500/20">
                        <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-all">
                            <Languages className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Tamil Translation</h3>
                        <p className="text-slate-400 leading-relaxed">
                            All recognized signs are instantly converted to clear and readable Tamil text for better accessibility.
                        </p>
                    </div>

                    <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur border border-teal-500/20 hover:border-teal-500/50 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-teal-500/20">
                        <div className="w-14 h-14 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/30 transition-all">
                            <Shield className="w-8 h-8 text-teal-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Privacy Focused</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Your video data is processed locally on your device. No recording or storage of your personal videos.
                        </p>
                    </div>

                    <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/50 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-cyan-500/20">
                        <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-all">
                            <BarChart3 className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">High Accuracy</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Built on advanced deep learning models trained on diverse sign language datasets for reliable results.
                        </p>
                    </div>

                    <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/50 backdrop-blur border border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-blue-500/20">
                        <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-all">
                            <Lightbulb className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Easy to Use</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Intuitive interface designed for everyone. No technical knowledge required to get started.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative container mx-auto px-6 py-20">
                <div className="bg-gradient-to-r from-teal-600/20 to-cyan-600/20 border border-teal-500/30 rounded-3xl p-12 md:p-16 text-center backdrop-blur">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Ready to Get Started?
                    </h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
                        Join the sign language revolution and experience the power of AI-driven accessibility.
                    </p>
                    <Link
                        to="/real-time"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold py-4 px-12 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-teal-500/50"
                    >
                        <Zap className="w-6 h-6" />
                        Start Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

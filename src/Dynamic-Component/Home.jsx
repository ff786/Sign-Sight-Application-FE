import React from "react";
import { ArrowRight, Video, Shield, Zap, CheckCircle2, Clock, Languages } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Sign Language Recognition
                            <span className="block text-blue-600 mt-2">Made Simple</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10">
                            Transform sign language into Tamil text with cutting-edge AI.
                            Real-time recognition with 98% accuracy.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/real-time"
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Zap className="w-5 h-5" />
                                Start Live Detection
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                to="/upload"
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-lg border-2 border-gray-200 transition-colors"
                            >
                                <Video className="w-5 h-5" />
                                Upload Video
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            {/*<section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                                <CheckCircle2 className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
                            <div className="text-gray-600">Accuracy Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                                <Clock className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 mb-2">Real-Time</div>
                            <div className="text-gray-600">Processing</div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                                <Languages className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
                            <div className="text-gray-600">Signs Recognized</div>
                        </div>
                    </div>
                </div>
            </section>*/}

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need for seamless sign language communication
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Detection</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Instant sign language recognition through your webcam with live feedback and confidence scoring.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Video className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Video Analysis</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Upload pre-recorded videos for detailed sign language analysis with comprehensive results.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Shield className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Tamil Translation</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Instant conversion of recognized signs to clear Tamil text for seamless communication.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Join thousands using SignSight to break communication barriers and make sign language accessible to everyone.
                    </p>
                    <Link
                        to="/real-time"
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-10 py-5 rounded-xl transition-colors shadow-xl"
                    >
                        Get Started Now
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;


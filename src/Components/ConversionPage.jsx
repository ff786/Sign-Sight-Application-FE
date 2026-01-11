import { useState } from 'react';
import AudioUpload from './AudioUpload';
import SignLanguageDisplay from './SignLanguageDisplay';


import nandriVideo from '../assets/nandri.mp4';
import urakkamVideo from '../assets/urakkam.mp4';
import logoSignSight from '../assets/logo-sign-sight.webp';

const ConversionPage = () => {
  const [signLanguageVideo, setSignLanguageVideo] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  // Mock API call - maps audio file names to corresponding sign language videos
  const mockConvertToSignLanguage = async (audioFile) => {
    setIsConverting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const fileName = audioFile.name.toLowerCase();
    let videoUrl = null;

    if (fileName.includes('nandri')) {
      videoUrl = nandriVideo;
    } else if (fileName.includes('urakkam')) {
      videoUrl = urakkamVideo;
    } else {
      videoUrl = Math.random() > 0.5 ? nandriVideo : urakkamVideo;
    }

    setSignLanguageVideo(videoUrl);
    setIsConverting(false);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 animate-gradient-slow">
        {/* Header */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b-2 border-yellow-200 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <img
                      src={logoSignSight}
                      alt="Sign Sight Logo"
                      className="h-25 w-25 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-extrabold text-yellow-900">
                    Sign Sight
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-100 to-yellow-200 px-6 py-3 rounded-full shadow-lg border-2 border-yellow-300">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse-slow shadow-lg shadow-yellow-400"></div>
                <span className="text-sm font-bold text-yellow-900">System Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Instructions */}
          <div className="mb-12 bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-100">
            <h2 className="text-2xl font-bold text-yellow-900 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-md border-2 border-yellow-200 transform hover:scale-105 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">📤</span>
                </div>
                <h3 className="text-lg font-bold text-yellow-900 mb-2">1. Upload Audio</h3>
                <p className="text-gray-700 text-sm font-medium">Drag & drop or select an audio/video file (MP3, WAV, MP4)</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-md border-2 border-yellow-200 transform hover:scale-105 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">⚙️</span>
                </div>
                <h3 className="text-lg font-bold text-yellow-900 mb-2">2. AI Processing</h3>
                <p className="text-gray-700 text-sm font-medium">Our system converts speech to sign language.</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-md border-2 border-yellow-200 transform hover:scale-105 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">🎬</span>
                </div>
                <h3 className="text-lg font-bold text-yellow-900 mb-2">3. View Results</h3>
                <p className="text-gray-700 text-sm font-medium">Watch the sign language video with playback controls</p>
              </div>
            </div>
          </div>

          {/* Upload and Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Audio Upload Section */}
            <div className="h-full">
              <AudioUpload onConvert={mockConvertToSignLanguage} isConverting={isConverting} />
            </div>

            {/* Sign Language Display Section */}
            <div className="h-full">
              <SignLanguageDisplay
                  videoUrl={signLanguageVideo}
                  isLoading={isConverting}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ConversionPage;

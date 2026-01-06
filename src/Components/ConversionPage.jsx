import { useState } from 'react';
import AudioUpload from './AudioUpload';
import SignLanguageDisplay from './SignLanguageDisplay';

const ConversionPage = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [signLanguageVideo, setSignLanguageVideo] = useState(null);

  // Mock API call - Replace this with your actual Flask backend API
  const mockConvertToSignLanguage = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, we'll just use the uploaded video if it's an mp4
        // In production, this would be the processed sign language video from your backend
        const mockVideoUrl = file.type.includes('video')
          ? URL.createObjectURL(file)
          : 'https://www.w3schools.com/html/mov_bbb.mp4'; // Fallback demo video

        resolve({ videoUrl: mockVideoUrl, success: true });
      }, 3000); // Simulate 3 second processing time
    });
  };

  const handleFileSelect = () => {
    // Reset the sign language video when a new file is selected
    setSignLanguageVideo(null);
  };

  const handleConvert = async (file) => {
    setIsConverting(true);

    try {
      // This is where you'll call your Flask backend API
      // Example:
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('http://your-backend-url/api/convert', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();

      // For now, using mock API
      const result = await mockConvertToSignLanguage(file);

      if (result.success) {
        setSignLanguageVideo(result.videoUrl);
      }
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert file. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 animate-gradient-slow">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b-4 border-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-70 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-3 rounded-2xl shadow-xl">
                  <span className="text-3xl">👋</span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text">
                  Sign Sight
                </h1>
                <p className="mt-1 text-sm font-semibold text-gray-600">Audio to Sign Language Conversion ✨</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
                System Ready
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          {/* Left Panel - Upload */}
          <div className="h-full">
            <AudioUpload
              onFileSelect={handleFileSelect}
              onConvert={handleConvert}
              isConverting={isConverting}
            />
          </div>

          {/* Right Panel - Display */}
          <div className="h-full">
            <SignLanguageDisplay
              videoUrl={signLanguageVideo}
              isLoading={isConverting}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-r from-white to-purple-50 rounded-2xl shadow-xl p-8 border-2 border-purple-200">
          <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-6">How to Use:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-black text-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  1
                </div>
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">📤 Upload File</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Drag and drop or click to upload your audio/video file (MP3, WAV, or MP4)
                </p>
              </div>
            </div>

            <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 text-white font-black text-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  2
                </div>
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">⚡ Convert</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Click the convert button and wait for the AI to process your file
                </p>
              </div>
            </div>

            <div className="flex items-start group hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-black text-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  3
                </div>
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">👀 View & Play</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Watch the sign language animation on the right panel with playback controls
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text">
            Sign Sight © 2026 - Making content accessible for everyone 💜
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ConversionPage;


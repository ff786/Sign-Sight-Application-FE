import { useState, useEffect } from 'react';
import AudioUpload from './AudioUpload.tsx';
import SignLanguageDisplay from './SignLanguageDisplay.tsx';
import { uploadAudio, uploadVideo, checkApiHealth, getVideoUrl } from '../../services/api';


const ConversionPage = () => {
  const [signLanguageVideo, setSignLanguageVideo] = useState<string | null>(null);
  const [signImages, setSignImages] = useState<Array<{ sign: string; image_url: string }>>([]);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [error, setError] = useState<string>('');

  // Check API health on component mount
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        await checkApiHealth();
        setApiStatus('online');
      } catch (error) {
        console.error('Backend health check failed:', error);
        setApiStatus('offline');
      }
    };

    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  // Real API call to convert audio to sign language
  const convertToSignLanguage = async (audioFile: File): Promise<void> => {
    setIsConverting(true);
    setError('');

    try {
      // Determine file type and use appropriate endpoint
      const fileExtension = audioFile.name.split('.').pop()?.toLowerCase();
      let response;

      if (fileExtension === 'mp4') {
        response = await uploadVideo(audioFile);
      } else {
        response = await uploadAudio(audioFile);
      }

      // Check if backend returned a video
      if (response.video_url || response.video_path) {
        const videoPath = response.video_url || response.video_path || '';
        const fullVideoUrl = getVideoUrl(videoPath);
        setSignLanguageVideo(fullVideoUrl);
        setSignImages([]); // Clear any previous sign images
      }
      // Check if backend returned individual sign images/GIFs
      else if (response.signs && response.signs.length > 0) {

        const signsWithFullUrls = response.signs.map((sign: any) => ({
          sign: sign.sign || sign.word,
          image_url: sign.image_url // Already full URL from Cloudinary
        }));

        setSignImages(signsWithFullUrls);
        setSignLanguageVideo(null);
      }
      // No valid response
      else {
        throw new Error(response.error || response.message || 'Conversion failed - no video or signs returned');
      }
    } catch (error) {
      console.error('Conversion error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(`Failed to convert: ${errorMessage}`);
      setSignLanguageVideo(null);
    } finally {
      setIsConverting(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 animate-gradient-slow">
        {/* Header */}
        {/*<div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b-2 border-yellow-200 shadow-xl">*/}
        {/*  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">*/}
        {/*    <div className="flex items-center justify-between">*/}
        {/*      <div className="flex items-center space-x-4">*/}
        {/*        <div>*/}
        {/*          <img*/}
        {/*              src={logoSignSight}*/}
        {/*              alt="Sign Sight Logo"*/}
        {/*              className="h-25 w-25 object-contain"*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*        <div>*/}
        {/*          <h1 className="text-4xl font-extrabold text-yellow-900">*/}
        {/*            Sign Sight*/}
        {/*          </h1>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className={`flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg border-2 ${*/}
        {/*        apiStatus === 'online' */}
        {/*          ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-300' */}
        {/*          : apiStatus === 'offline'*/}
        {/*          ? 'bg-gradient-to-r from-red-100 to-red-200 border-red-300'*/}
        {/*          : 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300'*/}
        {/*      }`}>*/}
        {/*        <div className={`w-3 h-3 rounded-full shadow-lg ${*/}
        {/*          apiStatus === 'online'*/}
        {/*            ? 'bg-green-500 animate-pulse-slow shadow-green-400'*/}
        {/*            : apiStatus === 'offline'*/}
        {/*            ? 'bg-red-500 shadow-red-400'*/}
        {/*            : 'bg-yellow-500 animate-pulse shadow-yellow-400'*/}
        {/*        }`}></div>*/}
        {/*        <span className={`text-sm font-bold ${*/}
        {/*          apiStatus === 'online'*/}
        {/*            ? 'text-green-900'*/}
        {/*            : apiStatus === 'offline'*/}
        {/*            ? 'text-red-900'*/}
        {/*            : 'text-yellow-900'*/}
        {/*        }`}>*/}
        {/*          {apiStatus === 'online' ? 'Backend Connected' : apiStatus === 'offline' ? 'Backend Offline' : 'Checking...'}*/}
        {/*        </span>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

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
              <AudioUpload onConvert={convertToSignLanguage} isConverting={isConverting} />
            </div>

            {/* Sign Language Display Section */}
            <div className="h-full">
              <SignLanguageDisplay
                  videoUrl={signLanguageVideo}
                  signImages={signImages}
                  isLoading={isConverting}
              />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-xl shadow-lg animate-shake">
              <h3 className="text-lg font-bold text-red-900 mb-2">⚠️ Conversion Error</h3>
              <p className="text-sm text-red-700 font-semibold">{error}</p>
              <button
                onClick={() => setError('')}
                className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default ConversionPage;


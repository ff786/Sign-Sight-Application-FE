import { useState, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

const SignLanguageDisplay = ({ videoUrl, isLoading }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-blue-100 transition-all duration-300 hover:shadow-blue-200">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Sign Language Output</h2>
        </div>
        <p className="text-gray-600 text-sm ml-14">View the converted sign language animation</p>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Video Display Area */}
        <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-2xl overflow-hidden flex-1 flex items-center justify-center shadow-2xl border-4 border-purple-300">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full animate-pulse">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-purple-500 border-r-pink-500 border-b-blue-500 mb-6"></div>
                <div className="absolute inset-0 animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-cyan-500 border-l-green-500" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
              </div>
              <p className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">Processing your file...</p>
              <p className="text-gray-300 text-sm mt-2 animate-bounce">This may take a few moments ✨</p>
            </div>
          ) : videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnd}
            />
          ) : (
            <div className="text-center p-8 animate-fadeIn">
              <div className="mb-6">
                <div className="mx-auto w-28 h-28 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
                  <svg
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text mb-3">No video yet</h3>
              <p className="text-gray-300 text-base">
                Upload and convert an audio/video file to see the sign language output
              </p>
            </div>
          )}
        </div>

        {/* Video Controls */}
        {videoUrl && !isLoading && (
          <div className="mt-4 space-y-4">
            {/* Progress Bar */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text w-14 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-3 rounded-lg appearance-none cursor-pointer slider transition-all duration-200"
                style={{
                  background: `linear-gradient(to right, 
                    #9333ea 0%, 
                    #ec4899 ${(currentTime / duration) * 50}%, 
                    #3b82f6 ${(currentTime / duration) * 100}%, 
                    #e5e7eb ${(currentTime / duration) * 100}%, 
                    #e5e7eb 100%)`
                }}
              />
              <span className="text-sm font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text w-14">
                {formatTime(duration)}
              </span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={handleRestart}
                className="p-4 bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95"
                title="Restart"
              >
                <RotateCcw className="h-5 w-5 text-white" />
              </button>

              <button
                onClick={handlePlayPause}
                className="p-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 rounded-full transition-all duration-300 shadow-2xl hover:shadow-purple-400 transform hover:scale-110 active:scale-95 animate-pulse-slow"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-7 w-7 text-white" fill="white" />
                ) : (
                  <Play className="h-7 w-7 text-white" fill="white" />
                )}
              </button>

              <button
                onClick={handleMuteToggle}
                className="p-4 bg-gradient-to-br from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-white" />
                ) : (
                  <Volume2 className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-5 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border-2 border-green-200 shadow-md">
          <h3 className="text-sm font-bold text-transparent bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text mb-3">About Sign Language Output:</h3>
          <ul className="text-sm text-gray-700 space-y-2 font-medium">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">👋</span> 3D animated sign language gestures
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">⏱️</span> Synchronized with original audio timing
            </li>
            <li className="flex items-center">
              <span className="text-purple-500 mr-2">🎮</span> Supports playback controls for review
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignLanguageDisplay;


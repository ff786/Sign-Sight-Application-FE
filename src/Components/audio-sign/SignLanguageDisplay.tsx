import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface SignLanguageDisplayProps {
  videoUrl: string | null;
  signImages?: Array<{ sign: string; image_url: string }>;
  isLoading: boolean;
}

const SignLanguageDisplay = ({ videoUrl, signImages = [], isLoading }: SignLanguageDisplayProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  // UI control for display size (small/medium/large)
  const [displaySize, setDisplaySize] = useState<'small' | 'medium' | 'large'>('medium');
  // Modal to preview selected sign image/GIF or video in fullscreen
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ url: string; type: 'image' | 'video' } | null>(null);

  // Debug: Track when props change
  useEffect(() => {
  }, [videoUrl, signImages, isLoading, displaySize]);

  // Load saved display size from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sign_display_size');
      if (saved === 'small' || saved === 'medium' || saved === 'large') {
        setDisplaySize(saved);
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  // Persist display size when it changes
  useEffect(() => {
    try {
      localStorage.setItem('sign_display_size', displaySize);
    } catch (e) {
      // ignore
    }
  }, [displaySize]);

  // Close modal on ESC
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  // Size configuration for the UI. These map a displaySize to Tailwind classes
  const sizeConfig = {
    small: {
      containerMinH: 'min-h-[220px]',
      videoMaxH: 'max-h-[280px]',
      imageH: 'h-28'
    },
    medium: {
      containerMinH: 'min-h-[360px]',
      videoMaxH: 'max-h-[520px]',
      imageH: 'h-48'
    },
    large: {
      containerMinH: 'min-h-[560px]',
      videoMaxH: 'max-h-[720px]',
      imageH: 'h-64'
    }
  } as const;

  const currentSize = sizeConfig[displaySize];

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number): string => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const openModal = (url: string, type: 'image' | 'video') => {
    setModalContent({ url, type });
    setModalOpen(true);
    // pause background video if open
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
      <div className="w-full h-full flex flex-col p-6 bg-white rounded-2xl shadow-xl border border-yellow-100 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-100">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-md">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
            <h2 className="text-2xl font-bold text-yellow-900">Sign Language Output</h2>
          </div>
          <p className="text-gray-600 text-sm ml-14">View the converted sign language animation</p>
          {/* Display size control - compact icon buttons */}
          <div className="mt-3 flex justify-end items-center space-x-2">
            <span className="text-xs text-yellow-800 font-semibold">Display:</span>
            <div className="inline-flex rounded-md bg-white/10 p-1">
              <button
                aria-pressed={displaySize === 'small'}
                title="Small"
                onClick={() => setDisplaySize('small')}
                className={`px-2 py-1 text-sm font-medium rounded ${displaySize === 'small' ? 'bg-white text-yellow-900' : 'text-white/90 hover:bg-white/10'}`}
              >
                S
              </button>
              <button
                aria-pressed={displaySize === 'medium'}
                title="Medium"
                onClick={() => setDisplaySize('medium')}
                className={`px-2 py-1 text-sm font-medium rounded ${displaySize === 'medium' ? 'bg-white text-yellow-900' : 'text-white/90 hover:bg-white/10'}`}
              >
                M
              </button>
              <button
                aria-pressed={displaySize === 'large'}
                title="Large"
                onClick={() => setDisplaySize('large')}
                className={`px-2 py-1 text-sm font-medium rounded ${displaySize === 'large' ? 'bg-white text-yellow-900' : 'text-white/90 hover:bg-white/10'}`}
              >
                L
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Video/Signs Display Area */}
          <div className={`relative bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-950 rounded-2xl overflow-hidden flex-1 flex items-center justify-center shadow-xl border-2 border-yellow-200 ${currentSize.containerMinH} p-4`}>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full animate-pulse">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-yellow-200 border-t-yellow-500 mb-6"></div>
                  </div>
                  <p className="text-xl font-bold text-white">Processing your file...</p>
                  <p className="text-yellow-200 text-sm mt-2 animate-bounce">This may take a few moments ✨</p>
                </div>
            ) : videoUrl ? (
                <video
                    ref={videoRef}
                    src={videoUrl as string}
                    // make the video responsive while increasing max height so it is clearly visible
                    className={`${currentSize.videoMaxH} w-auto max-w-full object-contain rounded-lg cursor-pointer`}
                    onClick={() => videoUrl && openModal(videoUrl, 'video')}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleVideoEnd}
                />
            ) : signImages && signImages.length > 0 ? (
                <div className="w-full h-full overflow-y-auto p-6">
                  <div className="mb-4 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {signImages.length} Sign{signImages.length > 1 ? 's' : ''} Detected
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                    {signImages.map((sign, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                      >
                        <div className="relative bg-yellow-50 rounded-lg p-2 mb-3">
                            <img
                              src={sign.image_url}
                              alt={sign.sign}
                              // allow GIFs and images to render clearly and be larger
                              className={`w-full ${currentSize.imageH} object-contain rounded-md cursor-pointer`}
                              loading="lazy"
                              onClick={() => openModal(sign.image_url, 'image')}
                            />
                        </div>
                        <p className="text-center text-sm font-bold text-yellow-900 truncate capitalize">
                          {sign.sign}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
            ) : (
                <div className="text-center p-8 animate-fadeIn">
                  <div className="mb-6">
                    <div className="mx-auto w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
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
                  <h3 className="text-2xl font-bold text-white mb-3">No content yet</h3>
                  <p className="text-yellow-200 text-base">
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
              <span className="text-sm font-bold text-yellow-700 w-14 text-right">
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
                    #eab308 0%,
                    #ca8a04 ${(currentTime / duration) * 100}%,
                    #e5e7eb ${(currentTime / duration) * 100}%,
                    #e5e7eb 100%)`
                      }}
                  />
                  <span className="text-sm font-bold text-yellow-700 w-14">
                {formatTime(duration)}
              </span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-center space-x-6">
                  <button
                      onClick={handleRestart}
                      className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-300 transform hover:scale-110 active:scale-95"
                      title="Restart"
                  >
                    <RotateCcw className="h-5 w-5 text-white" />
                  </button>

                  <button
                      onClick={handlePlayPause}
                      className="p-5 bg-gradient-to-br from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-yellow-400 transform hover:scale-110 active:scale-95"
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
                      className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-300 transform hover:scale-110 active:scale-95"
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
          <div className="mt-6 p-5 bg-yellow-50 rounded-xl border-2 border-yellow-200 shadow-sm">
            <h3 className="text-sm font-bold text-yellow-900 mb-3">About Sign Language Output:</h3>
            <ul className="text-sm text-gray-700 space-y-2 font-medium">
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">👋</span> 3D animated sign language gestures
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">⏱️</span> Synchronized with original audio timing
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">🎮</span> Supports playback controls for review
              </li>
            </ul>
          </div>
        </div>
          {/* Fullscreen preview modal */}
          {modalOpen && modalContent && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
              role="dialog"
              aria-modal="true"
              onClick={() => closeModal()}
            >
              <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => closeModal()}
                  aria-label="Close preview"
                  className="absolute top-2 right-2 z-50 p-2 rounded bg-white/90 text-gray-900 font-bold"
                >
                  ✕
                </button>
                {modalContent.type === 'image' ? (
                  <img src={modalContent.url} alt="Preview" className="w-full max-h-[90vh] object-contain rounded-lg shadow-lg mx-auto" />
                ) : (
                  <video src={modalContent.url} controls autoPlay className="w-full max-h-[90vh] object-contain rounded-lg shadow-lg mx-auto" />
                )}
              </div>
            </div>
          )}
      </div>
  );
};

export default SignLanguageDisplay;


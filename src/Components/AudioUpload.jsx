import { useState, useRef } from 'react';
import { Upload, File, X, Loader2 } from 'lucide-react';

const AudioUpload = ({ onFileSelect, onConvert, isConverting }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const acceptedFormats = '.mp3,.wav,.mp4';
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const validateFile = (file) => {
    setError('');

    if (!file) {
      setError('Please select a file');
      return false;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['mp3', 'wav', 'mp4'].includes(fileExtension)) {
      setError('Invalid file format. Please upload MP3, WAV, or MP4 files.');
      return false;
    }

    if (file.size > maxFileSize) {
      setError('File size exceeds 50MB limit.');
      return false;
    }

    return true;
  };

  const handleFileChange = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConvert = () => {
    if (selectedFile && onConvert) {
      onConvert(selectedFile);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl border border-purple-100 transition-all duration-300 hover:shadow-purple-200">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg">
            <Upload className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Upload Audio/Video</h2>
        </div>
        <p className="text-gray-600 text-sm ml-14">Upload your audio or video file to convert to sign language</p>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Upload Area */}
        <div
          className={`relative border-3 border-dashed rounded-2xl p-8 transition-all duration-300 flex-1 flex flex-col items-center justify-center transform ${
            dragActive
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 scale-105 shadow-xl'
              : 'border-purple-300 hover:border-purple-400 hover:shadow-lg'
          } ${selectedFile ? 'bg-gradient-to-br from-green-50 to-emerald-50' : 'bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <div className="text-center">
              <div className="mb-4 animate-bounce">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                  <Upload className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text hover:from-purple-700 hover:to-pink-700 font-bold text-lg transition-all duration-200"
                >
                  Click to upload
                </label>
                <span className="text-gray-600 font-medium"> or drag and drop</span>
              </div>
              <p className="text-sm text-gray-500 font-medium">MP3, WAV, or MP4 (MAX. 50MB)</p>
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                className="hidden"
                accept={acceptedFormats}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div className="w-full animate-fadeIn">
              <div className="bg-gradient-to-r from-white to-green-50 rounded-2xl p-5 border-2 border-green-300 shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-xl shadow-md">
                      <File className="h-7 w-7 text-white flex-shrink-0" />
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-green-600 mt-1 font-semibold">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="ml-4 p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 transform hover:scale-110"
                    disabled={isConverting}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  disabled={isConverting}
                >
                  Choose a different file
                </button>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept={acceptedFormats}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-xl shadow-md animate-shake">
            <p className="text-sm text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={!selectedFile || isConverting}
          className={`mt-6 w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 flex items-center justify-center shadow-lg transform ${
            !selectedFile || isConverting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 hover:scale-105 hover:shadow-2xl active:scale-95'
          }`}
        >
          {isConverting ? (
            <>
              <Loader2 className="animate-spin h-6 w-6 mr-3" />
              Converting...
            </>
          ) : (
            <>
              <span className="mr-2">✨</span>
              Convert to Sign Language
              <span className="ml-2">✨</span>
            </>
          )}
        </button>

        {/* File Info */}
        <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 shadow-md">
          <h3 className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-3">Supported Formats:</h3>
          <ul className="text-sm text-gray-700 space-y-2 font-medium">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">🎵</span> Audio: MP3, WAV
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🎬</span> Video: MP4
            </li>
            <li className="flex items-center">
              <span className="text-purple-500 mr-2">📦</span> Maximum file size: 50MB
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioUpload;


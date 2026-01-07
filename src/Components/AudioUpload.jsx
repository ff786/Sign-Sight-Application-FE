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
    <div className="w-full h-full flex flex-col p-6 bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-2xl border border-yellow-100 transition-all duration-300 hover:shadow-yellow-200">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
            <Upload className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
            Upload Audio/Video
          </h2>
        </div>
        <p className="text-gray-600 text-sm ml-14">Upload your audio or video file to convert to sign language</p>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Upload Area */}
        <div
          className={`relative border-3 border-dashed rounded-2xl p-8 transition-all duration-300 flex-1 flex flex-col items-center justify-center transform ${
            dragActive
              ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100 scale-105 shadow-xl'
              : 'border-yellow-300 hover:border-yellow-400 hover:shadow-lg'
          } ${selectedFile ? 'bg-gradient-to-br from-green-50 to-emerald-50' : 'bg-white hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <div className="text-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mb-4 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-full"
                type="button"
              >
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-200">
                  <Upload className="h-10 w-10 text-white" />
                </div>
              </button>
              <div className="mb-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-transparent bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text hover:from-yellow-700 hover:to-yellow-800 font-bold text-lg transition-all duration-200"
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
                  className="text-sm font-bold text-yellow-600 hover:text-yellow-700 transition-all duration-200"
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
              : 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-900 hover:scale-105 hover:shadow-2xl active:scale-95'
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
        <div className="mt-6 p-5 bg-yellow-50 rounded-xl border-2 border-yellow-200 shadow-sm">
          <h3 className="text-sm font-bold text-yellow-900 mb-3">Supported Formats:</h3>
          <ul className="text-sm text-gray-700 space-y-2 font-medium">
            <li className="flex items-center">
              <span className="text-yellow-500 mr-2">🎵</span> Audio: MP3, WAV
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 mr-2">🎬</span> Video: MP4
            </li>
            <li className="flex items-center">
              <span className="text-yellow-500 mr-2">📦</span> Maximum file size: 50MB
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioUpload;


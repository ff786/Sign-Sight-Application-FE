// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5080';

// API Response Types
export interface ConversionResponse {
  video_url?: string;
  video_path?: string;
  signs?: Array<{
    sign: string;
    word: string;
    image_url: string;
    found: boolean;
    confidence: number;
  }>;
  success?: boolean;
  text?: string;
  duration?: number;
  error?: string;
  message?: string;
}

export interface TextToSignsResponse {
  success: boolean;
  signs: Array<{ sign: string; image_url: string }>;
  error?: string;
}

export interface HealthCheckResponse {
  status: string;
  message?: string;
  endpoints?: Record<string, string>;
}

/**
 * Upload audio file and convert to sign language
 * @param file - The audio file to convert
 * @returns Promise with the conversion response
 */
export const uploadAudio = async (file: File): Promise<ConversionResponse> => {
  try {
    const formData = new FormData();
    formData.append('audio', file);

    const response = await fetch(`${API_BASE_URL}/api/audio-to-sign/upload-audio`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

/**
 * Upload video file and convert to sign language
 * @param file - The video file to convert
 * @returns Promise with the conversion response
 */
export const uploadVideo = async (file: File): Promise<ConversionResponse> => {
  try {
    const formData = new FormData();
    formData.append('video', file);

    const response = await fetch(`${API_BASE_URL}/api/audio-to-sign/upload-video`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

/**
 * Convert text to sign language images
 * @param text - The text to convert to signs
 * @returns Promise with array of sign images
 */
export const textToSigns = async (text: string): Promise<TextToSignsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/audio-to-sign/text-to-signs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error converting text to signs:', error);
    throw error;
  }
};

/**
 * Get sign image by name
 * @param signName - The name of the sign
 * @returns Promise with the image URL
 */
export const getSignImage = async (signName: string): Promise<string> => {
  return `${API_BASE_URL}/api/audio-to-sign/get-sign-image/${signName}`;
};

/**
 * Check if the backend API is healthy and responding
 * @returns Promise with health check status
 */
export const checkApiHealth = async (): Promise<HealthCheckResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Health check failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
};

/**
 * Get the full URL for a video resource
 * @param videoPath - The relative path or filename of the video
 * @returns Full URL to the video
 */
export const getVideoUrl = (videoPath: string): string => {
  // If it's already a full URL, return as is
  if (videoPath.startsWith('http://') || videoPath.startsWith('https://')) {
    return videoPath;
  }

  // If it's a relative path, construct full URL
  return `${API_BASE_URL}${videoPath.startsWith('/') ? '' : '/'}${videoPath}`;
};



const DEFAULT_BACKEND = "http://localhost:5000";

/** Shared Flask origin (quiz, emotion uploads, etc.) — override with VITE_BACKEND_BASE_URI */
export const BACKEND_BASE_URI =
  import.meta.env.VITE_BACKEND_BASE_URI?.trim() || DEFAULT_BACKEND;

/**
 * Sign-language ML API (`jeranapp.py`): /predict_video, /webcam_predict, /predict, /health.
 * Override when the inference service runs on a different host or port than BACKEND_BASE_URI.
 */
export const SIGN_SIGHT_ML_BASE_URI =
  import.meta.env.VITE_SIGN_SIGHT_ML_URL?.trim() || BACKEND_BASE_URI;

export const MENTOR_BASE_URI =
  import.meta.env.VITE_MENTOR_BASE_URI?.trim() || "http://localhost:5080";

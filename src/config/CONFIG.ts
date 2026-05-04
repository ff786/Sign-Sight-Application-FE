const DEFAULT_BACKEND = "http://localhost:5000";

/** Shared Flask origin (quiz, emotion uploads, etc.) — override with VITE_BACKEND_BASE_URI */
export const BACKEND_BASE_URI =
  import.meta.env.VITE_BACKEND_BASE_URI?.trim() || DEFAULT_BACKEND;

/**
 * Sign-language ML API (`jeranapp.py`): /predict_video, /webcam_predict, /predict, /health,
 * /variant_status. Override when inference runs elsewhere.
 */
export const SIGN_SIGHT_ML_BASE_URI =
  import.meta.env.VITE_SIGN_SIGHT_ML_URL?.trim() || BACKEND_BASE_URI;

export const MENTOR_BASE_URI =
  import.meta.env.VITE_MENTOR_BASE_URI?.trim() || "http://localhost:5080";

/** Inference variants — keys must match `jeranapp.py` `model_variant` (form/JSON). */
export const SIGN_LANGUAGE_MODEL_OPTIONS = [
  { value: "bilstm", label: "biLSTM" },
  { value: "cnn_lstm", label: "CNN-LSTM" },
  { value: "gru", label: "GRU" },
  { value: "tcn", label: "TCN" },
] as const;

export type SignLanguageModelValue =
  (typeof SIGN_LANGUAGE_MODEL_OPTIONS)[number]["value"];

/** Row shape for objects in `/health` response `variants` array */
export interface SignsightMlHealthVariantRow {
  variant: string;
  label: string;
  artifact_paths_ok: boolean;
  model_file?: string | null;
  scaler_file?: string | null;
  pca_file?: string | null;
  directory?: string;
  hints?: string[];
}

export async function fetchSignsightMlHealthVariants(
  mlBaseUri: string
): Promise<SignsightMlHealthVariantRow[]> {
  const root = mlBaseUri.replace(/\/+$/, "");
  const res = await fetch(`${root}/health`);
  if (!res.ok) throw new Error(`health HTTP ${res.status}`);
  const j = (await res.json()) as { variants?: SignsightMlHealthVariantRow[] };
  return Array.isArray(j.variants) ? j.variants : [];
}

/** Optional: confirms TensorFlow can deserialize weights (warm-cache). */
export async function prefetchSignsightVariantStatus(
  mlBaseUri: string,
  modelVariant: string
): Promise<void> {
  const root = mlBaseUri.replace(/\/+$/, "");
  await fetch(`${root}/variant_status?model_variant=${encodeURIComponent(modelVariant)}`);
}

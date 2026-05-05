import { useEffect, useRef, useState } from "react";
import { addAnswerForQuestion, useAppDispatch } from "../../../store";
import YoutubePlayer from "./YoutubePlayer";

export default function Category4_SignToSign({
  question,
  level,
  category,
  onNext,
  onVideoRecorded,
}: any) {
  const dispatch = useAppDispatch();
  const liveVideoRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  /* ================= CAMERA ================= */

  async function openCamera() {
    const s = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    setStream(s);
    if (liveVideoRef.current) {
      liveVideoRef.current.srcObject = s;
    }
  }

  function stopCamera() {
    stream?.getTracks().forEach((t) => t.stop());
    if (liveVideoRef.current) liveVideoRef.current.srcObject = null;
    setStream(null);
  }

  /* ================= RECORDING ================= */

  function startCountdown() {
    let count = 5;
    setCountdown(count);

    countdownRef.current = window.setInterval(() => {
      count--;
      setCountdown(count);

      if (count === 0) {
        clearInterval(countdownRef.current!);
        setCountdown(null);
        startRecording();
      }
    }, 1000);
  }

  function startRecording() {
    if (!stream) return;

    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const file = new File([blob], `${question.id}.webm`, {
        type: "video/webm",
      });

      setRecordedUrl(URL.createObjectURL(blob));
      dispatch(
        addAnswerForQuestion({
          question_id: question.id,
          correct_answer: question.expected_output ?? question.correct_answer ?? "",
          area: question.area,
          user_answer: file.name,
          level,
          category,
        }),
      );

      // 🔥 SEND FILE UP TO QuizEngine
      onVideoRecorded(file);

      stopCamera();
    };

    recorder.start();
    setRecording(true);
    setTimeLeft(30);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopRecording();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    recorderRef.current?.stop();
    setRecording(false);
  }

  async function retake() {
    setRecordedUrl(null);
    setTimeLeft(30);
    await openCamera();
  }

  /* ================= CLEANUP ================= */

  useEffect(() => {
    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  /* ================= UI ================= */

  // Check if video is a YouTube URL or local file
  const isYouTube = question.question_video?.includes('youtube.com') || question.question_video?.includes('youtu.be');

  return (
    <div className="min-h-[100dvh] bg-yellow-50 px-6 py-8">
      <h2 className="text-center text-lg font-bold text-gray-800 mb-6">
        {question.instruction}
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="bg-white rounded-3xl shadow-lg p-5 border border-yellow-100">
          {isYouTube ? (
            <YoutubePlayer url={question.question_video} />
          ) : (
            <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black">
              <video
                src={question.question_video}
                controls
                className="w-full h-full object-contain"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white/80 rounded-3xl shadow-xl p-6 flex flex-col items-center">
          {!recordedUrl ? (
            <>
              <video
                ref={liveVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full aspect-video rounded-2xl bg-black mirror"
              />

              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-7xl font-bold">
                  {countdown}
                </div>
              )}

              {recording && (
                <div className="mt-2 text-red-600 font-bold">
                  🔴 {timeLeft}s
                </div>
              )}

              <div className="mt-6 flex gap-4">
                {!stream && (
                  <button
                    onClick={openCamera}
                    className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold"
                  >
                    📷 Open Camera
                  </button>
                )}

                {stream && !recording && countdown === null && (
                  <button
                    onClick={startCountdown}
                    className="px-8 py-3 bg-red-500 text-white rounded-full font-bold"
                  >
                    🎥 Start Recording
                  </button>
                )}

                {recording && (
                  <button
                    onClick={stopRecording}
                    className="px-8 py-3 bg-gray-700 text-white rounded-full font-bold"
                  >
                    ⛔ Stop
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <video
                src={recordedUrl}
                controls
                className="w-full aspect-video rounded-2xl"
              />

              <div className="mt-6 flex gap-4">
                <button
                  onClick={retake}
                  className="px-6 py-3 bg-gray-200 rounded-full font-semibold"
                >
                  🔁 Retake
                </button>

                <button
                  onClick={onNext}
                  className="px-8 py-3 bg-green-500 text-white rounded-full font-bold"
                >
                  ✅ Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import YoutubePlayer from './YoutubePlayer.tsx';
import { addAnswerForQuestion, useAppDispatch } from "../../../store";

export default function Category3_VideoToText({
  question,
  level,
  category,
  onNext,
}: any) {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [question.id]);

  function handleSelect(opt: any) {
    setSelected(opt.id);

    dispatch(
      addAnswerForQuestion({
        level,
        category,
        question_id: question.id,
        correct_answer: question.correct_answer, // ✅ FIX
        user_answer: opt.id,
        area: question.area,
      }),
    );
  }

  // Check if video is a YouTube URL or local file
  const isYouTube = question.question_video?.includes('youtube.com') || question.question_video?.includes('youtu.be');

  return (
    <div className="h-[100dvh] flex flex-col bg-yellow-50">
      <div className="flex-1 flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* VIDEO */}
            <div className="bg-white rounded-3xl shadow-lg p-4 border border-yellow-100">
            <p className="text-center text-sm text-gray-600 mb-3">
              Watch the sign and choose the correct answer
            </p>
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

          {/* OPTIONS */}
          <div className="flex flex-col justify-center space-y-4">
            {question.options.map((opt: any) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className={`
                  w-full px-6 py-4 rounded-full text-base font-semibold text-left
                  transition-all
                  ${selected === opt.id
                    ? "bg-yellow-700 text-white shadow-lg scale-[1.02]"
                    : "bg-white hover:bg-yellow-50"
                  }
                `}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NEXT */}
      <div className="bg-white border-t border-yellow-100 py-4 flex justify-center">
        <button
          disabled={!selected}
          onClick={onNext}
          className={`px-20 py-4 rounded-full text-base font-bold
            ${selected
              ? "bg-yellow-700 text-white hover:bg-yellow-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

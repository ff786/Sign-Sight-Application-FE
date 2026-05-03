import { useEffect, useState } from "react";
import { toYoutubeEmbed } from "../../../utils/kaveesha/youtube";
import { addAnswerForQuestion, useAppDispatch } from "../../../store";

export default function Category2_TextToVideo({
  question,
  level,
  category,
  onNext,
}: any) {
  const dispatch = useAppDispatch();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveIndex(0);
    setSelectedIndex(null);
  }, [question.id]);

  const activeOption = question.options[activeIndex];

  function handleSelect() {
    setSelectedIndex(activeIndex);
    dispatch(
      addAnswerForQuestion({
        level,
        category,
        question_id: question.id,
        correct_answer: question.correct_answer,
        user_answer: activeOption.id,
        area: question.area,
      }),
    );
  }

  return (
    <div className="h-[100dvh] bg-yellow-50 flex flex-col">
      {/* QUESTION */}
      <div className="pt-6 pb-3 text-center">
        <h2 className="text-xl font-bold text-yellow-800">
          {question.question}
        </h2>

        {/* PROGRESS DOTS */}
        <div className="flex justify-center gap-2 mt-3">
          {question.options.map((_: any, i: number) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition
                ${i === activeIndex ? "bg-yellow-700 scale-110" : "bg-yellow-200"}`}
            />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-6 flex items-center justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6">
          {/* MAIN VIDEO */}
            <div className="bg-white rounded-[2rem] shadow-lg p-2 flex flex-col ring-4 ring-yellow-200 max-h-[80vh]">
            <iframe
              src={toYoutubeEmbed(activeOption.video)}
              className="w-full aspect-video rounded-2xl max-h-[60vh]"
              allowFullScreen
            />

            <button
              onClick={handleSelect}
              className={`
                mt-4 py-2 px-6 rounded-full text-base font-bold
                transition-all duration-300 w-[800px] max-w-full text-center ml-[2.8rem]
                ${selectedIndex === activeIndex
                  ? "bg-yellow-700 text-white scale-105"
                  : "bg-yellow-600 text-white hover:bg-yellow-700 hover:scale-105"
                }
              `}
            >
              {selectedIndex === activeIndex
                ? "Selected ✓"
                : "Select this answer"}
            </button>
          </div>

          {/* RIGHT VIDEO RAIL */}
          <div className="hidden lg:flex flex-col gap-3 bg-white rounded-[2rem] shadow-lg p-3 border border-yellow-100">
            {question.options.map((opt: any, i: number) => (
              <button
                key={opt.id}
                onClick={() => setActiveIndex(i)}
                className={`
                  relative rounded-xl overflow-hidden aspect-video
                  transition-all duration-300
                  ${i === activeIndex
                    ? "ring-4 ring-yellow-600 scale-105"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                  }
                `}
              >
                <iframe
                  src={toYoutubeEmbed(opt.video)}
                  className="w-full h-full pointer-events-none"
                />

                {selectedIndex === i && (
                  <div className="absolute inset-0 bg-yellow-700/40 flex items-center justify-center text-white text-3xl font-extrabold">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NEXT BUTTON */}
      <div className="pb-6 flex justify-center">
        <button
          disabled={selectedIndex === null}
          onClick={onNext}
          className="
            px-24 py-4 rounded-full text-base font-bold
            bg-yellow-700
            text-white shadow-xl
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:scale-105 transition-all
            ml-[-15rem]
          "
        >
          Next →
        </button>
      </div>
    </div>
  );
}

import PrimaryButton from "../../Components/hasadara/PrimaryButton";
import EmotionTile from "../../Components/hasadara/EmotionTile";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Instructions() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="h-dvh overflow-hidden bg-yellow-50">
     

      <section className="relative max-w-5xl mx-auto px-4 py-12">
        {/* soft floating glows */}
        <div className="absolute top-10 left-10 w-28 h-28 bg-yellow-200 rounded-full opacity-50" />
        <div className="absolute bottom-24 right-16 w-36 h-32 bg-amber-200 rounded-full opacity-50" />

        <div className="relative bg-white rounded-[2.5rem] shadow-lg p-6 sm:p-15 border border-yellow-100">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">
            <span className="text-yellow-800">Important</span>{" "}
            <span className="text-stone-800">Instructions</span>
          </h2>

          <p className="text-center text-gray-700 mb-6">
            Please help your child follow these steps before starting 💛
          </p>

          {/* instruction cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-100 rounded-2xl p-4 text-center shadow-sm border border-yellow-200">
              👦 Sit in front of the camera
            </div>
            <div className="bg-amber-100 rounded-2xl p-4 text-center shadow-sm border border-amber-200">
              🚫 Don’t close or switch windows
            </div>
            <div className="bg-stone-100 rounded-2xl p-4 text-center shadow-sm border border-stone-200">
              🎬 Watch all videos fully
            </div>
          </div>

          {/* emotion preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <EmotionTile
              emoji="😊"
              label="Happy"
              tone="bg-yellow-200"
            />
            <EmotionTile
              emoji="😢"
              label="Sad"
              tone="bg-blue-200"
            />
            <EmotionTile
              emoji="😠"
              label="Angry"
              tone="bg-red-200"
            />
          </div>

          {/* email input */}
          <div className="max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="guardian@email.com"
              className="
                w-full
                p-4
                rounded-full
                border-2 border-orange-300
                focus:outline-none
                focus:ring-4 focus:ring-orange-200
                text-center
              "
            />

            <div className="mt-6 flex justify-center">
              <PrimaryButton
                disabled={!email.includes("@")}
                onClick={() => nav("/emotion", { state: { email } })}
              >
                Start Emotion Check 🚀
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import PrimaryButton from "../../Components/hasadara/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-yellow-50 overflow-hidden">
    

      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-28">
        {/* floating decorations */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-50" />
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-amber-200 rounded-full opacity-50" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
              <span className="text-yellow-800">Unlocking Emotions</span>
              <br />
              <span className="text-stone-700">for Deaf Children</span>
            </h1>

            <p className="mt-6 text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
              🎨 Fun cartoons + 🤖 AI help parents understand children emotions
              through gentle, safe interaction.
            </p>

            <div className="mt-10 flex justify-center lg:justify-start">
              <PrimaryButton onClick={() => nav("/instructions")}>
                Find emotions 🌈
              </PrimaryButton>
            </div>
          </div>

          {/* image */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-4 bg-yellow-200 rounded-full opacity-40" />

            <div className="relative bg-white p-6 rounded-[2.5rem] shadow-lg border border-yellow-100">
              <img
                src="/deaf_child.jpeg"
                alt="Happy child using tablet"
                className="w-full max-w-md rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-24 fill-yellow-200"
          preserveAspectRatio="none"
        >
          <path d="M0,64L60,74.7C120,85,240,107,360,112C480,117,600,107,720,90.7C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>
    </div>
  );
}

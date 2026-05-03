
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GlassPage from "../../Components/ui/GlassPage";
import PrimaryButton from "../../Components/kaveesha/PrimaryButton";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

type Level = "basic" | "intermediate" | "advanced";

export default function StudentLearningLanding() {
  const nav = useNavigate();
  const [level, setLevel] = useState<Level>("basic");
  const [studentName, setStudentName] = useState<string>("");

  useEffect(() => {
    // Check if student is logged in
    const name = localStorage.getItem("studentFullName");
    const username = localStorage.getItem("studentName");

    if (!name || !username) {
      // Redirect to login if not authenticated
      nav("/student/login");
      return;
    }

    setStudentName(name);
  }, [nav]);

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.removeItem("studentName");
      localStorage.removeItem("studentUserId");
      localStorage.removeItem("studentFullName");
      localStorage.removeItem("studentEmail");
      nav("/student/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <GlassPage>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] shadow-glass p-10">
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-extrabold">
                <span className="text-orange-600">Welcome,</span>{" "}
                <span className="text-pink-500">{studentName}!</span>
              </h2>
              <p className="text-gray-600 mt-2">Choose your learning level 💛</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            >
              Logout 👋
            </button>
          </div>

          <div className="h-px bg-yellow-200 mb-8" />
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { id: "basic", emoji: "🌱", color: "orange" },
              { id: "intermediate", emoji: "🚀", color: "blue" },
              { id: "advanced", emoji: "🏆", color: "pink" },
            ].map((l: any) => (
              <div
                key={l.id}
                onClick={() => setLevel(l.id)}
                className={`
                  cursor-pointer p-6 rounded-3xl text-center transition-all
                  bg-white/70 backdrop-blur shadow-lg
                  hover:scale-105
                  ${level === l.id ? `ring-4 ring-yellow-600` : ""}
                `}
              >
                <div className="text-4xl mb-3">{l.emoji}</div>
                <h3 className="font-bold text-xl capitalize">{l.id}</h3>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-5 flex-wrap">
            <PrimaryButton onClick={() => nav(`/learn/${level}`)}>
              Start Learning ✨
            </PrimaryButton>

            <button
              onClick={() => nav("/lessons")}
              className="px-14 py-4 rounded-full text-lg font-bold
             bg-white text-orange-600 border-2 border-orange-400
             hover:bg-orange-50 transition"
            >
              Lessons 📘
            </button>
            <button
              onClick={() => nav("/student/attempts")}
              className="px-14 py-4 rounded-full text-lg font-bold
             bg-yellow-700 text-white border-2 border-yellow-800
             hover:bg-yellow-800 transition"
            >
              My Results 📊
            </button>
          </div>
        </div>
      </section>
    </GlassPage>
  );
}

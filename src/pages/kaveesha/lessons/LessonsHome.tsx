import { useState, type ElementType } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpenCheck,
  ChevronRight,
  Clock3,
  Flame,
  Hash,
  Hand,
  Heart,
  Palette,
  PanelTop,
  Play,
  Sparkles,
  Star,
  Trophy,
  UsersRound,
  Utensils,
} from "lucide-react";
import LessonBackground from "../../../Components/ui/LessonBackground";
import CategoryIntroModal from "../../../Components/kaveesha/lessons/CategoryIntroModal";

type Category = "colors" | "food" | "numbers";

type LessonCategory = {
  id: string;
  title: string;
  subtitle: string;
  lessons: string;
  difficulty: string;
  accent: string;
  icon: ElementType;
  preview: string[];
  onClick: () => void;
};

export default function LessonsHome() {
  const nav = useNavigate();
  const [open, setOpen] = useState<Category | null>(null);

  const COLORS = [
    { label: "Black", value: "black", color: "#000000" },
    { label: "Blue", value: "blue", color: "#2563EB" },
    { label: "Brown", value: "brown", color: "#92400E" },
    { label: "Green", value: "green", color: "#16A34A" },
    { label: "Grey", value: "grey", color: "#6B7280" },
    {
      label: "Light & Dark Green",
      value: "Light & Dark Green",
      color: "#6B8078",
    },
    { label: "Orange", value: "orange", color: "#F97316" },
    { label: "Pink", value: "pink", color: "#EC4899" },
    { label: "Red", value: "red", color: "#DC2626" },
    { label: "White", value: "white", color: "#FFFFFF" },
    { label: "Yellow", value: "yellow", color: "#FACC15" },
  ];

  const FOOD = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Dinner", value: "dinner" },
  ];

  const NUMBERS = Array.from({ length: 10 }).map((_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const categories: LessonCategory[] = [
    {
      id: "colors",
      title: "Colors",
      subtitle: "Recognize daily color signs with visual swatches.",
      lessons: "11 signs",
      difficulty: "Starter",
      accent: "from-orange-500 to-amber-500",
      icon: Palette,
      preview: ["Red", "Blue", "Yellow"],
      onClick: () => setOpen("colors"),
    },
    {
      id: "food",
      title: "Food",
      subtitle: "Practice meal-time signs for real conversations.",
      lessons: "3 groups",
      difficulty: "Easy",
      accent: "from-emerald-600 to-teal-500",
      icon: Utensils,
      preview: ["Breakfast", "Lunch", "Dinner"],
      onClick: () => setOpen("food"),
    },
    {
      id: "numbers",
      title: "Numbers",
      subtitle: "Build number fluency from one to ten.",
      lessons: "10 signs",
      difficulty: "Starter",
      accent: "from-slate-700 to-slate-950",
      icon: Hash,
      preview: ["1", "2", "3"],
      onClick: () => setOpen("numbers"),
    },
    {
      id: "emotions",
      title: "Emotions",
      subtitle: "Learn expressive signs for feelings and reactions.",
      lessons: "Practice set",
      difficulty: "Medium",
      accent: "from-indigo-600 to-slate-800",
      icon: Heart,
      preview: ["Happy", "Sad", "Angry"],
      onClick: () => nav("/lessons/emotions/main"),
    },
    {
      id: "family",
      title: "Family",
      subtitle: "Sign people, family members, and relationships.",
      lessons: "Practice set",
      difficulty: "Medium",
      accent: "from-stone-700 to-orange-700",
      icon: UsersRound,
      preview: ["Mother", "Father", "Child"],
      onClick: () => nav("/lessons/family/main"),
    },
  ];

  return (
    <LessonBackground>
      <main className="min-h-screen bg-slate-950/5 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => nav("/student/landing")}
              className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Learning
            </button>

            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl">
              <Flame className="h-4 w-4 text-orange-600" />
              Guided lesson pathway
            </div>
          </div>

           <section className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-900 ring-1 ring-amber-200">
                <Sparkles className="h-4 w-4 text-orange-500" />
                SignSight interactive lessons
              </div>

              <div>
                <h1 className="max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Build sign fluency with focused visual lessons.
                </h1>
                <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-700 sm:text-lg">
                  Select a module, review the visual demonstration, and move
                  through each sign with a clean practice flow designed for
                  confident communication.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Metric icon={BookOpenCheck} label="5 categories" />
                <Metric icon={Clock3} label="Quick lessons" />
                <Metric icon={Trophy} label="Quiz ready" />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[3rem] bg-orange-500/10" />
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950 shadow-xl">
                <video
                  src="/lessons/Colors Intro.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="aspect-video w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-orange-300">
                      Featured module
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-white">
                      Colors Intro
                    </h2>
                  </div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-orange-600 shadow-lg">
                    <Play className="h-5 w-5 fill-orange-600" />
                  </span>
                </div>
              </div>

              <div className="relative mt-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-slate-500">
                    Recommended first
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-slate-950">
                    Colors
                  </h2>
                  <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-slate-600">
                    Start with visual signs that are easy to remember and useful
                    in daily descriptions.
                  </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-white shadow-lg">
                  <Hand className="h-8 w-8" />
                </div>
              </div>

              <div className="relative mt-8 grid grid-cols-3 gap-3">
                {COLORS.slice(6, 9).map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setOpen("colors")}
                    className="rounded-2xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
                  >
                    <span
                      className="mb-3 block h-10 rounded-xl border border-slate-100"
                      style={{ backgroundColor: color.color }}
                    />
                    <span className="text-sm font-black text-slate-800">
                      {color.label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setOpen("colors")}
                className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-base font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <Play className="h-5 w-5 fill-white" />
                Start recommended lesson
              </button>
            </div>
          </section>

          <section>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  Learning Modules
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  Choose a focused module and continue through its lesson path.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl">
                <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                Self-paced
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>

            <div className="mt-6 grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur-xl md:grid-cols-3">
              <FeaturePill
                icon={PanelTop}
                title="Preview first"
                text="Each topic opens with a focused intro before practice."
              />
              <FeaturePill
                icon={Hand}
                title="Learn by seeing"
                text="Videos and images stay large, clear, and easy to follow."
              />
              <FeaturePill
                icon={Sparkles}
                title="Choose your pace"
                text="Move through lessons one by one or jump to a topic."
              />
            </div>
          </section>
        </div>
      </main>

      {open === "colors" && (
        <CategoryIntroModal
          category="colors"
          title="Colors"
          introVideo="/lessons/Colors Intro.mp4"
          items={COLORS}
          onClose={() => setOpen(null)}
          onNext={(item) => nav(`/lessons/colors/${item.value}`)}
        />
      )}

      {open === "food" && (
        <CategoryIntroModal
          category="food"
          title="Food"
          introVideo="/lessons/Food Items Intro.mp4"
          items={FOOD}
          onClose={() => setOpen(null)}
          onNext={(item) => nav(`/lessons/food/${item.value}`)}
        />
      )}

      {open === "numbers" && (
        <CategoryIntroModal
          category="numbers"
          title="Numbers"
          introVideo=""
          items={NUMBERS}
          onClose={() => setOpen(null)}
          onNext={(item) => nav(`/lessons/numbers/${item.value}`)}
        />
      )}
    </LessonBackground>
  );
}

function Metric({
  icon: Icon,
  label,
}: {
  icon: ElementType;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm font-black text-slate-800 shadow-sm backdrop-blur-xl">
      <Icon className="h-4 w-4 text-orange-600" />
      {label}
    </div>
  );
}

function CategoryCard({ category }: { category: LessonCategory }) {
  const Icon = category.icon;

  return (
    <button
      onClick={category.onClick}
      className="group relative min-h-[285px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/70 focus:outline-none focus:ring-4 focus:ring-orange-200"
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${category.accent}`}
      />
      <div
        className={`mb-5 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
      >
        <Icon className="h-7 w-7" />
      </div>

      <div className="flex min-h-[138px] flex-col">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-black text-slate-950">
            {category.title}
          </h3>
          <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-orange-500" />
        </div>

        <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
          {category.subtitle}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-900">
            {category.lessons}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
            {category.difficulty}
          </span>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        {category.preview.map((item) => (
          <span
            key={item}
            className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition-colors group-hover:bg-slate-950 group-hover:text-white"
          >
            {item}
          </span>
        ))}
      </div>
    </button>
  );
}

function FeaturePill({
  icon: Icon,
  title,
  text,
}: {
  icon: ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-black text-slate-950">
          {title}
        </span>
        <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">
          {text}
        </span>
      </span>
    </div>
  );
}

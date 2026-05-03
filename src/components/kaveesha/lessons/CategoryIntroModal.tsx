import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Hash,
  Palette,
  Play,
  Utensils,
  X,
} from "lucide-react";

type Item = {
  label: string;
  value: string;
  color?: string;
};

type Props = {
  category: "colors" | "food" | "numbers";
  title: string;
  introVideo: string;
  items: Item[];
  onNext: (item: Item) => void;
  onClose: () => void;
};

const CATEGORY_STYLE = {
  colors: {
    icon: Palette,
    accent: "from-pink-500 to-orange-400",
    soft: "bg-pink-50 text-pink-700",
    hint: "Pick a color sign to practice after the intro.",
  },
  food: {
    icon: Utensils,
    accent: "from-orange-500 to-amber-400",
    soft: "bg-orange-50 text-orange-700",
    hint: "Choose a food group and learn the sign clearly.",
  },
  numbers: {
    icon: Hash,
    accent: "from-sky-500 to-blue-500",
    soft: "bg-sky-50 text-sky-700",
    hint: "Select a number and follow the sign image step by step.",
  },
};

export default function CategoryIntroModal({
  category,
  title,
  introVideo,
  items,
  onNext,
  onClose,
}: Props) {
  const [selected, setSelected] = useState<Item | null>(items[0] ?? null);
  const style = CATEGORY_STYLE[category];
  const Icon = style.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-md">
      <div className="grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-slate-950 p-5 text-white sm:p-6">
          {introVideo ? (
            <video
              src={introVideo}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white/10">
                  <Hash className="h-10 w-10 text-sky-300" />
                </div>
                <p className="mt-4 text-lg font-black">Number practice</p>
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/20" />

          <button
            onClick={onClose}
            className="relative ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
            aria-label="Close lesson picker"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative mt-auto max-w-xl">
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${style.accent} px-4 py-2 text-sm font-black`}
            >
              <Play className="h-4 w-4 fill-white" />
              Intro preview
            </div>
            <h2 className="text-3xl font-black sm:text-4xl">
              {title} Lessons
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
              Watch the intro, choose a lesson, then continue into focused
              practice.
            </p>
          </div>
        </section>

        <section className="flex max-h-[92vh] flex-col overflow-y-auto bg-gradient-to-br from-white to-amber-50/60 p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${style.accent} text-white shadow-lg`}
            >
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-orange-600">
                Choose your lesson
              </p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">
                Start with {selected?.label ?? title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {style.hint}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map((item) => {
              const active = selected?.value === item.value;

              return (
                <button
                  key={item.value}
                  onClick={() => setSelected(item)}
                  className={`group relative min-h-28 rounded-2xl border p-3 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                    active
                      ? "border-orange-300 bg-white ring-4 ring-orange-100"
                      : "border-slate-100 bg-white/75 hover:bg-white"
                  }`}
                >
                  {active && (
                    <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-orange-500" />
                  )}

                  {item.color ? (
                    <span
                      className="block h-12 w-12 rounded-2xl border border-slate-200 shadow-inner"
                      style={{ backgroundColor: item.color }}
                    />
                  ) : (
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black ${style.soft}`}
                    >
                      {item.label}
                    </span>
                  )}

                  <span className="mt-4 block text-sm font-black text-slate-900">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs font-bold text-slate-500">
                    Tap to select
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-sm font-black">Selected lesson</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xl font-black">
                {selected?.label ?? "Choose one"}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">
                {items.length} items
              </span>
            </div>
          </div>

          <div className="mt-auto flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:justify-between">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 font-black text-slate-700 transition hover:bg-slate-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              disabled={!selected}
              onClick={() => selected && onNext(selected)}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-black text-white shadow-xl transition-all ${
                selected
                  ? `bg-gradient-to-r ${style.accent} hover:-translate-y-0.5`
                  : "cursor-not-allowed bg-slate-300"
              }`}
            >
              Open lesson
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

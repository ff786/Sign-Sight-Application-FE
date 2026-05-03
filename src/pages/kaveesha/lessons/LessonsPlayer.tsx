import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Home,
  Image as ImageIcon,
  RotateCcw,
  Video,
} from "lucide-react";
import { LESSONS_CONFIG } from "../../../config/lessonsConfig";
import LessonBackground from "../../../Components/ui/LessonBackground";

function toTitle(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getDisplayTitle(category: string, item: string) {
  if (item === "main") {
    if (category === "emotions") return "Emotions";
    if (category === "family") return "Family Members";
  }

  return toTitle(item);
}

export default function LessonPlayer() {
  const { category, item } = useParams();
  const nav = useNavigate();

  if (!category || !item) return null;

  const config = LESSONS_CONFIG[category];

  if (!config) {
    return (
      <LessonBackground>
        <EmptyState message="Invalid lesson category" />
      </LessonBackground>
    );
  }

  const index = config.order.indexOf(item);

  if (index === -1) {
    return (
      <LessonBackground>
        <EmptyState message="Invalid lesson item" />
      </LessonBackground>
    );
  }

  const previousItem = config.order[index - 1];
  const nextItem = config.order[index + 1];
  const file = config.files[item];
  const src = `/lessons/${config.folder}/${file}`;
  const displayTitle = getDisplayTitle(category, item);
  const categoryTitle = toTitle(category);
  const progress = Math.round(((index + 1) / config.order.length) * 100);

  return (
    <LessonBackground>
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => nav("/lessons")}
              className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/75 px-5 py-3 text-sm font-black text-slate-800 shadow-lg shadow-orange-200/40 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All lessons
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Lesson {index + 1} of {config.order.length}
            </div>
          </div>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/70 shadow-2xl shadow-orange-200/40 backdrop-blur-xl">
              <div className="flex flex-wrap items-start justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-orange-600">
                    {categoryTitle} lesson
                  </p>
                  <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
                    {displayTitle}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
                    Watch carefully, practice the movement, then continue to the
                    next sign when you feel ready.
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 px-4 py-3 text-right">
                  <p className="text-xs font-black uppercase tracking-wide text-orange-600">
                    Progress
                  </p>
                  <p className="text-2xl font-black text-slate-950">
                    {progress}%
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6">
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="overflow-hidden rounded-[1.5rem] bg-slate-950 shadow-2xl">
                  {config.type === "video" ? (
                    <video
                      src={src}
                      controls
                      autoPlay
                      playsInline
                      className="aspect-video w-full bg-slate-950 object-contain"
                    />
                  ) : (
                    <div className="grid min-h-[420px] place-items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6">
                      <img
                        src={src}
                        alt={`${displayTitle} sign`}
                        className="max-h-[520px] max-w-full rounded-3xl bg-white p-4 shadow-2xl"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <button
                    onClick={() => nav("/lessons")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-700 shadow-md transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </button>

                  <button
                    onClick={() => nav(`/lessons/${category}/${item}`)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 font-black text-slate-700 transition hover:bg-slate-200"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Replay
                  </button>

                  {nextItem ? (
                    <button
                      onClick={() => nav(`/lessons/${category}/${nextItem}`)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-3 font-black text-white shadow-xl transition hover:-translate-y-0.5"
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => nav("/lessons")}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-emerald-600"
                    >
                      Complete
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/75 bg-white/70 p-5 shadow-xl shadow-orange-200/30 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-orange-600">
                    Lesson path
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">
                    {categoryTitle}
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  {config.type === "video" ? (
                    <Video className="h-5 w-5" />
                  ) : (
                    <ImageIcon className="h-5 w-5" />
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {config.order.map((lessonItem, lessonIndex) => {
                  const active = lessonItem === item;
                  const done = lessonIndex < index;

                  return (
                    <button
                      key={lessonItem}
                      onClick={() => nav(`/lessons/${category}/${lessonItem}`)}
                      className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all ${
                        active
                          ? "bg-slate-950 text-white shadow-lg"
                          : "bg-white/75 text-slate-700 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          active
                            ? "bg-white text-slate-950"
                            : done
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {done ? <CheckCircle2 className="h-4 w-4" /> : lessonIndex + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-black">
                          {getDisplayTitle(category, lessonItem)}
                        </span>
                        <span
                          className={`mt-0.5 block text-xs font-bold ${
                            active ? "text-white/60" : "text-slate-500"
                          }`}
                        >
                          {active ? "Now playing" : done ? "Viewed" : "Ready"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  disabled={!previousItem}
                  onClick={() =>
                    previousItem && nav(`/lessons/${category}/${previousItem}`)
                  }
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-black transition ${
                    previousItem
                      ? "bg-white text-slate-700 shadow-md hover:bg-slate-50"
                      : "cursor-not-allowed bg-slate-100 text-slate-400"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Prev
                </button>

                <button
                  disabled={!nextItem}
                  onClick={() => nextItem && nav(`/lessons/${category}/${nextItem}`)}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-black transition ${
                    nextItem
                      ? "bg-slate-950 text-white shadow-md hover:bg-slate-800"
                      : "cursor-not-allowed bg-slate-100 text-slate-400"
                  }`}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </LessonBackground>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="rounded-[2rem] bg-white/80 p-8 text-center shadow-2xl backdrop-blur-xl">
        <h1 className="text-2xl font-black text-slate-950">{message}</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Go back and choose an available lesson.
        </p>
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../../Components/kaveesha/Toast";
import { useToast } from "../../../hooks/useToast";

import Category1_MCQ from "../../../Components/kaveesha/quiz/Category1_MCQ";
import Category2_TextToVideo from "../../../Components/kaveesha/quiz/Category2_TextToVideo";
import Category3_VideoToText from "../../../Components/kaveesha/quiz/Category3_VideoToText";
import Category4_SignToSign from "../../../Components/kaveesha/quiz/Category4_SignToSign";
import GlassPage from "../../../Components/ui/GlassPage";
import { resetAnswers, useAppDispatch, useAppSelector } from "../../../store";
import { selectResultsByLevel } from "../../../store/selectors";
import { submitLevelResults } from "../../../services/submitLevelResults";
import advancedLevelQuestions from "../../../utils/kaveesha/advanced_level.json";
import basicLevelQuestions from "../../../utils/kaveesha/basic_level.json";
import intermediateLevelQuestions from "../../../utils/kaveesha/intermediate_level.json";

const QUESTIONS_PER_ATTEMPT = 10;

const levelCategoryOrder: Record<string, string[]> = {
  basic: ["category_1", "category_2"],
  intermediate: ["category_2", "category_3"],
  advanced: ["category_3", "category_4"],
};

const levelQuestionData: Record<string, any> = {
  basic: basicLevelQuestions,
  intermediate: intermediateLevelQuestions,
  advanced: advancedLevelQuestions,
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickRandomQuestions(data: any, level?: string) {
  const order = levelCategoryOrder[level ?? ""] ?? levelCategoryOrder.basic;
  const categories = data?.categories ?? {};
  const availableCategories = order.filter(
    (category) => Array.isArray(categories[category]) && categories[category].length > 0,
  );

  if (availableCategories.length === 0) return data;

  const category4Quota = availableCategories.includes("category_4") ? 1 : 0;
  const selectableCategories = availableCategories.filter((category) => category !== "category_4");
  const remainingQuota = QUESTIONS_PER_ATTEMPT - category4Quota;
  const baseQuota =
    selectableCategories.length > 0
      ? Math.floor(remainingQuota / selectableCategories.length)
      : 0;
  let extraQuota =
    selectableCategories.length > 0
      ? remainingQuota % selectableCategories.length
      : 0;

  const selectedCategories = { ...categories };
  const leftovers: Record<string, any[]> = {};

  for (const category of availableCategories) {
    const pool = shuffle(categories[category]);
    const quota =
      category === "category_4"
        ? category4Quota
        : baseQuota + (extraQuota-- > 0 ? 1 : 0);

    selectedCategories[category] = pool.slice(0, quota);
    leftovers[category] = pool.slice(quota);
  }

  let selectedCount = availableCategories.reduce(
    (count, category) => count + selectedCategories[category].length,
    0,
  );

  for (const category of availableCategories) {
    while (selectedCount < QUESTIONS_PER_ATTEMPT && leftovers[category]?.length) {
      selectedCategories[category].push(leftovers[category].shift());
      selectedCount++;
    }
  }

  return {
    ...data,
    categories: selectedCategories,
  };
}

function FullScreenLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: "5px solid white",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.9s linear infinite",
        }}
      />
      <p style={{ color: "white", marginTop: 12 }}>Submitting results…</p>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default function QuizEngine() {
  const questions = useAppSelector((state) => state.questions);
  console.log("questions", questions);

  const { level } = useParams();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [data, setData] = useState<any>(null);
  const [catIndex, setCatIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const results = useAppSelector(selectResultsByLevel(level as any));
  const dispatch = useAppDispatch();
  const [cat4File, setCat4File] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get authenticated student's username
  const studentName = localStorage.getItem("studentName");

  useEffect(() => {
    // Check if student is logged in
    if (!studentName) {
      showToast("Please login first 🔒", "info");
      setTimeout(() => navigate("/student/login"), 1500);
      return;
    }

    setCatIndex(0);
    setQIndex(0);

    const quizData = levelQuestionData[level ?? "basic"] ?? basicLevelQuestions;
    setData(pickRandomQuestions(quizData, level));
  }, [level, studentName, navigate]);

  if (!data)
    return (
      <GlassPage>
        <div className="p-20 text-center">Loading…</div>
      </GlassPage>
    );

  const order = levelCategoryOrder[level ?? ""] ?? levelCategoryOrder.basic;

  const category = order[catIndex];
  const question = data.categories[category][qIndex];

  const props = {
    question,
    level,
    category,
    onNext: next,
    onVideoRecorded: setCat4File,
    disabled: isLoading,
  };

  async function next() {
    if (isLoading) return;

    const isLastQuestion =
      qIndex + 1 === data.categories[order[catIndex]].length;

    const isLastCategory = catIndex + 1 === order.length;

    if (!isLastQuestion) {
      setQIndex(qIndex + 1);
      return;
    }

    if (!isLastCategory) {
      setCatIndex(catIndex + 1);
      setQIndex(0);
      return;
    }

    try {
      setIsLoading(true);

      // Verify student is still logged in
      if (!studentName) {
        setError("Please login first");
        navigate("/student/login");
        return;
      }

      //CRITICAL LINE — forces UI repaint
      await new Promise((r) => setTimeout(r, 2000));

      await submitLevelResults({
        user_id: studentName,
        level: level as string,
        quizzes: results,
        cat4File: cat4File as File,
      });

      dispatch(resetAnswers());
      navigate("/results");
    } catch (err) {
      console.error(err);
      setError("Failed to submit results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={hideToast} />}
      {isLoading && <FullScreenLoader />}

      <GlassPage>
        {
          {
            category_1: <Category1_MCQ {...props} />,
            category_2: <Category2_TextToVideo {...props} />,
            category_3: <Category3_VideoToText {...props} />,
            category_4: (
              <Category4_SignToSign {...props} onVideoRecorded={setCat4File} />
            ),
          }[order[catIndex]]
        }

        {error && (
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>
        )}
      </GlassPage>
    </>
  );
}

// /home/gary-home-station/Documents/Projects/GEOS/geos-project/frontend/src/pages/LevelCheckPage/editPage.tsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LevelCheckForm from "./LevelCheckForm";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { CjkEntry, EnglishEntry, StrengthAndWeakness } from "@/type/LevelCheckForm";

// ---------- helpers ----------
const emptySW = new StrengthAndWeakness();

const isEnglishLang = (lang: any) =>
  lang === undefined || lang === null || lang === "english";

const isCjkLang = (lang: any) =>
  lang === "chinese" || lang === "japanese" || lang === "korean";

const normalizeEnglish = (r: any): EnglishEntry => ({
  language: "english",
  id: r?.id ?? "",
  dateCreated: r?.dateCreated ?? "",
  student_name: r?.student_name ?? "",
  feedback: r?.feedback ?? "",
  bookRecommendation: r?.bookRecommendation ?? "",
  overallCEFR: r?.overallCEFR ?? "",
  speaking: r?.speaking ?? emptySW,
  confidence: r?.confidence ?? emptySW,
  grammar: r?.grammar ?? emptySW,
  vocabulary: r?.vocabulary ?? emptySW,
  listening: r?.listening ?? emptySW,
  pronunciation: r?.pronunciation ?? emptySW,
});

const normalizeCjk = (r: any): CjkEntry => ({
  language: r?.language ?? "chinese",
  id: r?.id ?? "",
  dateCreated: r?.dateCreated ?? "",
  student_name: r?.student_name ?? "",
  feedback: r?.feedback ?? "",
  bookRecommendation: r?.bookRecommendation ?? "",
  overallCEFR: r?.overallCEFR ?? "",
  // Order: pronunciation, vocabulary, listening, grammar, speaking, accuracy
  pronunciation: r?.pronunciation ?? emptySW,
  vocabulary: r?.vocabulary ?? emptySW,
  listening: r?.listening ?? emptySW,
  grammar: r?.grammar ?? emptySW,
  speaking: r?.speaking ?? emptySW,
  accuracy: r?.accuracy ?? emptySW,
});

// ---------- page ----------
const EditPage = () => {
  const { id } = useParams<{ id: string }>();

  const [inputData, setInputData] = useState<EnglishEntry | CjkEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      setLoading(true);
      setError(null);

      try {
        const raw = localStorage.getItem("GEOS_app");
        if (!raw) {
          console.warn("[EditPage] GEOS_app missing in localStorage");
          if (!cancelled) setInputData(null);
          return;
        }

        const data = JSON.parse(raw);
        const arr = Array.isArray(data?.levelCheck) ? data.levelCheck : null;

        if (!arr) {
          console.warn("[EditPage] levelCheck array missing");
          if (!cancelled) setInputData(null);
          return;
        }

        const targetId = (id ?? "").toString();
        const result = arr.find((x: any) => String(x?.id) === targetId);

        if (!result) {
          console.warn("[EditPage] No record found for id:", targetId);
          if (!cancelled) setInputData(null);
          return;
        }

        // Normalize to fully shaped object
        let normalized: EnglishEntry | CjkEntry;
        if (isEnglishLang(result.language)) {
          normalized = normalizeEnglish(result);
        } else if (isCjkLang(result.language)) {
          normalized = normalizeCjk(result);
        } else {
          console.warn("[EditPage] Unknown language, defaulting to english:", result.language);
          normalized = normalizeEnglish(result);
        }

        if (!cancelled) {
          setInputData(normalized);
          console.log("[EditPage] Loaded entry:", normalized);
        }
      } catch (e: any) {
        console.error("[EditPage] Load error:", e);
        if (!cancelled) setError(e?.message ?? "Unexpected error while loading data.");
        if (!cancelled) setInputData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // ---------- render guards ----------
  if (loading) {
    return <p className="text-center text-2xl">Loading ...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!inputData) {
    return <p className="text-center text-amber-600">No data found for this record.</p>;
  }

  // ---------- render ----------
  return (
    <div className="relative h-screen w-full bg-green-50 overflow-hidden min-[600px]:grid min-[600px]:grid-cols-[minmax(0,600px)_1fr]">
      <aside className="h-full w-full max-w-[600px] overflow-y-auto bg-white max-[600px]:block min-[600px]:border-r-2 min-[600px]:border-slate-300">
        <LevelCheckForm inputData={inputData} setInputData={setInputData} />
      </aside>

      <section className="relative hidden min-[600px]:block">
        <div className="sticky top-0 h-screen w-full overflow-auto p-4">
          <div className="print-component-landscape">
            <PlotLevelCheck data={inputData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditPage;

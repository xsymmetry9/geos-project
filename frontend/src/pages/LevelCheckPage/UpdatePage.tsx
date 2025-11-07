// /home/gary-home-station/Documents/Projects/GEOS/geos-project/frontend/src/pages/LevelCheckPage/editPage.tsx

import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LevelCheckForm from "@/pages/LevelCheckPage/LevelCheckForm";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { CjkEntry, EnglishEntry, StrengthAndWeakness } from "@/type/LevelCheckForm";
import { Menu, Eye, Save, X } from "lucide-react";
import SaveControl from "@/components/SaveControl";
import PrintControl from "@/components/PrintControl";

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
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
  const [view, setView] = useState<"form" | "view">("form");
  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<(() => void)>(null);

  const handleSave = () => {
    if (error !== null) return;
    if (inputData == undefined) return setError("Submit failed: inputData is undefined");

    const getUser = JSON.parse(localStorage.getItem("GEOS_app") || "{}");
    if (!getUser) return;
    console.log(getUser);

    const index = getUser.levelCheck.findIndex((item: any) => item.id === inputData.id);

    if (index !== -1) {
      getUser.levelCheck[index] = inputData;
    } else {
      getUser.levelCheck.push(inputData);
    }

    localStorage.setItem("GEOS_app", JSON.stringify(getUser));
    setIsMenuOpen(false);
    console.log("it's saved");
    navigate(`/levelCheck/preview/${inputData.id}`, { replace: true, state: { data: inputData } });
  }

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

  const toggleView = () => setView((v) => (v === "form" ? "view" : "form"));

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
    <div className="">
      <aside className="bg-white border-b sticky top-0 z-20">
        <div className="w-full max-w-[1100px] p-2 mx-auto flex justify-between items-center">
          <div className="flex flex-row items-center gap-2" id="nav-levelCheckForm">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
              className="mr-1 rounded-xl border px-3 py-1.5 text-sm shadow-sm md:hidden">
              <Menu />
            </button>
            <button className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-blue-600 px-3 py-1.5 text-slate-50" onClick={toggleView}>
              <Eye /><span>{view === "view" ? "View" : "Form"}</span>
            </button>
            <button className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50"
              onClick={handleSave}>
              <Save />
              <span>Save</span>
            </button>
            {view !== "form" && (
              <>
                <SaveControl
                  contentRef={componentRef}
                  className={"cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50"}
                  layout={"landscape"}
                  title={inputData.student_name} />
                <PrintControl
                  contentRef={componentRef}
                  className={"cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50"}
                  layout={"landscape"} />
              </>
            )}
          </div>
        </div>
      </aside>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)}>
            <div className="absolute top-0 right-0 h-full w-72 max-w-[85%] bg-white shadow-xl p-3 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-base font-semibold">Actions</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-md border px-2 py-1 text-sm">
                  <X size={16} />
                </button>
              </div>
              <button className="rounded-xl bg-dark-green px-3 py-2 text-white">
                {view === "form" ? "Switch to View" : "Back to form"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Content */}
      <div className="mx-auto w-full max-[1100px] px-4 py-6">
        {view === "form" ? (
          <section>
            <LevelCheckForm inputData={inputData} setInputData={setInputData} />
          </section>
        ) : (
          <section className="relative hidden min-[600px]:block">
            <div className="sticky top-0 h-screen w-full overflow-auto p-4">
              <div className="print-component-landscape" ref={componentRef}>
                <PlotLevelCheck data={inputData} />
              </div>
            </div>
          </section>
        )}


      </div>
    </div>
  );
};

export default EditPage;

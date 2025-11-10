import { useEffect, useState, useRef } from "react";
import { EnglishEntry, CjkEntry } from "@/type/LevelCheckForm";
import {
  isEnglishLang,
  isCjkLang,
  normalizeEnglish,
  normalizeCjk
} from "./shared";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { useParams, Link } from "react-router-dom";
import SaveControl from "@/components/SaveControl";
import PrintControl from "@/components/PrintControl";
import { Menu, Pencil } from "lucide-react";

const PreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<EnglishEntry | CjkEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      setLoading(true);
      setError(null);

      try {
        const raw = localStorage.getItem("GEOS_app");
        if (!raw) {
          console.warn("[PreviewPage] GEOS_app missing in localStorage");
          if (!cancelled) setData(null);
          return;
        }

        const getUserData = JSON.parse(raw);
        const arr = Array.isArray(getUserData?.levelCheck) ? getUserData.levelCheck : null;

        if (!arr) {
          console.log("[UpdatePage] levelCheck array missing");
          if (!cancelled) setData(null);
          return;
        }

        const targetId = (id ?? "").toString();
        const result = arr.find((x: any) => String(x?.id) === targetId);

        if (!result) {
          console.warn("[UpdatePage] No record found for id:", targetId);
          if (!cancelled) setData(null);
          return;
        }

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
          setData(normalized);
          console.log("[Update Page] Loaded entry:", normalized);
        }

      } catch (e: any) {
        console.error("[UpdatePage] Load error:", e);
        if (!cancelled) setError(e?.message ?? "Unexpected error while loading data.");
        if (!cancelled) setData(null);

      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>No data found for this record.</p>;

  }

  return (
    <div className="w-full bg-slate-50 grid grid-rows-[auto_1fr]">
      {/* top navigation bar */}
      <aside className="bg-white border-b sticky top-0 z-20">
        <div className="w-full max-w-[1100px] p-2 mx-auto flex justify-between items-center">
          <div
            className="flex flex-row items-center gap-2" id="nav-levelCheckForm">
            <button type="button" aria-label="Open menu" className="mr-1 rounded-xl border px-3 py-1.5 shadow-sm md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu />
            </button>
            <Link className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50"
              to={`/levelCheck/edit/${data.id}`}>
              <Pencil size="24" />
              <span>Edit</span>
            </Link>
            <SaveControl
              contentRef={componentRef}
              className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50"
              layout="landscape"
              title="level-check" />
            <PrintControl
              contentRef={componentRef}
              className="cursor-pointer md:flex md:gap-2 md:items-center text-sm hidden rounded-xl bg-white border border-dark-green hover:bg-dark-green px-3 py-1.5 hover:text-slate-50" layout="landscape" />
          </div>
        </div>


      </aside>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)}>
            <div className="absolute top-0 right-0 h-full w-72 max-w-[85%] bg-white shadow-xl p-3 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-base font-semibold">Level Check</h3>
                {/* close button - can be redesign */}
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="rounded-md border px-2 py-1 text-sm">✕
                </button>
              </div>
              <Link className="cursor-pointer flex items-center justify-center gap-2 rounded-xl border px-3 py-2 hover:bg-dark-green hover:text-white" to={`/levelCheck/edit/${data.id}`}>
                <Pencil />
                <span>Edit</span></Link>
              <SaveControl
                contentRef={componentRef}
                className={"cursor-pointer flex items-center justify-center gap-2 rounded-xl border px-3 py-2 hover:bg-dark-green hover:text-white"}
                layout={"landscape"}
                title={data.student_name} />
              <PrintControl
                contentRef={componentRef}
                className={"cursor-pointer flex items-center justify-center gap-2 rounded-xl border px-3 py-2 hover:bg-dark-green hover:text-white"}
                layout={"landscape"} />
            </div>
          </div>

        </div>
      )}
      {data && (
        <>
          <div className="print-component-landscape" ref={componentRef}>
            <PlotLevelCheck data={data} />
          </div>
          <div className="flex gap-6 justify-end items-center h-24">

          </div>
        </>
      )}
    </div>
  );
};

export default PreviewPage;
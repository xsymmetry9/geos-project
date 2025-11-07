import { useEffect, useState, useRef } from "react";
import { EnglishEntry, CjkEntry } from "@/type/LevelCheckForm";
import {
  isEnglishLang,
  isCjkLang,
  normalizeEnglish,
  normalizeCjk
} from "./shared";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { useParams } from "react-router-dom";
import SaveControl from "@/components/SaveControl";
import PrintControl from "@/components/PrintControl";

const PreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<EnglishEntry | CjkEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const promiseResolve = useRef<null | (() => void)>(null);
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
    <div className="container mx-auto p-6">
      {data && (
        <>
          <div className="print-component-landscape" ref={componentRef}>
            <PlotLevelCheck data={data} />
          </div>
          <div className="flex gap-6 justify-end items-center h-24">
            <SaveControl
              contentRef={componentRef}
              className="btn-primary"
              layout="landscape"
              title="level-check" />
            <PrintControl
              contentRef={componentRef}
              className="btn-primary"
              layout="landscape" />
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewPage;
import { useEffect, useState, useRef } from "react";
import { EnglishEntry, CjkEntry } from "@/type/LevelCheckForm";
import { getLevelCheckById } from "./shared";
import PlotLevelCheck from "@/components/LevelCheckForm/PlotLevelCheck";
import { useParams, Link } from "react-router-dom";
import SaveControl from "@/components/SaveControl";
import CloudSaveControl from "@/components/CloudSaveControl";
import PrintControl from "@/components/PrintControl";
import PrintPreviewToolbar, {
  printToolbarMutedClass,
  printToolbarActionClass,
  printToolbarExtractClass,
} from "@/components/PrintPreviewToolbar";
import { List, Pencil } from "lucide-react";
import { useUser } from "@/context/UserContext";
import labelText from "@/assets/other/labelText.json";
import { Language } from "@/utils/common";
import { buildDocumentFileName } from "@/utils/buildSprFileName";
// After PrintControl so LC landscape rules override shared print.css
import "@/styles/printLevelCheck.css";

const PreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const language = (user?.language ?? "english") as Language;
  const t = labelText[language];

  const [data, setData] = useState<EnglishEntry | CjkEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    try {
      const entry = getLevelCheckById(id);
      if (!cancelled) {
        setData(entry);
        setError(null);
      }
    } catch (e: any) {
      if (!cancelled) {
        setError(e?.message ?? "Unexpected error while loading data.");
        setData(null);
      }
    } finally {
      if (!cancelled) setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div className="px-4 py-8 text-center text-muted">{t.loading}</div>;
  }

  if (error) {
    return <div className="px-4 py-8 text-center text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="px-4 py-8 text-center text-muted">No data found for this record.</div>;
  }

  const fileTitle = buildDocumentFileName(
    user?.name ?? "Guest",
    data.student_name ?? "",
    "levelCheck"
  );

  return (
    <div className="min-h-full bg-teal-50">
      <PrintPreviewToolbar maxWidthClass="max-w-[297mm]">
        <Link className={printToolbarMutedClass} to="/home?view=levelCheck">
          <List size={16} aria-hidden="true" />
          <span>{t.view_level_checks}</span>
        </Link>
        <Link className={printToolbarMutedClass} to={`/levelCheck/edit/${data.id}`}>
          <Pencil size={16} aria-hidden="true" />
          <span>{t.edit}</span>
        </Link>
        <PrintControl
          iconSize={16}
          contentRef={componentRef}
          className={printToolbarActionClass}
          document="levelCheck"
        />
        <SaveControl
          contentRef={componentRef}
          className={printToolbarExtractClass}
          document="levelCheck"
          title={fileTitle}
          iconSize={16}
        />
        <CloudSaveControl
          contentRef={componentRef}
          className={printToolbarExtractClass}
          document="levelCheck"
          title={fileTitle}
          iconSize={16}
        />
      </PrintPreviewToolbar>

      <div className="w-full overflow-x-auto px-2 py-3">
        <div
          ref={componentRef}
          className="print-component-landscape mx-auto min-w-[1026px]"
        >
          <PlotLevelCheck data={data} />
        </div>
        <div className="flex h-24 items-center justify-end gap-6" />
      </div>
    </div>
  );
};

export default PreviewPage;

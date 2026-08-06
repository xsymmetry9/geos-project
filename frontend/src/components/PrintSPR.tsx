import { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { List } from "lucide-react";
import { getStudentById } from "@/utils/functions";
import { PrintContent } from "@/components/PrintStudentProgressReport";
import PrintControl from "@/components/PrintControl";
import SaveControl from "@/components/SaveControl";
import PrintPreviewToolbar, {
  printToolbarMutedClass,
  printToolbarActionClass,
  printToolbarExtractClass,
} from "@/components/PrintPreviewToolbar";
import { useUser } from "@/context/UserContext";
import { Student } from "@/type/Student";
import labelText from "@/assets/other/labelText.json";

const PrintPage = () => {
  const params = useParams();
  const [parsedData, setParsedData] = useState<Student | null>(null);
  const { user } = useUser();
  const language = user?.language || "english";
  const componentRef = useRef<HTMLDivElement>(null);
  const t = labelText[language];

  useEffect(() => {
    setParsedData(params.id ? getStudentById(params.id) : null);
  }, [params.id]);

  if (!parsedData) {
    return <div className="px-4 py-8 text-center text-muted">{t.loading}</div>;
  }

  return (
    <>
      <PrintPreviewToolbar maxWidthClass="max-w-[210mm]">
        <Link className={printToolbarMutedClass} to="/home?view=spr">
          <List size={16} aria-hidden="true" />
          <span>{t.dashboard}</span>
        </Link>
        <PrintControl
          iconSize={16}
          contentRef={componentRef}
          className={printToolbarActionClass}
          document="spr"
        />
        <SaveControl
          contentRef={componentRef}
          className={printToolbarExtractClass}
          document="spr"
          title="spr"
          iconSize={16}
        />
      </PrintPreviewToolbar>

      <div className="mx-auto overflow-auto px-4 pb-6">
        <div className="print-component border shadow-lg" ref={componentRef}>
          <PrintContent parsedData={parsedData} language={language} />
        </div>
      </div>
    </>
  );
};

export default PrintPage;

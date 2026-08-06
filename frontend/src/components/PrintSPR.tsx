import { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { List } from "lucide-react";
import { getStudentById } from "@/utils/functions";
import { PrintContent } from "@/components/PrintStudentProgressReport";
import PrintControl from "@/components/PrintControl";
import SaveControl from "@/components/SaveControl";
import { useUser } from "@/context/UserContext";
import { Student } from "@/type/Student";
import labelText from "@/assets/other/labelText.json";

const PrintPage = () => {
  const params = useParams();
  const [parsedData, setParsedData] = useState<Student | null>(null);

  useEffect(() => {
    if (params.id) {
      setParsedData(getStudentById(params.id));
    } else {
      setParsedData(null);
    }
  }, [params.id]);

  const { user } = useUser();
  const language = user?.language || "english";
  const componentRef = useRef<HTMLDivElement>(null);
  const t = labelText[language];

  if (!parsedData) {
    return <div className="px-4 py-8 text-center text-muted">{t.loading}</div>;
  }

  const segmentClass =
    "inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap px-3 py-2 text-sm font-semibold capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-inset sm:px-4";

  return (
    <>
      <div className="mx-auto w-full max-w-[210mm] px-4 pt-5 pb-3">
        <div className="flex justify-end">
          <div className="inline-flex overflow-hidden rounded-xl border border-line bg-white shadow-sm">
            <div className="flex divide-x divide-line">
              <Link
                className={`${segmentClass} bg-surface text-muted hover:bg-brand-soft hover:text-brand`}
                to={"/home?view=spr"}
              >
                <List size={16} aria-hidden="true" />
                <span>{t.dashboard}</span>
              </Link>
              <PrintControl
                iconSize={16}
                contentRef={componentRef}
                className={`${segmentClass} bg-brand text-white hover:bg-brand-dark`}
                layout="portrait"
              />
              <SaveControl
                contentRef={componentRef}
                className={`${segmentClass} bg-brand text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60`}
                layout="p"
                title="spr"
                iconSize={16}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto overflow-auto px-4 pb-6">
        <div className="print-component border shadow-lg" ref={componentRef}>
          <PrintContent parsedData={parsedData} language={language} />
        </div>
      </div>
    </>
  );
};

export default PrintPage;

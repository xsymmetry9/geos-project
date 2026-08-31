import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Archive, ChevronDown, Pencil, Search } from "lucide-react";

export type RecordsTableRow = {
  id: string;
  dateCreated: string | Date;
  cloudUrl?: string;
  name?: string;
  student_name?: string;
};

export type RecordsTableProps = {
  items: RecordsTableRow[];
  headerBgClass?: string;
  nameHeader: string;
  nameKey: "name" | "student_name";
  editPath: (id: string) => string;
  previewPath: (id: string) => string;
  onDelete: (id: string) => void;
  /** Number of row slots to render (pads with empty rows). */
  rowSlots: number;
};

const formattedDate = (dateCreated: string | Date) =>
  format(new Date(dateCreated), "MM/dd/yyyy");

/** Shared dashboard table for SPR and Level Check records. */
const RecordsTable = ({
  items,
  headerBgClass = "bg-brand",
  nameHeader,
  nameKey,
  editPath,
  previewPath,
  onDelete,
  rowSlots,
}: RecordsTableProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const toggleOption = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setSelectedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const rowsToRender = Math.max(items.length, rowSlots, 1);

  return (
    <div className="h-full min-h-0 overflow-hidden rounded-xl border border-line">
      <table className="h-full w-full table-fixed">
        <colgroup>
          <col style={{ width: "22%" }} />
          <col style={{ width: "28%" }} />
          <col style={{ width: "28%" }} />
          <col style={{ width: "22%" }} />
        </colgroup>
        <thead>
          <tr className={`${headerBgClass} font-semibold text-white`}>
            <th className="h-11 p-3 text-center text-sm tracking-wide uppercase">Date</th>
            <th className="h-11 p-3 text-center text-sm tracking-wide uppercase">{nameHeader}</th>
            <th className="h-11 p-3 text-center text-sm tracking-wide uppercase">Link</th>
            <th className="h-11 w-[80px] p-3 text-center text-sm tracking-wide uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowsToRender }).map((_, index) => {
            const item = items[index];

            if (!item) {
              return (
                <tr key={`empty-${index}`} className="border-b border-line bg-white">
                  <td className="p-3 text-center text-sm">&nbsp;</td>
                  <td className="p-3 text-center text-sm font-medium">&nbsp;</td>
                  <td className="p-3 text-center text-sm">&nbsp;</td>
                  <td className="p-3 text-center">&nbsp;</td>
                </tr>
              );
            }

            const cloudUrl = typeof item.cloudUrl === "string" ? item.cloudUrl.trim() : "";

            return (
              <tr
                key={`${item.id}-${index}`}
                className="border-b border-line transition-colors duration-150 odd:bg-white even:bg-brand-soft/40 hover:bg-brand-soft"
              >
                <td className="p-3 text-center align-middle text-sm text-muted">
                  {formattedDate(item.dateCreated)}
                </td>
                <td className="p-3 text-center align-middle text-sm font-medium text-ink">
                  {item[nameKey]}
                </td>
                <td className="p-3 text-center align-middle text-sm">
                  {cloudUrl ? (
                    <a
                      href={cloudUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand underline-offset-2 hover:underline"
                    >
                      click here
                    </a>
                  ) : (
                    <span className="text-muted">&nbsp;</span>
                  )}
                </td>
                <td className="relative p-3 text-center align-middle">
                  <div className="inline-block">
                    <button
                      onClick={() => toggleOption(item.id)}
                      aria-expanded={selectedId === item.id}
                      aria-label="toggle menu"
                      type="button"
                      className="cursor-pointer rounded-full border border-transparent bg-white p-1.5 text-muted transition-colors hover:border-brand hover:bg-brand hover:text-white focus:ring-2 focus:ring-brand/30 focus:outline-none aria-expanded:border-brand aria-expanded:bg-brand aria-expanded:text-white"
                    >
                      <ChevronDown size={16} strokeWidth={2} />
                    </button>
                  </div>
                  {selectedId === item.id && (
                    <div
                      ref={dropDownRef}
                      className="absolute top-10 right-0 z-40 mt-1 flex w-[170px] flex-col rounded-xl border border-line bg-white p-1 shadow-lg"
                    >
                      <Link
                        className="flex items-center gap-2 rounded-lg p-2 text-ink hover:bg-brand-soft"
                        to={editPath(item.id)}
                      >
                        <Pencil size={16} />
                        <span className="text-sm">Edit</span>
                      </Link>
                      <Link
                        className="flex items-center gap-2 rounded-lg p-2 text-ink hover:bg-brand-soft"
                        to={previewPath(item.id)}
                      >
                        <Search size={16} />
                        <span className="text-sm">Print Preview</span>
                      </Link>
                      <button
                        className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-red-600 hover:bg-red-50"
                        onClick={() => onDelete(item.id)}
                        type="button"
                      >
                        <Archive size={16} />
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;

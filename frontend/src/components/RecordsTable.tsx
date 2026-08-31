import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Archive, ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, Pencil, Search } from "lucide-react";

export type RecordsTableRow = {
  id: string;
  dateCreated: string | Date;
  cloudUrl?: string;
  name?: string;
  student_name?: string;
};

export type SortKey = "date" | "name";
export type SortDir = "asc" | "desc";

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
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
};

type MenuPosition = {
  top: number;
  left: number;
};

const MENU_WIDTH = 170;
const MENU_ESTIMATED_HEIGHT = 132;

const formattedDate = (dateCreated: string | Date) =>
  format(new Date(dateCreated), "MM/dd/yyyy");

const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => {
  if (!active) {
    return <ArrowUpDown size={14} strokeWidth={2.25} aria-hidden="true" />;
  }
  return dir === "asc" ? (
    <ArrowUp size={14} strokeWidth={2.25} aria-hidden="true" />
  ) : (
    <ArrowDown size={14} strokeWidth={2.25} aria-hidden="true" />
  );
};

const sortBtnClass =
  "inline-flex items-center justify-center rounded-md p-1 text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

const getMenuPosition = (button: HTMLElement): MenuPosition => {
  const rect = button.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const openUp = spaceBelow < MENU_ESTIMATED_HEIGHT + 8;

  const top = openUp ? Math.max(8, rect.top - MENU_ESTIMATED_HEIGHT - 4) : rect.bottom + 4;
  const left = Math.min(
    Math.max(8, rect.right - MENU_WIDTH),
    window.innerWidth - MENU_WIDTH - 8
  );

  return { top, left };
};

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
  sortKey,
  sortDir,
  onSort,
}: RecordsTableProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<MenuPosition | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const closeMenu = () => {
    setSelectedId(null);
    setMenuPos(null);
  };

  const toggleOption = (id: string) => {
    if (selectedId === id) {
      closeMenu();
      return;
    }

    const button = buttonRefs.current.get(id);
    if (button) {
      setMenuPos(getMenuPosition(button));
    }
    setSelectedId(id);
  };

  useLayoutEffect(() => {
    if (!selectedId) return;

    const button = buttonRefs.current.get(selectedId);
    if (!button) return;

    const updatePosition = () => setMenuPos(getMenuPosition(button));
    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", closeMenu, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", closeMenu, true);
    };
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const button = buttonRefs.current.get(selectedId);
      if (dropDownRef.current?.contains(target) || button?.contains(target)) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedId]);

  const rowsToRender = Math.max(items.length, rowSlots, 1);
  const selectedItem = items.find((item) => item.id === selectedId) ?? null;

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
            <th className="h-11 p-3 text-center text-sm tracking-wide uppercase">
              <span className="inline-flex items-center justify-center gap-1">
                Date
                <button
                  type="button"
                  onClick={() => onSort("date")}
                  className={sortBtnClass}
                  aria-label={
                    sortKey === "date"
                      ? `Sort by date ${sortDir === "desc" ? "oldest first" : "newest first"}`
                      : "Sort by date"
                  }
                >
                  <SortIcon active={sortKey === "date"} dir={sortDir} />
                </button>
              </span>
            </th>
            <th className="h-11 p-3 text-center text-sm tracking-wide uppercase">
              <span className="inline-flex items-center justify-center gap-1">
                {nameHeader}
                <button
                  type="button"
                  onClick={() => onSort("name")}
                  className={sortBtnClass}
                  aria-label={
                    sortKey === "name"
                      ? `Sort by name ${sortDir === "asc" ? "Z to A" : "A to Z"}`
                      : "Sort by name"
                  }
                >
                  <SortIcon active={sortKey === "name"} dir={sortDir} />
                </button>
              </span>
            </th>
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
                <td className="p-3 text-center align-middle">
                  <button
                    ref={(el) => {
                      if (el) buttonRefs.current.set(item.id, el);
                      else buttonRefs.current.delete(item.id);
                    }}
                    onClick={() => toggleOption(item.id)}
                    aria-expanded={selectedId === item.id}
                    aria-haspopup="menu"
                    aria-label="toggle menu"
                    type="button"
                    className="cursor-pointer rounded-full border border-transparent bg-white p-1.5 text-muted transition-colors hover:border-brand hover:bg-brand hover:text-white focus:ring-2 focus:ring-brand/30 focus:outline-none aria-expanded:border-brand aria-expanded:bg-brand aria-expanded:text-white"
                  >
                    <ChevronDown size={16} strokeWidth={2} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedItem &&
        menuPos &&
        createPortal(
          <div
            ref={dropDownRef}
            role="menu"
            style={{
              position: "fixed",
              top: menuPos.top,
              left: menuPos.left,
              width: MENU_WIDTH,
            }}
            className="z-50 flex flex-col rounded-xl border border-line bg-white p-1 shadow-lg"
          >
            <Link
              className="flex items-center gap-2 rounded-lg p-2 text-ink hover:bg-brand-soft"
              to={editPath(selectedItem.id)}
              role="menuitem"
              onClick={closeMenu}
            >
              <Pencil size={16} />
              <span className="text-sm">Edit</span>
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg p-2 text-ink hover:bg-brand-soft"
              to={previewPath(selectedItem.id)}
              role="menuitem"
              onClick={closeMenu}
            >
              <Search size={16} />
              <span className="text-sm">Print Preview</span>
            </Link>
            <button
              className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-red-600 hover:bg-red-50"
              onClick={() => {
                onDelete(selectedItem.id);
                closeMenu();
              }}
              type="button"
              role="menuitem"
            >
              <Archive size={16} />
              <span className="text-sm">Delete</span>
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default RecordsTable;

import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import User from "@/type/User";
import { getDataFromLocal } from "@/utils/functions";
import { CloseBtn } from "@/components/CustomizedButtons";
import RecordsTable, { SortDir, SortKey } from "@/components/RecordsTable";

const TABLE_HEADER_HEIGHT = 44;
const ROW_TARGET_HEIGHT = 52;
const MIN_PAGE_SIZE = 3;
const MAX_PAGE_SIZE = 20;
const DEFAULT_PAGE_SIZE = 5;

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getPageNumbers = (totalPages: number, currentPage: number): (number | "…")[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "…", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "…", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages];
};

const pageBtnBase =
  "inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(totalPages, currentPage);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-4 flex shrink-0 justify-center">
      <nav
        aria-label="Pagination"
        className="inline-flex items-center gap-1 rounded-full bg-brand-soft/60 p-1.5"
      >
        <button
          type="button"
          onClick={() => canGoPrev && onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          aria-label="Previous page"
          className={`${pageBtnBase} text-ink hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent`}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        {pageNumbers.map((p, idx) => {
          if (p === "…") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="inline-flex h-9 w-7 items-center justify-center text-sm text-muted"
                aria-hidden="true"
              >
                …
              </span>
            );
          }

          const isCurrent = p === currentPage;

          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={isCurrent ? "page" : undefined}
              className={
                isCurrent
                  ? `${pageBtnBase} bg-brand text-white shadow-sm`
                  : `${pageBtnBase} text-ink hover:bg-white`
              }
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => canGoNext && onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          aria-label="Next page"
          className={`${pageBtnBase} text-ink hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent`}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

// Main Homepage

const Homepage = () => {
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const initialPage =
    viewParam === "levelCheck" ? "view-levelCheck" : "view-spr";
  const [page, setPage] = useState<"view-spr" | "view-levelCheck">(initialPage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User>(new User());
  const [addFormNav, setAddFormNav] = useState<boolean>(false);
  const [deletePage, setDeletePage] = useState<{
    display: boolean;
    id: string | null;
    type: string;
  }>({ display: false, id: null, type: "" });
  const tableAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (viewParam === "levelCheck") {
      setPage("view-levelCheck");
    } else if (viewParam === "spr") {
      setPage("view-spr");
    }
  }, [viewParam]);

  useEffect(() => {
    const user = getDataFromLocal();
    setUserData(user);
    setLoading(false);
  }, []);

  // Reset pagination when switching views or when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [page, userData]);

  // Default sort when switching SPR / Level Check
  useEffect(() => {
    setSortKey("date");
    setSortDir("desc");
  }, [page]);

  const isSPRView = page === "view-spr";
  const nameField = isSPRView ? "name" : "student_name";
  const rawItems = isSPRView ? userData?.SPR ?? [] : userData?.levelCheck ?? [];

  const allItems = [...rawItems].sort((a, b) => {
    if (sortKey === "date") {
      const aTime = new Date(a.dateCreated).getTime();
      const bTime = new Date(b.dateCreated).getTime();
      const diff = aTime - bTime;
      return sortDir === "asc" ? diff : -diff;
    }

    const aName = String((a as any)[nameField] ?? "").trim().toLocaleLowerCase();
    const bName = String((b as any)[nameField] ?? "").trim().toLocaleLowerCase();
    const cmp = aName.localeCompare(bName, undefined, { sensitivity: "base" });
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalItems = allItems.length;

  // Fit as many rows as the available viewport height allows
  useEffect(() => {
    if (loading || totalItems === 0) return;

    const el = tableAreaRef.current;
    if (!el) return;

    const updatePageSize = () => {
      const available = el.clientHeight - TABLE_HEADER_HEIGHT;
      const rows = Math.floor(available / ROW_TARGET_HEIGHT);
      const next = Math.max(MIN_PAGE_SIZE, Math.min(MAX_PAGE_SIZE, rows || MIN_PAGE_SIZE));
      setPageSize((prev) => (prev === next ? prev : next));
    };

    updatePageSize();
    const observer = new ResizeObserver(updatePageSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, totalItems, page]);

  useEffect(() => {
    const totalPagesForSize = Math.max(1, Math.ceil(Math.max(totalItems, 1) / pageSize));
    setCurrentPage((prev) => Math.min(prev, totalPagesForSize));
  }, [pageSize, totalItems]);

  const handleFormControl = () => setAddFormNav((prev) => !prev);

  type HandleDisplayDeleteProps = {
    display: boolean;
    id: string;
    type: string;
  };

  const handleDisplayDelete = ({ display, id, type }: HandleDisplayDeleteProps) => {
    setDeletePage({ display, id, type });
  };

  const handleDelete = () => {
    if (!deletePage.id || !userData) return;

    const raw = localStorage.getItem("GEOS_app");
    if (!raw) return;

    const parsedData = JSON.parse(raw);
    const existing = Array.isArray(parsedData[deletePage.type]) ? parsedData[deletePage.type] : [];
    const result = existing.filter((item: any) => item.id !== deletePage.id);

    parsedData[deletePage.type] = result;

    localStorage.setItem("GEOS_app", JSON.stringify(parsedData));

    setUserData((prev) => {
      if (!prev) return prev;
      if (deletePage.type === "SPR") {
        return { ...prev, SPR: result } as User;
      }
      if (deletePage.type === "levelCheck") {
        return { ...prev, levelCheck: result } as User;
      }
      return prev;
    });

    closePage();
  };

  const closePage = () => setDeletePage({ display: false, id: null, type: "" });

  if (loading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(Math.max(totalItems, 1) / pageSize));

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = totalItems === 0 ? 0 : (safePage - 1) * pageSize;
  const endIndexExclusive = totalItems === 0 ? 0 : Math.min(startIndex + pageSize, totalItems);

  const pageItems = allItems.slice(startIndex, endIndexExclusive);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setCurrentPage(nextPage);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "date" ? "desc" : "asc");
    }
    setCurrentPage(1);
  };

  // Dynamic table config for SPR vs LevelCheck
  const sprConfig = {
    headerBgClass: "bg-brand",
    nameHeader: "Name",
    nameKey: "name" as const,
    editPath: (id: string) => `/spr/edit/${id}`,
    previewPath: (id: string) => `/spr/view/${id}`,
    onDelete: (id: string) => handleDisplayDelete({ display: true, id, type: "SPR" }),
  };

  const levelCheckConfig = {
    headerBgClass: "bg-brand",
    nameHeader: "Name",
    nameKey: "student_name" as const,
    editPath: (id: string) => `/levelCheck/edit/${id}`,
    previewPath: (id: string) => `/levelCheck/preview/${id}`,
    onDelete: (id: string) => handleDisplayDelete({ display: true, id, type: "levelCheck" }),
  };

  const currentTableConfig = isSPRView ? sprConfig : levelCheckConfig;

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-6 md:py-8">
      <div className="mx-auto mb-4 w-full max-w-[900px] shrink-0 text-center md:mb-6">
        <h2 className="font-secondary text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {isSPRView ? "Student Progress Reports" : "Level Checks"}
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-[900px] min-h-0 flex-1 flex-col">
        <div className="panel flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-4">
          {totalItems ? (
            <>
              <div ref={tableAreaRef} className="min-h-0 flex-1">
                <RecordsTable
                  items={pageItems}
                  rowSlots={pageSize}
                  headerBgClass={currentTableConfig.headerBgClass}
                  nameHeader={currentTableConfig.nameHeader}
                  nameKey={currentTableConfig.nameKey}
                  editPath={currentTableConfig.editPath}
                  previewPath={currentTableConfig.previewPath}
                  onDelete={currentTableConfig.onDelete}
                  sortKey={sortKey}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
              </div>
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <div className="rounded-full bg-brand-soft px-4 py-2 text-sm font-medium text-brand">
                No records yet
              </div>
              <p className="max-w-sm text-muted">
                {isSPRView
                  ? "Create your first Student Progress Report to get started."
                  : "Create your first Level Check form to get started."}
              </p>
              <Link className="btn-primary min-w-40" to={isSPRView ? "/spr" : "/levelCheck"}>
                {isSPRView ? "Create SPR" : "Create Level Check"}
              </Link>
            </div>
          )}
        </div>
      </div>

      {addFormNav && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink/40" onClick={handleFormControl} />
          <div className="panel absolute top-1/2 left-1/2 grid h-[280px] w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2 grid-rows-[40px_1fr] overflow-hidden">
            <div className="relative flex h-10 w-full items-center justify-end bg-brand-soft px-2">
              <CloseBtn handleControl={handleFormControl} />
            </div>
            <div className="flex flex-col items-center justify-center gap-3 px-6">
              <Link className="btn-primary flex h-12 w-full max-w-[250px] items-center justify-center gap-2" to="/spr">
                <Plus size={18} />
                <span>SPR Form</span>
              </Link>
              <Link
                className="btn-primary flex h-12 w-full max-w-[250px] items-center justify-center gap-2"
                to="/levelCheck/create"
              >
                <Plus size={18} />
                <span>Level Check Form</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {deletePage.display && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-ink/40 transition-opacity" onClick={closePage} />
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="panel relative w-full overflow-hidden text-left sm:my-8 sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    >
                      <path
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-base font-semibold text-ink">
                      Are you sure you want to delete this?
                    </h3>
                    <p className="mt-1 text-sm text-muted">This action cannot be undone.</p>
                  </div>
                </div>
              </div>
              <div className="bg-brand-soft/60 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex w-full justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button type="button" onClick={closePage} className="btn-secondary mt-3 w-full sm:mt-0 sm:w-auto">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;

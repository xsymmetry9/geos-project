import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import {
  Archive,
  Pencil,
  Plus,
  MoreHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import User from "@/type/User";
import { getDataFromLocal } from "@/utils/functions";
import { CloseBtn } from "@/components/CustomizedButtons";

// Helpers

const formattedDate = (dateCreated: string | Date) => {
  return format(new Date(dateCreated), "MM/dd/yyyy");
};

// Pagination constants / types

const ITEMS_PER_PAGE = 5;
const MIN_ROWS = 5; // minimum visible rows in the table

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getPageNumbers = (totalPages: number, currentPage: number): (number | string)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = getPageNumbers(totalPages, currentPage);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-4 flex items-center justify-center border-t border-line bg-white px-4 py-3">
      <nav aria-label="Pagination" className="isolate inline-flex -space-x-px overflow-hidden rounded-lg">
        <button
          type="button"
          onClick={() => canGoPrev && onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          className="relative inline-flex items-center px-2 py-2 text-muted ring-1 ring-line hover:bg-brand-soft focus:z-20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        {pageNumbers.map((p, idx) => {
          if (p === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-muted ring-1 ring-line"
              >
                ...
              </span>
            );
          }

          const pageNumber = p as number;
          const isCurrent = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={isCurrent ? "page" : undefined}
              className={
                isCurrent
                  ? "relative z-10 inline-flex items-center bg-brand px-4 py-2 text-sm font-semibold text-white focus:z-20"
                  : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line hover:bg-brand-soft focus:z-20 focus:outline-none"
              }
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => canGoNext && onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="relative inline-flex items-center px-2 py-2 text-muted ring-1 ring-line hover:bg-brand-soft focus:z-20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="sr-only">Next</span>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

// Reusable table component

type TableWithActionsProps = {
  items: any[];
  headerBgClass: string; // e.g. "bg-dark-green" or "bg-teal-700"
  nameHeader: string; // header text for the name column
  nameKey: "name" | "student_name";
  nameCellClass?: string;
  editPath: (id: string) => string;
  previewPath: (id: string) => string;
  onDelete: (id: string) => void;
};

const TableWithActions = ({
  items,
  headerBgClass,
  nameHeader,
  nameKey,
  nameCellClass,
  editPath,
  previewPath,
  onDelete,
}: TableWithActionsProps) => {
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

  const rowsToRender = Math.max(items.length, MIN_ROWS);

  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <table className="w-full">
        <colgroup>
          <col style={{ width: "22%" }} />
          <col style={{ width: "28%" }} />
          <col style={{ width: "28%" }} />
          <col style={{ width: "22%" }} />
        </colgroup>
        <thead>
          <tr className={`${headerBgClass} font-semibold text-white`}>
            <th className="p-3 text-center text-sm tracking-wide uppercase">Date</th>
            <th className="p-3 text-center text-sm tracking-wide uppercase">{nameHeader}</th>
            <th className="p-3 text-center text-sm tracking-wide uppercase">Link</th>
            <th className="w-[80px] p-3 text-center text-sm tracking-wide uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowsToRender }).map((_, index) => {
            const item = items[index];

            if (!item) {
              return (
                <tr key={`empty-${index}`} className="border-b border-line bg-white">
                  <td className="h-[44px] p-3 text-center text-sm">&nbsp;</td>
                  <td className="h-[44px] p-3 text-sm font-medium">&nbsp;</td>
                  <td className="h-[44px] p-3 text-center text-sm">&nbsp;</td>
                  <td className="h-[44px] p-3 text-center">&nbsp;</td>
                </tr>
              );
            }

            const cloudUrl = typeof item.cloudUrl === "string" ? item.cloudUrl.trim() : "";

            return (
              <tr
                key={`${item.id}-${index}`}
                className="border-b border-line transition-colors duration-150 odd:bg-white even:bg-brand-soft/40 hover:bg-brand-soft"
              >
                <td className="h-[44px] p-3 text-center text-sm text-muted">
                  {formattedDate(item.dateCreated)}
                </td>
                <td
                  className={`h-[44px] p-3 text-sm font-medium text-ink ${
                    nameCellClass ?? "pl-6 text-center"
                  }`}
                >
                  {item[nameKey]}
                </td>
                <td className="h-[44px] p-3 text-center text-sm">
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
                <td className="relative h-[44px] p-3 text-center">
                  <div className="inline-block">
                    <button
                      onClick={() => toggleOption(item.id)}
                      aria-expanded={selectedId === item.id}
                      aria-label="toggle menu"
                      type="button"
                      className="cursor-pointer rounded-full border border-transparent bg-white p-1.5 text-muted hover:border-line hover:bg-brand-soft hover:text-brand focus:ring-2 focus:ring-brand/30 focus:outline-none"
                    >
                      <MoreHorizontal size={16} strokeWidth={2} />
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

// Main Homepage

const Homepage = () => {
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const initialPage =
    viewParam === "levelCheck" ? "view-levelCheck" : "view-spr";
  const [page, setPage] = useState<"view-spr" | "view-levelCheck">(initialPage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User>(new User());
  const [addFormNav, setAddFormNav] = useState<boolean>(false);
  const [deletePage, setDeletePage] = useState<{
    display: boolean;
    id: string | null;
    type: string;
  }>({ display: false, id: null, type: "" });

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

  // Reset pagination when switching between SPR / LevelCheck or when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [page, userData]);

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
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  const isSPRView = page === "view-spr";
  const allItems = isSPRView ? userData?.SPR ?? [] : userData?.levelCheck ?? [];
  const totalItems = allItems.length;

  const pageSize = ITEMS_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(Math.max(totalItems, 1) / pageSize));

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = totalItems === 0 ? 0 : (safePage - 1) * pageSize;
  const endIndexExclusive = totalItems === 0 ? 0 : Math.min(startIndex + pageSize, totalItems);

  const pageItems = allItems.slice(startIndex, endIndexExclusive);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setCurrentPage(nextPage);
  };

  // Dynamic table config for SPR vs LevelCheck
  const sprConfig = {
    headerBgClass: "bg-brand",
    nameHeader: "Name",
    nameKey: "name" as const,
    nameCellClass: "pl-6 text-center",
    editPath: (id: string) => `/spr/edit/${id}`,
    previewPath: (id: string) => `/spr/view/${id}`,
    onDelete: (id: string) => handleDisplayDelete({ display: true, id, type: "SPR" }),
  };

  const levelCheckConfig = {
    headerBgClass: "bg-brand",
    nameHeader: "Name",
    nameKey: "student_name" as const,
    nameCellClass: "pl-6 text-left",
    editPath: (id: string) => `/levelCheck/edit/${id}`,
    previewPath: (id: string) => `/levelCheck/preview/${id}`,
    onDelete: (id: string) => handleDisplayDelete({ display: true, id, type: "levelCheck" }),
  };

  const currentTableConfig = isSPRView ? sprConfig : levelCheckConfig;

  return (
    <div className="px-4 pt-8 pb-12 md:pt-12 lg:pt-14">
      <div className="mx-auto mb-8 max-w-[900px] text-center md:mb-10">
        <h2 className="font-secondary text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {isSPRView ? "Student Progress Reports" : "Level Checks"}
        </h2>
      </div>

      <div className="mx-auto w-full max-w-[900px]">
        <div className="panel overflow-hidden p-0 sm:p-0">
          {totalItems ? (
            <div className="p-3 sm:p-4">
              <TableWithActions
                items={pageItems}
                headerBgClass={currentTableConfig.headerBgClass}
                nameHeader={currentTableConfig.nameHeader}
                nameKey={currentTableConfig.nameKey}
                nameCellClass={currentTableConfig.nameCellClass}
                editPath={currentTableConfig.editPath}
                previewPath={currentTableConfig.previewPath}
                onDelete={currentTableConfig.onDelete}
              />
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
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

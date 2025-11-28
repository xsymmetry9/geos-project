import { Link } from "react-router-dom";
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
import Navigation from "./Navigation";
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
  start: number;
  end: number;
  total: number;
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
  start,
  end,
  total,
  onPageChange,
}: PaginationProps) => {
  if (total === 0) return null;

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile: Previous / Next only */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={() => canGoPrev && onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => canGoNext && onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* Desktop: full pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{start}</span> to{" "}
            <span className="font-medium">{end}</span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            {/* Previous button */}
            <button
              type="button"
              onClick={() => canGoPrev && onPageChange(currentPage - 1)}
              disabled={!canGoPrev}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Page buttons */}
            {pageNumbers.map((p, idx) => {
              if (p === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300"
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
                      ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none"
                  }
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next button */}
            <button
              type="button"
              onClick={() => canGoNext && onPageChange(currentPage + 1)}
              disabled={!canGoNext}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
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
    <table className="w-full">
      <colgroup>
        <col style={{ width: "33.3333%" }} />
        <col style={{ width: "33.3333%" }} />
        <col style={{ width: "33.3333%" }} />
      </colgroup>
      <thead>
        <tr className={`${headerBgClass} font-semibold text-white`}>
          <th className="p-3 text-center text-sm tracking-wide uppercase">Date</th>
          <th className="p-3 text-center text-sm tracking-wide uppercase">{nameHeader}</th>
          <th className="w-[80px] p-3 text-center text-sm tracking-wide uppercase">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rowsToRender }).map((_, index) => {
          const item = items[index];

          if (!item) {
            // Empty row to pad the height
            return (
              <tr
                key={`empty-${index}`}
                className="border-b border-gray-200 bg-white"
              >
                <td className="h-[40px] p-3 text-center text-sm">&nbsp;</td>
                <td className="h-[40px] p-3 text-sm font-medium">&nbsp;</td>
                <td className="h-[40px] p-3 text-center">&nbsp;</td>
              </tr>
            );
          }

          return (
            <tr
              key={`${item.id}-${index}`}
              className="border-b border-gray-200 transition-colors duration-150 odd:bg-white even:bg-slate-50 hover:bg-slate-100"
            >
              <td className="h-[40px] p-3 text-center text-sm">
                {formattedDate(item.dateCreated)}
              </td>
              <td
                className={`h-[40px] p-3 text-sm font-medium ${nameCellClass ?? "pl-6 text-center"
                  }`}
              >
                {item[nameKey]}
              </td>
              <td className="relative h-[36px] p-3 text-center">
                <div className="inline-block">
                  <button
                    onClick={() => toggleOption(item.id)}
                    aria-expanded={selectedId === item.id}
                    aria-label="toggle menu"
                    type="button"
                    className="cursor-pointer rounded-full border border-transparent bg-white p-1 text-slate-600 hover:border-gray-200 hover:bg-slate-100 focus:ring-2 focus:ring-teal-300 focus:outline-none"
                  >
                    <MoreHorizontal size={16} strokeWidth={2} />
                  </button>
                </div>
                {selectedId === item.id && (
                  <div
                    ref={dropDownRef}
                    className="absolute top-10 right-0 z-40 mt-2 flex w-[160px] flex-col rounded border border-gray-200 bg-white p-1 shadow-lg"
                  >
                    <Link
                      className="flex items-center gap-2 p-2 hover:bg-slate-50"
                      to={editPath(item.id)}
                    >
                      <Pencil size={18} />
                      <span className="text-sm">Edit</span>
                    </Link>
                    <Link
                      className="flex items-center gap-2 p-2 hover:bg-slate-50"
                      to={previewPath(item.id)}
                    >
                      <Search size={18} />
                      <span className="text-sm">Print Preview</span>
                    </Link>
                    <button
                      className="flex w-full items-center gap-2 p-2 text-left hover:bg-slate-50"
                      onClick={() => onDelete(item.id)}
                    >
                      <Archive size={18} />
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
  );
};

// Main Homepage

const Homepage = () => {
  const [page, setPage] = useState<"view-spr" | "view-levelCheck">("view-spr");
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

  if (loading) return <h1>Loading ...</h1>;

  const isSPRView = page === "view-spr";
  const allItems = isSPRView ? userData?.SPR ?? [] : userData?.levelCheck ?? [];
  const totalItems = allItems.length;

  const pageSize = ITEMS_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(Math.max(totalItems, 1) / pageSize));

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = totalItems === 0 ? 0 : (safePage - 1) * pageSize;
  const endIndexExclusive = totalItems === 0 ? 0 : Math.min(startIndex + pageSize, totalItems);

  const pageItems = allItems.slice(startIndex, endIndexExclusive);
  const startDisplay = totalItems === 0 ? 0 : startIndex + 1;
  const endDisplay = endIndexExclusive;

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setCurrentPage(nextPage);
  };

  // Dynamic table config for SPR vs LevelCheck
  const sprConfig = {
    headerBgClass: "bg-dark-green",
    nameHeader: "name",
    nameKey: "name" as const,
    nameCellClass: "pl-6 text-center",
    editPath: (id: string) => `/spr/edit/${id}`,
    previewPath: (id: string) => `/spr/view/${id}`,
    onDelete: (id: string) => handleDisplayDelete({ display: true, id, type: "SPR" }),
  };

  const levelCheckConfig = {
    headerBgClass: "bg-teal-700",
    nameHeader: "NAME",
    nameKey: "student_name" as const,
    nameCellClass: "pl-6 text-left",
    editPath: (id: string) => `/levelCheck/edit/${id}`,
    previewPath: (id: string) => `/levelCheck/preview/${id}`,
    onDelete: (id: string) => handleDisplayDelete({ display: true, id, type: "levelCheck" }),
  };

  const currentTableConfig = isSPRView ? sprConfig : levelCheckConfig;

  return (
    <div className="pb-12">
      <div className="p-b-3 mb-6 flex justify-center gap-3">
        <Navigation userData={userData} setUserData={setUserData} setPage={setPage} />
      </div>
      <h2 className="font-secondary mt-6 mb-6 text-center text-2xl font-semibold">
        {isSPRView ? "Student's Progress Report" : "Level Checks"}
      </h2>

      <div className="content">
        <div className="mx-auto w-full max-w-[900px]">
          {totalItems ? (
            <>
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
                start={startDisplay}
                end={endDisplay}
                total={totalItems}
                onPageChange={handlePageChange}
              />
            </>
          ) : isSPRView ? (
            <p className="mt-3 text-center text-gray-500">Click here to create a SPR</p>
          ) : (
            <p className="mt-3 text-center text-gray-500">Click here to create a Level Check</p>
          )}
        </div>
      </div>

      {addFormNav && (
        <div className="absolute top-1/2 left-1/2 grid h-[300px] w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 grid-rows-[40px_1fr] rounded-lg bg-white shadow-lg">
          <div className="relative h-8 w-full bg-gray-100">
            <CloseBtn handleControl={handleFormControl} />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <Link
              className="flex h-12 w-[250px] cursor-pointer items-center gap-2 rounded bg-teal-700 p-2 text-white hover:bg-teal-500"
              to={"/spr"}
            >
              <Plus size={18} />
              <span>SPR Form</span>
            </Link>
            <Link
              className="flex h-12 w-[250px] items-center gap-2 rounded bg-teal-700 p-2 text-white hover:bg-teal-500"
              to={"/levelCheck/create"}
            >
              <Plus size={18} />
              <span>Level Check Form</span>
            </Link>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog styled like Tailwind example */}
      {deletePage.display && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            onClick={closePage}
          ></div>

          {/* Dialog panel */}
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                    <h3 className="text-base font-semibold text-gray-900">
                      Are you sure you want to delete this?
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={closePage}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
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

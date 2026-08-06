import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ImportFromExcel from "@/components/ImportFromExcel";
import ExportToExcel from "@/components/ExportToExcel";

type NavigationProps = {
  setPage: (page: "view-spr" | "view-levelCheck") => void;
  setUserData: (value: any) => void;
  userData: any;
};

const Navigation = ({ setPage, userData, setUserData }: NavigationProps) => {
  const [dropDownSPR, setDropDownSPR] = useState<boolean>(false);
  const [dropDownLevelCheck, setDropDownLevelCheck] = useState<boolean>(false);

  const navRef = useRef<HTMLElement | null>(null);

  const handleChangePage = (id: "view-spr" | "view-levelCheck") => {
    setPage(id);
    setDropDownSPR(false);
    setDropDownLevelCheck(false);
  };

  const toggleSPR = () => {
    setDropDownSPR((prev) => !prev);
    setDropDownLevelCheck(false);
  };

  const toggleLevelCheck = () => {
    setDropDownLevelCheck((prev) => !prev);
    setDropDownSPR(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setDropDownSPR(false);
        setDropDownLevelCheck(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItemClass =
    "block w-full px-4 py-2 text-left text-ink hover:bg-brand-soft hover:text-brand focus:bg-brand-soft focus:text-brand focus:outline-none";

  return (
    <nav ref={navRef} className="panel w-full max-w-[900px] overflow-visible">
      <ul className="flex flex-wrap items-center justify-center gap-1 px-2 py-2 text-sm font-medium sm:gap-2">
        <li className="relative">
          <button
            type="button"
            onClick={toggleSPR}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-ink transition hover:bg-brand-soft hover:text-brand focus:outline-none"
          >
            <span>SPR</span>
            <ChevronDown size={14} className="text-muted" />
          </button>

          {dropDownSPR && (
            <div className="absolute left-0 z-20 mt-1 w-44 origin-top-left rounded-xl border border-line bg-white py-1 shadow-lg">
              <Link to="/spr" className={menuItemClass}>
                New Form
              </Link>
              <button
                type="button"
                onClick={() => handleChangePage("view-spr")}
                className={menuItemClass}
              >
                View Forms
              </button>
            </div>
          )}
        </li>

        <li className="relative">
          <button
            type="button"
            onClick={toggleLevelCheck}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-ink transition hover:bg-brand-soft hover:text-brand focus:outline-none"
          >
            <span>Level Check</span>
            <ChevronDown size={14} className="text-muted" />
          </button>

          {dropDownLevelCheck && (
            <div className="absolute left-0 z-20 mt-1 w-48 origin-top-left rounded-xl border border-line bg-white py-1 shadow-lg">
              <Link to="/levelCheck" className={menuItemClass}>
                New Form
              </Link>
              <button
                type="button"
                onClick={() => handleChangePage("view-levelCheck")}
                className={menuItemClass}
              >
                View Forms
              </button>
            </div>
          )}
        </li>

        <li className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />

        <li>
          <div className="inline-flex items-center rounded-lg px-3 py-2 text-ink transition hover:bg-brand-soft hover:text-brand">
            <ExportToExcel userData={userData} />
          </div>
        </li>
        <li>
          <div className="inline-flex items-center rounded-lg px-3 py-2 text-ink transition hover:bg-brand-soft hover:text-brand">
            <ImportFromExcel userData={userData} setUserData={setUserData} />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

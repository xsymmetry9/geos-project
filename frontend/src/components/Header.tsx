import { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import geosImg from "/logo.jpg";
import { Menu, X, ChevronDown } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Language } from "@/utils/common";
import User from "@/type/User";
import ExportToExcel from "@/components/ExportToExcel";
import ImportFromExcel from "@/components/ImportFromExcel";

const languages: { id: Language; label: string }[] = [
  { id: "english", label: "English" },
  { id: "chinese", label: "Chinese" },
  { id: "korean", label: "Korean" },
  { id: "japanese", label: "Japanese" },
];

type OpenMenu = "spr" | "levelCheck" | "options" | "language" | null;

type AccordionSectionProps = {
  id: Exclude<OpenMenu, null>;
  label: string;
  openMenu: OpenMenu;
  onToggle: (menu: OpenMenu) => void;
  children: ReactNode;
};

const AccordionSection = ({
  id,
  label,
  openMenu,
  onToggle,
  children,
}: AccordionSectionProps) => {
  const isOpen = openMenu === id;

  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-ink transition hover:bg-brand-soft hover:text-brand focus:outline-none"
      >
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="border-t border-line pb-1">{children}</div>}
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const { user, setLanguage } = useUser();
  const navRef = useRef<HTMLElement | null>(null);
  const currentLanguage = user?.language ?? "english";
  const userData = user ?? new User();

  useEffect(() => {
    if (menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setOpenMenu(null);
    setMenuOpen(false);
  };

  const toggleMenu = (menu: OpenMenu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const closeAll = () => {
    setOpenMenu(null);
    setMenuOpen(false);
  };

  const menuItemClass =
    "block w-full px-4 py-2.5 text-left text-ink hover:bg-brand-soft hover:text-brand focus:bg-brand-soft focus:text-brand focus:outline-none";
  const navButtonClass =
    "inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-ink transition hover:bg-brand-soft hover:text-brand focus:outline-none";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center" onClick={closeAll}>
          <img className="h-auto w-16" src={geosImg} alt="GEOS logo" />
        </Link>

        <nav ref={navRef} className="hidden items-center gap-4 text-sm md:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("spr")}
              className={navButtonClass}
              aria-expanded={openMenu === "spr"}
            >
              <span>SPR</span>
              <ChevronDown size={14} className="text-muted" />
            </button>
            {openMenu === "spr" && (
              <div className="absolute left-0 z-20 mt-1 w-44 origin-top-left rounded-xl border border-line bg-white py-1 shadow-lg">
                <Link to="/spr" className={menuItemClass} onClick={closeAll}>
                  New Form
                </Link>
                <Link
                  to="/home?view=spr"
                  className={menuItemClass}
                  onClick={closeAll}
                >
                  View Forms
                </Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("levelCheck")}
              className={navButtonClass}
              aria-expanded={openMenu === "levelCheck"}
            >
              <span>Level Check</span>
              <ChevronDown size={14} className="text-muted" />
            </button>
            {openMenu === "levelCheck" && (
              <div className="absolute left-0 z-20 mt-1 w-48 origin-top-left rounded-xl border border-line bg-white py-1 shadow-lg">
                <Link to="/levelCheck" className={menuItemClass} onClick={closeAll}>
                  New Form
                </Link>
                <Link
                  to="/home?view=levelCheck"
                  className={menuItemClass}
                  onClick={closeAll}
                >
                  View Forms
                </Link>
              </div>
            )}
          </div>

          <Link className="nav-link" to="/levels" onClick={closeAll}>
            Levels
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("options")}
              className={navButtonClass}
              aria-expanded={openMenu === "options"}
            >
              <span>Options</span>
              <ChevronDown size={14} className="text-muted" />
            </button>
            {openMenu === "options" && (
              <div className="absolute left-0 z-20 mt-1 w-44 origin-top-left rounded-xl border border-line bg-white py-1 shadow-lg">
                <ExportToExcel userData={userData} className={menuItemClass} />
                <ImportFromExcel
                  userData={userData}
                  className={`${menuItemClass} cursor-pointer`}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("language")}
              className={navButtonClass}
              aria-expanded={openMenu === "language"}
              aria-haspopup="listbox"
            >
              <span className="capitalize">{currentLanguage}</span>
              <ChevronDown size={14} className="text-muted" />
            </button>
            {openMenu === "language" && (
              <div
                className="absolute right-0 z-20 mt-1 w-40 origin-top-right rounded-xl border border-line bg-white py-1 shadow-lg"
                role="listbox"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    role="option"
                    aria-selected={lang.id === currentLanguage}
                    onClick={() => handleSelectLanguage(lang.id)}
                    className={`${menuItemClass} capitalize ${
                      lang.id === currentLanguage
                        ? "bg-brand-soft font-semibold text-brand"
                        : ""
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button
          className="rounded-lg p-1.5 text-muted transition hover:bg-brand-soft hover:text-brand md:hidden"
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setOpenMenu(null);
          }}
          aria-label="Toggle menu"
          type="button"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col bg-white md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3">
              <Link to="/" className="flex items-center" onClick={closeAll}>
                <img className="h-auto w-16" src={geosImg} alt="GEOS logo" />
              </Link>
              <button
                className="rounded-lg p-1.5 text-muted transition hover:bg-brand-soft hover:text-brand"
                onClick={closeAll}
                aria-label="Close menu"
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="overflow-hidden rounded-xl border border-line divide-y divide-line">
                <AccordionSection
                  id="spr"
                  label="SPR"
                  openMenu={openMenu}
                  onToggle={toggleMenu}
                >
                  <Link to="/spr" className={menuItemClass} onClick={closeAll}>
                    New Form
                  </Link>
                  <Link to="/home?view=spr" className={menuItemClass} onClick={closeAll}>
                    View Forms
                  </Link>
                </AccordionSection>

                <AccordionSection
                  id="levelCheck"
                  label="Level Check"
                  openMenu={openMenu}
                  onToggle={toggleMenu}
                >
                  <Link to="/levelCheck" className={menuItemClass} onClick={closeAll}>
                    New Form
                  </Link>
                  <Link
                    to="/home?view=levelCheck"
                    className={menuItemClass}
                    onClick={closeAll}
                  >
                    View Forms
                  </Link>
                </AccordionSection>

                <Link
                  to="/levels"
                  onClick={closeAll}
                  className="flex min-h-11 items-center px-4 py-3 text-sm font-medium text-ink transition hover:bg-brand-soft hover:text-brand"
                >
                  Levels
                </Link>

                <AccordionSection
                  id="options"
                  label="Options"
                  openMenu={openMenu}
                  onToggle={toggleMenu}
                >
                  <ExportToExcel userData={userData} className={menuItemClass} />
                  <ImportFromExcel
                    userData={userData}
                    className={`${menuItemClass} cursor-pointer`}
                  />
                </AccordionSection>

                <AccordionSection
                  id="language"
                  label="Language"
                  openMenu={openMenu}
                  onToggle={toggleMenu}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => handleSelectLanguage(lang.id)}
                      className={`${menuItemClass} capitalize ${
                        lang.id === currentLanguage
                          ? "bg-brand-soft font-semibold text-brand"
                          : ""
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </AccordionSection>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Header;

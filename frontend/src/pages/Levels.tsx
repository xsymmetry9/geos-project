import { useUser } from "@/context/UserContext";
import { useState, useEffect, useRef } from "react";
import { Language, Aspect } from "@/utils/common";
import PlotTableLevelChecks from "@/components/PlotTableLevelChecks";

type LevelItem = { level: string; description: string };
type LevelInfo = Partial<Record<Aspect, LevelItem[]>>;

type PlotLevelProps = {
  levelInfo: LevelInfo;
  language: Language;
  setLanguage: (lang: Language) => void;
};

const categories: Aspect[] = [
  "vocabulary",
  "grammar",
  "listening",
  "conversation",
  "pronunciation",
];

const languageOptions = ["english", "chinese", "japanese", "korean"] as Language[];

const PlotLevel = ({ levelInfo, language, setLanguage }: PlotLevelProps) => {
  const [menu, setMenu] = useState<"levels" | "spr">("levels");
  const [openLanguage, setOpenLanguage] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleLanguage = () => {
    setOpenLanguage((prev) => !prev);
    setOpenMenu(false);
  }

  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
    setOpenLanguage(false);
  }

  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenLanguage(false);
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentViewLabel = menu === "levels" ? "Level Checks" : "SPR";
  // Max rows across all categories
  const maxLen = Math.max(0, ...categories.map((c) => levelInfo?.[c]?.length ?? 0));

  // Pick the first category that actually has data to label the "Levels" column
  const firstWithData = categories.find((c) => (levelInfo?.[c]?.length ?? 0) > 0);
  const levelLabels: string[] =
    (firstWithData && levelInfo[firstWithData]?.map((x) => x.level)) ??
    Array.from({ length: maxLen }, (_, i) => `${i + 1}`);

  return (
    <>
      <div className="bg-green-50">
        <nav ref={navRef} className="max-w-[900px] w-full mx-auto p-4 flex items-center gap-6">
          <ul className="flex items-center gap-6">
            <li className="relative">
              <button type="button"
                onClick={handleLanguage}
                className="inline-flex items-center gap-1 text-gray-800 hover:text-emerald-700 focus:outline-none">
                <span className="capitalize">{language}</span>
                <span className="text-xs text-gray-400">▼</span>
              </button>
              {openLanguage && (
                <div className="absolute mt-2 z-20 w-40 max-w-[calc(100vw-1rem)] left-24 sm:right-4 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 ">
                  <div className="py-1 text-sm">
                    {languageOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setLanguage(opt);
                          setOpenLanguage(false);
                        }}
                        className="block w-full px-4 py-2 text-left capitalize text-gray-700 hover:bg-green-50 hover:text-emerald-800 focus:bg-green-50 focus:text-emerald-800 focus:outline-none">{opt}</button>
                    ))}
                  </div>
                </div>
              )}
            </li>
          </ul>
          <ul className="flex items-center gap-6" id="menu-dropdown">
            <li className="relative">
              <button type="button"
                onClick={handleMenu}
                className="inline-flex items-center gap-1 text-gray-800 hover:text-emerald-700 focus:outline-none">
                <span className="capitalize">{menu}</span>
                <span className="text-xs text-gray-400">▼</span>
              </button>
              {openMenu && (
                <div className="absolute mt-2 z-20 w-40 max-w-[calc(100vw-1rem)] left-16 sm:right-4 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                  <div className="py-1 text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setMenu("spr")
                        setOpenLanguage(false);
                        setOpenMenu(false);
                      }}
                      className="block w-full px-4 py-2 text-left capitalize text-gray-700 hover:bg-green-50 hover:text-emerald-800 focus:bg-green-50 focus:text-emerald-800 focus:outline-none"
                      >
                      SPR
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenu("levels");
                        setOpenLanguage(false);
                        setOpenMenu(false);
                      }}
                      className="block w-full px-4 py-2 text-left capitalize text-gray-700 hover:bg-green-50 hover:text-emerald-800 focus:bg-green-50 focus:text-emerald-800 focus:outline-none">Level Check</button>

                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav >
      </div >

      <div className="container mx-auto">
        {menu === "spr" && (
          <>
            <table className="my-6 w-full px-2 text-sm shadow-sm p-2" role="table">
              <thead>
                <tr>
                  {/* define header and data colors per column (Levels + categories) */}
                  {(() => {
                    // single header color and two alternating data colors
                    const headerClass = "bg-teal-700 text-white";

                    return (
                      <>
                        <th className={`sticky top-0 z-10 p-3 uppercase ${headerClass}`}>Levels</th>
                        {categories.map((cat, i) => {
                          return (
                            <th
                              key={cat}
                              className={`sticky top-0 z-10 p-3 uppercase ${headerClass}`}
                            >
                              {" "}
                              {cat}{" "}
                            </th>
                          );
                        })}
                      </>
                    );
                  })()}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: maxLen }).map((_, idx) => (
                  <tr key={levelLabels[idx] ?? idx}>
                    {(() => {
                      const dataClasses = ["bg-teal-50", "bg-white"]; // alternate

                      return (
                        <>
                          <td className={`p-3 text-center ${dataClasses[0]}`}>
                            {levelLabels[idx] ?? idx + 1}
                          </td>
                          {categories.map((cat, i) => {
                            const cell = levelInfo?.[cat]?.[idx];
                            const color = dataClasses[(i + 1) % dataClasses.length];
                            return (
                              <td key={`${cat}-${idx}`} className={`p-3 align-top ${color}`}>
                                {cell?.description ?? "—"}
                              </td>
                            );
                          })}
                        </>
                      );
                    })()}
                  </tr>
                ))}
                {maxLen === 0 && (
                  <tr>
                    <td className="p-3 text-center" colSpan={1 + categories.length}>
                      No levels found for this language.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
        {menu === "levels" && <PlotTableLevelChecks language={language} />}
        {/* color-coded columns, no borders for table */}
      </div>
    </>
  );
};

const Levels = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<Language>((user?.language as Language) || "english");
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const module = await import("@/assets/other/levelInformation.json");
        const data: any = (module as any).default ?? module;

        if (!data || typeof data !== "object") {
          if (!cancelled) setError("Invalid level information data.");
          return;
        }

        const byLang: LevelInfo = data?.[language] ?? data?.english ?? {};
        if (!cancelled) setLevelInfo(byLang);
      } catch (e) {
        if (!cancelled) setError("Error loading the file.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadData();
    return () => {
      cancelled = true;
    };
  }, [language]);

  if (loading) return <p>Loading …</p>;
  if (error) return <p>{error}</p>;
  if (!levelInfo) return <p>No data available.</p>;

  return <PlotLevel levelInfo={levelInfo} language={language} setLanguage={setLanguage} />;
};

export default Levels;

import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
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
        <nav className="max-w-[1100px] w-full mx-auto px-2 flex items-center gap-4">
          <div id="language-nav" className="flex bg-green-50 items-center justify-center my-4 gap-2">
            <label htmlFor="lang" className="text-sm font-medium">
              Language:
            </label>
            <select
              id="lang"
              className="rounded border px-2 py-1 capitalize"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
            >
              {languageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div id="" className="my-2 flex items-center gap-2">
            <label htmlFor="menu-nav" className="text-sm font-medium">
              Menu:
            </label>
            <select
              id="menu-nav"
              className="rounded border px-2 py-1"
              onChange={(e) => {
                setMenu(e.target.value as "levels" | "spr");
              }}
            >
              <option value="levels">Level Checks</option>
              <option value="spr">Student Progress Reports</option>
            </select>
          </div>
        </nav>
      </div>

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

import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { Language, Aspect } from "@/utils/common";

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
  // Max rows across all categories
  const maxLen = Math.max(0, ...categories.map((c) => levelInfo?.[c]?.length ?? 0));

  // Pick the first category that actually has data to label the "Levels" column
  const firstWithData = categories.find((c) => (levelInfo?.[c]?.length ?? 0) > 0);
  const levelLabels: string[] =
    (firstWithData && levelInfo[firstWithData]?.map((x) => x.level)) ??
    Array.from({ length: maxLen }, (_, i) => `${i + 1}`);

  return (
    <>
      <div id="language-nav" className="flex items-center gap-2 my-2">
        <label htmlFor="lang" className="text-sm font-medium">
          Language:
        </label>
        <select
          id="lang"
          className="border rounded px-2 py-1"
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

      <table className="p-2 my-6 border border-slate-600 border-collapse w-full text-sm shadow" role="table">
        <thead>
          <tr>
            <th className="p-2 capitalize text-center border border-slate-600">Levels</th>
            {categories.map((cat) => (
              <th key={cat} className="p-2 capitalize text-center border border-slate-600">
                {cat}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxLen }).map((_, idx) => (
            <tr key={levelLabels[idx] ?? idx}>
              <td className="p-2 text-center border border-slate-600">
                {levelLabels[idx] ?? idx + 1}
              </td>
              {categories.map((cat) => {
                const cell = levelInfo?.[cat]?.[idx];
                return (
                  <td key={`${cat}-${idx}`} className="border border-slate-600 p-2 align-top">
                    {cell?.description ?? "—"}
                  </td>
                );
              })}
            </tr>
          ))}
          {maxLen === 0 && (
            <tr>
              <td className="p-2 text-center border border-slate-600" colSpan={1 + categories.length}>
                No levels found for this language.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { Language, Aspect } from "@/utils/common";
import PlotTableLevelChecks from "@/components/PlotTableLevelChecks";
import LevelsFilterSelect from "@/components/LevelsFilterSelect";

type LevelItem = { level: string; description: string };
type LevelInfo = Partial<Record<Aspect, LevelItem[]>>;
type ViewMode = "levelCheck" | "spr";

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

const languageOptions = [
  { value: "english", label: "English" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
];

const aspectOptions = categories.map((cat) => ({
  value: cat,
  label: cat,
}));

const SprMobileCards = ({
  levelInfo,
  levelLabels,
  maxLen,
}: {
  levelInfo: LevelInfo;
  levelLabels: string[];
  maxLen: number;
}) => {
  const [aspect, setAspect] = useState<Aspect>(categories[0]);
  const items = levelInfo?.[aspect] ?? [];

  return (
    <div className="flex flex-col gap-4 md:hidden">
      <LevelsFilterSelect
        id="spr_aspect_mobile"
        label="Aspect"
        value={aspect}
        options={aspectOptions}
        onChange={(value) => setAspect(value as Aspect)}
        capitalizeOptions
      />

      {maxLen === 0 ? (
        <p className="rounded-xl border border-line bg-white p-8 text-center text-muted">
          No levels found for this language.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {Array.from({ length: maxLen }).map((_, idx) => {
            const label = levelLabels[idx] ?? `${idx + 1}`;
            const description = items[idx]?.description ?? "—";

            return (
              <article
                key={`${aspect}-${label}`}
                className="rounded-xl border border-line bg-white p-4"
              >
                <div className="mb-2 inline-flex rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white">
                  {label}
                </div>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SprDesktopTable = ({
  levelInfo,
  levelLabels,
  maxLen,
}: {
  levelInfo: LevelInfo;
  levelLabels: string[];
  maxLen: number;
}) => (
  <div className="hidden overflow-hidden rounded-xl border border-line md:block">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] table-fixed text-sm" role="table">
        <thead>
          <tr className="bg-brand font-semibold text-white">
            <th className="sticky top-0 z-10 p-3 text-center text-xs tracking-wide uppercase">
              Levels
            </th>
            {categories.map((cat) => (
              <th
                key={cat}
                className="sticky top-0 z-10 p-3 text-center text-xs tracking-wide uppercase"
              >
                {cat}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxLen }).map((_, idx) => (
            <tr
              key={levelLabels[idx] ?? idx}
              className="border-b border-line odd:bg-white even:bg-brand-soft/40"
            >
              <td className="p-3 text-center align-middle font-medium text-ink">
                {levelLabels[idx] ?? idx + 1}
              </td>
              {categories.map((cat) => {
                const cell = levelInfo?.[cat]?.[idx];
                return (
                  <td key={`${cat}-${idx}`} className="p-3 align-top text-muted">
                    {cell?.description ?? "—"}
                  </td>
                );
              })}
            </tr>
          ))}
          {maxLen === 0 && (
            <tr>
              <td className="p-8 text-center text-muted" colSpan={1 + categories.length}>
                No levels found for this language.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const PlotLevel = ({ levelInfo, language, setLanguage }: PlotLevelProps) => {
  const [view, setView] = useState<ViewMode>("levelCheck");

  const maxLen = Math.max(0, ...categories.map((c) => levelInfo?.[c]?.length ?? 0));
  const firstWithData = categories.find((c) => (levelInfo?.[c]?.length ?? 0) > 0);
  const levelLabels: string[] =
    (firstWithData && levelInfo[firstWithData]?.map((x) => x.level)) ??
    Array.from({ length: maxLen }, (_, i) => `${i + 1}`);

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-6 md:py-8">
      <div className="mx-auto mb-4 w-full max-w-[1100px] shrink-0 text-center md:mb-6">
        <h2 className="font-secondary text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Level Reference
        </h2>
        <p className="mt-2 text-sm text-muted">
          Browse SPR and Level Check descriptors by language
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[1100px] min-h-0 flex-1 flex-col">
        <div className="panel flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-20 flex shrink-0 flex-col gap-3 border-b border-line bg-brand-soft/40 px-4 py-3 sm:flex-row sm:items-end sm:justify-between sm:px-5">
            <div className="w-full sm:w-auto">
              <span className="mb-1.5 block text-sm font-medium text-muted">View</span>
              <div
                className="flex w-full rounded-xl border border-line bg-white p-1 sm:w-auto"
                role="tablist"
                aria-label="Reference type"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={view === "levelCheck"}
                  onClick={() => setView("levelCheck")}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:flex-none ${
                    view === "levelCheck"
                      ? "bg-brand text-white shadow-sm"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  Level Check
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={view === "spr"}
                  onClick={() => setView("spr")}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:flex-none ${
                    view === "spr"
                      ? "bg-brand text-white shadow-sm"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  SPR
                </button>
              </div>
            </div>

            <LevelsFilterSelect
              id="levels_language"
              label="Language"
              value={language}
              options={languageOptions}
              onChange={(value) => setLanguage(value as Language)}
              className="w-full sm:w-44"
            />
          </div>

          <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-4">
            {view === "spr" ? (
              <>
                <SprMobileCards
                  levelInfo={levelInfo}
                  levelLabels={levelLabels}
                  maxLen={maxLen}
                />
                <SprDesktopTable
                  levelInfo={levelInfo}
                  levelLabels={levelLabels}
                  maxLen={maxLen}
                />
              </>
            ) : (
              <PlotTableLevelChecks language={language} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Levels = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
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
      } catch {
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

  if (loading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center px-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!levelInfo) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <p className="text-muted">No data available.</p>
      </div>
    );
  }

  return <PlotLevel levelInfo={levelInfo} language={language} setLanguage={setLanguage} />;
};

export default Levels;

import { useMemo, useState, FC, useEffect } from "react";
import chineseLevelCheck from "@/assets/other/chinese/levelCheck.json";
import englishLevelCheck from "@/assets/other/english/levelCheck.json";
import japaneseLevelCheck from "@/assets/other/japanese/levelCheck.json";
import koreanLevelCheck from "@/assets/other/korean/levelCheck.json";
import LevelsFilterSelect from "@/components/LevelsFilterSelect";

type LangKey = "english" | "chinese" | "japanese" | "korean";

type LevelEntry = {
  strength?: string[];
  weakness?: string[];
  weaknesses?: string[];
  [k: string]: any;
};

type CategoryData = Record<string, LevelEntry>;

type Props = {
  language?: LangKey | string;
};

const languageMap: Record<string, any> = {
  english: englishLevelCheck,
  chinese: chineseLevelCheck,
  japanese: japaneseLevelCheck,
  korean: koreanLevelCheck,
};

const CJK_CATEGORIES = [
  "speaking",
  "listening",
  "vocabulary",
  "grammar",
  "pronunciation",
  "accuracy",
];

const AVAILABLE_CATEGORIES = [
  "speaking",
  "confidence",
  "vocabulary",
  "grammar",
  "listening",
  "conversation",
  "pronunciation",
];

const BulletList = ({ items }: { items: string[] }) => {
  if (items.length === 0) {
    return <span className="text-muted">—</span>;
  }

  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};

const BandRow: FC<{ band: string; entry: LevelEntry }> = ({ band, entry }) => {
  const strengths = entry?.strength ?? [];
  const weaknesses = entry?.weakness ?? entry?.weaknesses ?? [];

  return (
    <tr className="border-b border-line transition-colors duration-150 odd:bg-white even:bg-brand-soft/40 hover:bg-brand-soft">
      <td className="p-3 text-center align-middle text-sm font-semibold text-ink">{band}</td>
      <td className="max-w-[320px] p-3 text-left align-top break-words">
        <BulletList items={strengths} />
      </td>
      <td className="max-w-[320px] p-3 text-left align-top break-words">
        <BulletList items={weaknesses} />
      </td>
    </tr>
  );
};

const BandCard: FC<{ band: string; entry: LevelEntry }> = ({ band, entry }) => {
  const strengths = entry?.strength ?? [];
  const weaknesses = entry?.weakness ?? entry?.weaknesses ?? [];

  return (
    <article className="rounded-xl border border-line bg-white p-4">
      <div className="mb-3 inline-flex rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white">
        {band}
      </div>
      <div className="space-y-3">
        <section>
          <h4 className="mb-1.5 text-xs font-semibold tracking-wide text-brand uppercase">
            Strength
          </h4>
          <BulletList items={strengths} />
        </section>
        <section>
          <h4 className="mb-1.5 text-xs font-semibold tracking-wide text-brand uppercase">
            Weakness
          </h4>
          <BulletList items={weaknesses} />
        </section>
      </div>
    </article>
  );
};

const PlotTableLevelChecks: FC<Props> = ({ language = "english" }) => {
  const categories = language === "english" ? AVAILABLE_CATEGORIES : CJK_CATEGORIES;
  const [category, setCategory] = useState<string>(categories[0] ?? "vocabulary");

  useEffect(() => {
    const nextCategories = language === "english" ? AVAILABLE_CATEGORIES : CJK_CATEGORIES;
    if (!nextCategories.includes(category)) {
      setCategory(nextCategories[0] ?? "vocabulary");
    }
  }, [language, category]);

  const data = useMemo(() => {
    return (languageMap[language as string] ?? englishLevelCheck) as Record<string, any>;
  }, [language]);

  const categoryData = useMemo<CategoryData>(
    () => (data?.[category] ?? {}) as CategoryData,
    [data, category]
  );
  const bands = useMemo(() => Object.keys(categoryData), [categoryData]);

  const categoryOptions = categories.map((c) => ({ value: c, label: c }));

  return (
    <div className="flex w-full flex-col gap-4">
      <LevelsFilterSelect
        id="category_nav"
        label="Category"
        value={category}
        options={categoryOptions}
        onChange={setCategory}
        capitalizeOptions
        className="w-full md:max-w-xs"
      />

      {bands.length === 0 ? (
        <p className="rounded-xl border border-line bg-white p-8 text-center text-muted">
          No data for category "{category}".
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-3 md:hidden">
            {bands.map((band) => (
              <BandCard key={band} band={band} entry={categoryData[band] ?? {}} />
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-xl border border-line md:block">
            <div className="overflow-x-auto">
              <table className="w-full" role="table">
                <colgroup>
                  <col style={{ width: "110px" }} />
                  <col style={{ width: "45%" }} />
                  <col style={{ width: "45%" }} />
                </colgroup>
                <thead>
                  <tr className="bg-brand font-semibold text-white">
                    <th className="p-3 text-center text-sm tracking-wide uppercase">Level</th>
                    <th className="p-3 text-center text-sm tracking-wide uppercase">Strength</th>
                    <th className="p-3 text-center text-sm tracking-wide uppercase">Weakness</th>
                  </tr>
                </thead>
                <tbody>
                  {bands.map((band) => (
                    <BandRow key={band} band={band} entry={categoryData[band] ?? {}} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlotTableLevelChecks;

import { useEffect, useMemo, useState } from "react";
import { SquareX, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllLevelsInformationByAspect } from "@/utils/functions";
import labelText from "@/assets/other/labelText.json";
import { Levels, Student } from "@/type/Student";

type Language = keyof typeof labelText;
type LevelKey = keyof Levels;
type AspectName = keyof Student["levels"];

type LevelDetail = {
  level: string;
  description: string;
};

interface LanguageAspectProps {
  inputData: {
    levels: {
      [key in AspectName]: Levels;
    };
  };
  inputError: Record<string, boolean>;
  aspectName: AspectName;
  handleLevelInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  language: Language;
}

const LevelColumn: React.FC<{
  level?: string;
  description?: string;
  highlight?: boolean;
  emptyLabel?: string;
  levelLabelTemplate: string;
}> = ({ level, description, highlight = false, emptyLabel = "", levelLabelTemplate }) => {
  const isEmpty = !level && !description;

  return (
    <div
      className={`flex min-h-[12rem] flex-col rounded-xl border p-4 ${
        highlight ? "border-brand bg-brand-soft shadow-sm" : "border-line bg-white"
      }`}
    >
      {isEmpty ? (
        <p className="m-auto text-sm text-muted">{emptyLabel}</p>
      ) : (
        <>
          <p className={`mb-2 text-sm font-bold ${highlight ? "text-brand-dark" : "text-ink"}`}>
            {levelLabelTemplate.replace("{level}", String(level))}
          </p>
          <p className="text-sm leading-relaxed text-ink">{description}</p>
        </>
      )}
    </div>
  );
};

const LanguageAspect: React.FC<LanguageAspectProps> = ({
  inputData,
  aspectName,
  handleLevelInput,
  language,
}) => {
  const [activeHelp, setActiveHelp] = useState<LevelKey | null>(null);
  const [viewIndex, setViewIndex] = useState<number>(0);
  const form = labelText[language].form;
  const spr = labelText[language].SPR;

  const closeHelp = () => setActiveHelp(null);

  const levels = useMemo(
    () => getAllLevelsInformationByAspect({ name: aspectName, lang: language }),
    [aspectName, language]
  );

  const openHelp = (itemName: LevelKey) => {
    const selected = inputData.levels[aspectName][itemName];
    const index = levels.findIndex((item) => item.level === selected);
    setViewIndex(index >= 0 ? index : 0);
    setActiveHelp(itemName);
  };

  const canGoPrev = viewIndex > 0;
  const canGoNext = viewIndex < levels.length - 1;

  const goPrev = () => {
    if (!canGoPrev) return;
    setViewIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (!canGoNext) return;
    setViewIndex((prev) => prev + 1);
  };

  const helpColumns = useMemo(() => {
    if (!activeHelp || levels.length === 0) return null;

    const current = levels[viewIndex] ?? null;
    const prev = viewIndex > 0 ? levels[viewIndex - 1] : null;
    const next = viewIndex < levels.length - 1 ? levels[viewIndex + 1] : null;

    return {
      prev: prev as LevelDetail | null,
      current: current as LevelDetail | null,
      next: next as LevelDetail | null,
    };
  }, [activeHelp, levels, viewIndex]);

  useEffect(() => {
    if (!activeHelp) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeHelp();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeHelp, canGoPrev, canGoNext, viewIndex]);

  const PlotSelectOptionLevel: React.FC<{
    itemName: LevelKey;
    aspectName: AspectName;
  }> = ({ itemName, aspectName }) => {
    return (
      <div className="form-label">
        <div className="flex w-full items-center justify-between gap-2">
          <span className="form-label-text">{spr[itemName]}</span>
          <button
            type="button"
            className="cursor-pointer rounded p-0.5 text-brand hover:text-brand-dark"
            onClick={() => openHelp(itemName)}
            aria-label="Show level help"
          >
            <Info width={18} />
          </button>
        </div>

        <label htmlFor={`${aspectName}-${itemName}`}>
          <select
            className="form-field"
            name={`${aspectName}-${itemName}`}
            id={`${aspectName}-${itemName}`}
            value={inputData.levels[aspectName][itemName]}
            onChange={handleLevelInput}
          >
            <option value="select_score">{form.select_score}</option>
            {levels.map((item_Value, index) => (
              <option key={`${aspectName}-${itemName}-${index}`} value={item_Value.level}>
                {item_Value.level}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  };

  const formSelectedLevel = activeHelp ? inputData.levels[aspectName][activeHelp] : "";
  const isViewingFormSelection =
    !!helpColumns?.current && helpColumns.current.level === formSelectedLevel;

  return (
    <div className="form-aspect">
      <h3 className="form-aspect-title">{spr[aspectName]}</h3>
      <div className="form-aspect-fields">
        {(["initial", "target", "final"] as LevelKey[]).map((item) => (
          <PlotSelectOptionLevel key={item} itemName={item} aspectName={aspectName} />
        ))}
      </div>

      {activeHelp && helpColumns && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={closeHelp} />
          <div
            className="panel absolute top-1/2 left-1/2 z-10 max-h-[min(90vh,40rem)] w-[min(100%-1.5rem,56rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${aspectName}-${activeHelp}-help-title`}
          >
            <div className="flex w-full items-center justify-between bg-brand px-3 py-2">
              <p
                id={`${aspectName}-${activeHelp}-help-title`}
                className="text-sm font-semibold capitalize text-white"
              >
                {spr[aspectName]} · {spr[activeHelp]}
              </p>
              <button
                type="button"
                className="cursor-pointer rounded p-1 hover:bg-white/10"
                onClick={closeHelp}
                aria-label="Close"
              >
                <SquareX className="text-white" size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  className="form-nav-btn form-nav-btn-back !min-h-9 !px-3 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={goPrev}
                  disabled={!canGoPrev}
                  aria-label="Previous level"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>

                <p className="text-center text-sm font-semibold text-ink">
                  {helpColumns.current
                    ? form.level_label.replace("{level}", helpColumns.current.level)
                    : form.choose_score}
                  {isViewingFormSelection && (
                    <span className="mt-0.5 block text-xs font-medium text-brand">
                      {form.form_selection}
                    </span>
                  )}
                </p>

                <button
                  type="button"
                  className="form-nav-btn form-nav-btn-next !min-h-9 !px-3 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={goNext}
                  disabled={!canGoNext}
                  aria-label="Next level"
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>

              <div className="mb-3 hidden grid-cols-3 gap-2 text-center text-xs font-semibold tracking-wide text-muted uppercase md:grid">
                <span>{form.lower}</span>
                <span className="text-brand-dark">{form.current}</span>
                <span>{form.higher}</span>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-wide text-muted uppercase md:hidden">
                    {form.lower}
                  </span>
                  <LevelColumn
                    level={helpColumns.prev?.level}
                    description={helpColumns.prev?.description}
                    levelLabelTemplate={form.level_label}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-wide text-brand-dark uppercase md:hidden">
                    {form.current}
                  </span>
                  <LevelColumn
                    level={helpColumns.current?.level}
                    description={helpColumns.current?.description}
                    highlight
                    emptyLabel={form.choose_score}
                    levelLabelTemplate={form.level_label}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-wide text-muted uppercase md:hidden">
                    {form.higher}
                  </span>
                  <LevelColumn
                    level={helpColumns.next?.level}
                    description={helpColumns.next?.description}
                    levelLabelTemplate={form.level_label}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageAspect;

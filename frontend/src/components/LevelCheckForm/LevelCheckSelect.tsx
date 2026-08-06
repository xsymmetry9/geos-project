import React, { useState, useEffect, useMemo } from "react";
import { EnglishEntry, CjkEntry, StrengthAndWeakness } from "@/type/LevelCheckForm";
import levelInformation from "@/assets/other/legend.json";
import { formatNum } from "@/components/PrintComponents/Legend";
import { levelCheckFormTranslation } from "@/utils/translation";
import { tLevelCheckData } from "@/utils/tLevelCheckData";

type EnglishKey = keyof Pick<
  EnglishEntry,
  "speaking" | "confidence" | "grammar" | "vocabulary" | "listening" | "pronunciation"
>;

type CjkKey = keyof Pick<
  CjkEntry,
  "pronunciation" | "vocabulary" | "listening" | "grammar" | "speaking" | "accuracy"
>;

type Props = {
  item: EnglishKey | CjkKey;
  inputData: EnglishEntry | CjkEntry;
  setInputData: React.Dispatch<React.SetStateAction<EnglishEntry | CjkEntry>>;
};
const scoreRange = (level: string): [number, number] => {
  switch (level) {
    case "Pre-A1":
      return [0, 1.9];
    case "A1":
      return [2, 2.9];
    case "A1 - A2":
      return [3, 3.9];
    case "A2":
      return [4, 4.9];
    case "A2 - B1":
      return [5, 5.9];
    case "B1":
      return [6, 6.9];
    case "B1 - B2":
      return [7, 7.9];
    case "B2":
      return [8, 8.9];
    case "C1":
      return [9, 9.4];
    case "C1+":
      return [9.5, 10.4];
    default:
      return [0, 1.9];
  }
};

const getScoreOptions = (level: string) => {
  const [min, max] = scoreRange(level);
  const options: JSX.Element[] = [];

  const start = Math.round(min * 2);
  const end = Math.floor(max * 2);

  for (let i = start; i <= end; i++) {
    const value = (i / 2).toFixed(1);

    options.push(
      <option key={value} value={value}>
        {value}
      </option>
    );
  }

  return options;
};


const mapScoreToBand = (score: number): "A1-A2" | "B1-B2" | "C1-C2" => {
  if (score >= 0 && score <= 5) return "A1-A2";
  if (score > 5 && score < 9) return "B1-B2";
  return "C1-C2";
};

const cjkScoreToBand = (score: number): "0" | "A1-A2" | "B1-B2" | "C1-C2" => {
  if (score >= 0 && score < 1) return "0";
  if (score >= 1 && score < 3) return "A1-A2";
  if (score >= 3 && score < 5) return "B1-B2";
  return "C1-C2";
};

export const LevelCheckSelect = ({ item, inputData, setInputData }: Props) => {

  const levelCheckData = useMemo(() => tLevelCheckData(inputData.language), [inputData.language]);

const [level, setLevel] = useState<string>("");
const [score, setScore] = useState<number | undefined>(undefined);
    const [scoreError, setScoreError] = useState<string>("");
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [selectedWeaknesses, setSelectedWeaknesses] = useState<string[]>([]);
  const [customStrengthInput, setCustomStrengthInput] = useState<string>("");
  const [customWeaknessInput, setCustomWeaknessInput] = useState<string>("");

  const text = levelCheckFormTranslation(inputData.language);

  const currentBand = score !== undefined && score !== "" ? mapScoreToBand(score) : level;

  const predefinedStrengths =
    currentBand && levelCheckData[item]?.[currentBand]?.strength
      ? levelCheckData[item][currentBand].strength
      : [];

  const predefinedWeaknesses =
    currentBand && levelCheckData[item]?.[currentBand]?.weakness
      ? levelCheckData[item][currentBand].weakness
      : [];

  const allStrengths = [
    ...predefinedStrengths,
    ...selectedStrengths.filter((s) => !predefinedStrengths.includes(s)),
  ];
  const allWeaknesses = [
    ...predefinedWeaknesses,
    ...selectedWeaknesses.filter((w) => !predefinedWeaknesses.includes(w)),
  ];
  const maxStrengthsReached = selectedStrengths.length >= 3;
  const maxWeaknessesReached = selectedWeaknesses.length >= 3;

  const isScoreValid = level && score !== undefined && scoreError === "";

const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newLevel = e.target.value;
  setLevel(newLevel);
  setScore(undefined);
  setScoreError("");
  setSelectedStrengths([]);
  setSelectedWeaknesses([]);

  setInputData((prev) => ({
    ...prev,
    [item]: {
      ...prev[item],
      level_name: newLevel,
      score: undefined,
      strength: [],
      weakness: [],
    },
  }));
};

  const handleScoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputScore = e.target.value;
    setScore(inputScore === "" ? undefined : parseFloat(inputScore));
  };

  useEffect(() => {
    if (score !== undefined && score !== "" && level) {
      const [min, max] = scoreRange(level);
      if (score < min || score > max) {
        setScoreError(
          `Score for ${level} must be between ${min.toFixed(1)} and ${max.toFixed(1)}.`
        );
      } else {
        setScoreError("");
      }
    }
  }, [score, level]);

  const toggleSelection = (
    value: string,
    currentList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : prev.length < 3
          ? [...prev, value]
          : prev
    );
  };

  const handleCustomAdd = (
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    selectedList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    predefined: string[]
  ) => {
    const trimmed = input.trim();
    if (
      trimmed &&
      !selectedList.includes(trimmed) &&
      !predefined.includes(trimmed) &&
      selectedList.length < 3
    ) {
      setter([...selectedList, trimmed]);
      setInput("");
    }
  };

  useEffect(() => {
    const current = inputData[item];
    setLevel((current.level_name || "") as "A1-A2" | "B1-B2" | "C1-C2" | "");
    setScore(current.score);
    setSelectedStrengths(current.strength || []);
    setSelectedWeaknesses(current.weakness || []);
  }, [inputData, item]);

  useEffect(() => {
    if (
      level &&
      selectedStrengths.length >= 2 &&
      selectedWeaknesses.length >= 2 &&
      score !== undefined &&
      !scoreError
    ) {
      const updated: StrengthAndWeakness = {
        level_name: level,
        score: score,
        strength: selectedStrengths,
        weakness: selectedWeaknesses,
      };
      setInputData((prev) => ({
        ...prev,
        [item]: updated,
      }));
    }

    if (level && score !== undefined && !scoreError) {
      const updated: StrengthAndWeakness = {
        level_name: level,
        score,
        strength: selectedStrengths,
        weakness: selectedWeaknesses
      };

      setInputData((prev) => ({ ...prev, [item]: updated }));
    }
  }, [level, score, selectedStrengths, selectedWeaknesses, scoreError]);

  const arrOfLevels = () => {
    if (inputData.language === "english") {
      return levelInformation.english;
    } else if (inputData.language === "japanese" || inputData.language === "korean" || inputData.language === "chinese") {
      return levelInformation[inputData.language];
    } else {
      return null;
    }
  };

  return (
    <div className="form-aspect level-check-aspect">
      <h3 className="form-aspect-title">{text.category[item]}</h3>
      <div className="form-aspect-fields level-check-aspect-fields">
        <div className="level-check-score-row">
          <label className="form-label" htmlFor={`${item}_level`}>
            <span className="form-label-text">{text.dropdownLevelInstruction}</span>
            <select
              id={`${item}_level`}
              value={level}
              onChange={handleLevelChange}
              className="form-field"
            >
              <option value="">{text.dropdownLevelInstruction}</option>
              {arrOfLevels() !== null &&
                arrOfLevels()!.map((lvl) => (
                  <option key={lvl.name} value={lvl.name}>
                    {`${lvl.name}: ${formatNum(lvl.score)} `}
                  </option>
                ))}
            </select>
          </label>

          <label className="form-label" htmlFor={`${item}_score`}>
            <span className="form-label-text">{text.instructionScore}</span>
            <select
              name="score"
              value={score !== undefined ? score.toFixed(1) : ""}
              id={`${item}_score`}
              onChange={handleScoreChange}
              className="form-field"
              disabled={!level}
            >
              <option value="">{text.placeholderScore}</option>
              {level && getScoreOptions(level)}
            </select>
            {scoreError && <p className="form-error">{scoreError}</p>}
          </label>
        </div>

        {isScoreValid && (
          <div className="level-check-sw-grid">
            <div className="level-check-sw-col">
              <p className="form-label-text">{text.levelInstructionStrength}</p>
              <div className="level-check-add-row">
                <input
                  type="text"
                  placeholder={text.addCustomStrength}
                  value={customStrengthInput}
                  onChange={(e) => setCustomStrengthInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                      handleCustomAdd(
                        customStrengthInput,
                        setCustomStrengthInput,
                        selectedStrengths,
                        setSelectedStrengths,
                        predefinedStrengths
                      ))
                  }
                  className="form-field"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleCustomAdd(
                      customStrengthInput,
                      setCustomStrengthInput,
                      selectedStrengths,
                      setSelectedStrengths,
                      predefinedStrengths
                    )
                  }
                  className="level-check-add-btn"
                  disabled={maxStrengthsReached || !customStrengthInput.trim()}
                >
                  +
                </button>
              </div>
              <div className="level-check-checklist">
                {allStrengths.map((str, idx) => (
                  <label key={idx} className="level-check-check-item">
                    <input
                      type="checkbox"
                      checked={selectedStrengths.includes(str)}
                      onChange={() => toggleSelection(str, selectedStrengths, setSelectedStrengths)}
                      disabled={!selectedStrengths.includes(str) && maxStrengthsReached}
                    />
                    <span>{str}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="level-check-sw-col">
              <p className="form-label-text">{text.levelInstructionWeakness}</p>
              <div className="level-check-add-row">
                <input
                  type="text"
                  placeholder={text.addCustomWeakness}
                  value={customWeaknessInput}
                  onChange={(e) => setCustomWeaknessInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                      handleCustomAdd(
                        customWeaknessInput,
                        setCustomWeaknessInput,
                        selectedWeaknesses,
                        setSelectedWeaknesses,
                        predefinedWeaknesses
                      ))
                  }
                  className="form-field"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleCustomAdd(
                      customWeaknessInput,
                      setCustomWeaknessInput,
                      selectedWeaknesses,
                      setSelectedWeaknesses,
                      predefinedWeaknesses
                    )
                  }
                  className="level-check-add-btn"
                  disabled={maxWeaknessesReached || !customWeaknessInput.trim()}
                >
                  +
                </button>
              </div>
              <div className="level-check-checklist">
                {allWeaknesses.map((wk, idx) => (
                  <label key={idx} className="level-check-check-item">
                    <input
                      type="checkbox"
                      checked={selectedWeaknesses.includes(wk)}
                      onChange={() =>
                        toggleSelection(wk, selectedWeaknesses, setSelectedWeaknesses)
                      }
                      disabled={!selectedWeaknesses.includes(wk) && maxWeaknessesReached}
                    />
                    <span>{wk}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
type LevelCheckOverallProps = {
  name: string;
  item: string;
  data: any;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
};
export const LevelCheckOverall = ({ name, data, handleChange }: LevelCheckOverallProps) => {
  const language = data.language;
  const arrOfLevels = levelInformation.english;
  const arrOfCjkLevels = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <div className="form-label">
      <span className="form-label-text">{name}</span>
      <select
        name="overallCEFR"
        id="overallCEFR"
        onChange={handleChange}
        value={data.overallCEFR}
        className="form-field"
      >
        <option value="">Select Level</option>
        {language == "english" ? (
          <>
            {arrOfLevels.map((lvl) => (
              <option key={lvl.name} value={lvl.name}>
                {lvl.name}
              </option>
            ))}
          </>
        ) : (
          <>
            {arrOfCjkLevels.map((lvl, idx) => (
              <option key={idx} value={lvl}>
                {lvl}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

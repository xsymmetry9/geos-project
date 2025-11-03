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

const scoreRange = (level: string) : [number, number] => {
  switch (level) {
  case "Pre-A1":
    return [0, 2];
  case "A1":
    return [2, 3];
  case "A1 - A2":
    return [3, 4];
  case "A2":
    return [4, 5];
  case "A2 - B1":
    return [5, 6];
  case "B1":
    return [6, 7];
  case "B1 - B2":
    return [7, 8];
  case "B2":
    return [8, 9];
  case "C1":
    return [9, 9.5];
  case "C1+":
    return [9.5, 10.5];
  default:
    return [0, 10];
  }
};

const mapScoreToBand = (score: number): "A1-A2" | "B1-B2" | "C1-C2" => {
  if (score >= 0 && score <= 5) return "A1-A2";
  if (score > 5 && score < 9) return "B1-B2";
  return "C1-C2";
};

const cjkScoreToBand = (score: number): "0" | "A1-A2" | "B1-B2" | "C1-C2" => {
  if(score >= 0 && score < 1 ) return "0";
  if(score >= 1 && score < 3) return "A1-A2";
  if(score >= 3 && score < 5) return "B1-B2";
  return "C1-C2";
};

export const LevelCheckSelect = ({ item, inputData, setInputData }: Props) => {

  const levelCheckData = useMemo(() => tLevelCheckData(inputData.language), [inputData.language]);

  const [level, setLevel] = useState<"A1-A2" | "B1-B2" | "C1-C2" | "">("");
  const [score, setScore] = useState<number| "">();
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
    const newLevel = e.target.value as "A1-A2" | "B1-B2" | "C1-C2" | "";
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

    if(level && score !== undefined && !scoreError) {
      const updated: StrengthAndWeakness = {
        level_name: level,
        score,
        strength: selectedStrengths,
        weakness: selectedWeaknesses
      };

      setInputData((prev) => ({...prev, [item]: updated}));
    }
  }, [level, score, selectedStrengths, selectedWeaknesses, scoreError]);

  const arrOfLevels = () => {
    if(inputData.language === "english"){
      return levelInformation.english;
    } else if(inputData.language === "japanese" || inputData.language === "korean" || inputData.language === "chinese") {
      return levelInformation[inputData.language];
    } else {
      return null;
    }
  };

  return (
    <section className="mt-6 min-h-[400px]">
      <label htmlFor={`${item}_level`}>
        <span className="capitalize text-md font-bold">{text.category[item]}</span>
        <select
          id={`${item}_level`}
          value={level}
          onChange={handleLevelChange}
          className="font-secondary mt-1 mb-3 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
        >
          <option value="">{text.dropdownLevelInstruction}</option>
          {arrOfLevels() !== null && arrOfLevels().map((lvl) => (
            <option key={lvl.name} value={lvl.name}>
              {`${lvl.name}: ${formatNum(lvl.score)} `}
            </option>
          ))}
        </select>
      </label>

      {level && (
        <label htmlFor={`${item}_score`}>
          <span className="text-md font-bold">{text.instructionScore}</span>
          {/* <input
            type="number"
            value={score ?? ""}
            onChange={handleScoreChange}
            className="form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]"
            id={`${item}_score`}
          /> */}
          <select
            name="score"
            value={score !== undefined && score !== "" ? score.toFixed(1) : ""}
            id={`${item}_score`}
            onChange={handleScoreChange}
            className="font-secondary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
          >
            <option
              className="font-secondary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
              value={""}
            >
              {text.placeholderScore}
            </option>
            {(() => {
              const [min, max] = scoreRange(level);
              const options = [];
              for (let i = Math.round(min * 2); i < Math.round(max * 2); i++) {
                const val = (i / 2).toFixed(1);
                options.push(
                  <option key={val} value={val}>
                    {val}
                  </option>
                );
              }
              return options;
            })()}
          </select>
          {scoreError && <p className="text-sm text-red-600">{scoreError}</p>}
        </label>
      )}

      <div className="grid grid-cols-2 gap-3">
        {isScoreValid && (
          <>
            {/* Strengths */}
            <div className="mt-6">
              <p className="font-semibold">{`${text.levelInstructionStrength}`}</p>
              <div className="mt-2 flex gap-2">
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
                  className="form-input font-secondary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
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
                  className="btn-primary disabled:opacity-50"
                  disabled={maxStrengthsReached || !customStrengthInput.trim()}
                >
                  +
                </button>
              </div>
              <div className="p-2">
                {allStrengths.map((str, idx) => (
                  <label key={idx} className="mt-1 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedStrengths.includes(str)}
                      onChange={() => toggleSelection(str, selectedStrengths, setSelectedStrengths)}
                      disabled={!selectedStrengths.includes(str) && maxStrengthsReached}
                    />
                    {str}
                  </label>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="mt-6">
              <p className="font-semibold">{text.levelInstructionWeakness} </p>
              <div className="mt-2 flex gap-2">
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
                  className="form-input font-secondary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
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
                  className="btn-primary disabled:opacity-50"
                  disabled={maxWeaknessesReached || !customWeaknessInput.trim()}
                >
                  +
                </button>
              </div>
              <div className="p-2">
                {allWeaknesses.map((wk, idx) => (
                  <label key={idx} className="mt-1 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedWeaknesses.includes(wk)}
                      onChange={() =>
                        toggleSelection(wk, selectedWeaknesses, setSelectedWeaknesses)
                      }
                      disabled={!selectedWeaknesses.includes(wk) && maxWeaknessesReached}
                    />
                    {wk}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
type LevelCheckOverallProps = {
  name: string;
  item: string;
  data: string;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
};
export const LevelCheckOverall = ({ name, data, handleChange }: LevelCheckOverallProps) => {
  const arrOfLevels = levelInformation.english;

  return (
    <div className="pb-3">
      <label className="font-bold capitalize" htmlFor="overallCEFR">
        {name + ":"}
        <select
          name="overallCEFR"
          id="overallCEFR"
          onChange={handleChange}
          value={data}
          className="font-secondary mt-1 block w-full border-0 border-b-2 border-gray-200 px-0.5 text-base font-normal text-black hover:border-[#09c5eb] focus:border-[#09c5eb] focus:ring-0 focus:outline-0"
        >
          <option className="font-normal" value={""}>
            Select Level
          </option>
          {arrOfLevels.map((lvl) => (
            <option key={lvl.name} className="font-normal" value={lvl.name}>
              {lvl.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

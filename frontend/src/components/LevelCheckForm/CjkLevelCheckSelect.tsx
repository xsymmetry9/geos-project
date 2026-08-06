import React, { useState, useEffect, useMemo } from "react";
import { CjkEntry, StrengthAndWeakness } from "@/type/LevelCheckForm";
import levelInformation from "@/assets/other/legend.json";
import { formatNum } from "@/components/PrintComponents/Legend";
import { levelCheckFormTranslation } from "@/utils/translation";
import { tLevelCheckData } from "@/utils/tLevelCheckData";
import { Language } from "@/utils/common";

type CjkKey = keyof Pick<
    CjkEntry,
    "pronunciation" | "vocabulary" | "listening" | "grammar" | "speaking" | "accuracy"
>;

type Props = {
    item: CjkKey;
    inputData: CjkEntry;
    setInputData: React.Dispatch<React.SetStateAction<CjkEntry>>;
};
const scoreRange = (level: string): [number, number] => {
    switch (level) {
        case "Pre-A1":
            return [0, 0.5];
        case "A1":
            return [1, 1.5];
        case "A2":
            return [2, 2.5];
        case "B1":
            return [3, 3.5];
        case "B2":
            return [4, 4.5];
        case "C1":
            return [5, 5.5];
        case "C2":
            return [6, 7];
        default:
            return [0, .5];
    }
};

const cjkScoreToBand = (score: number): "0" | "A1-A2" | "B1-B2" | "C1-C2" | null => {
    if (score >= 0 && score < 1) return "0";
    if (score >= 1 && score < 3) return "A1-A2";
    if (score >= 3 && score < 5) return "B1-B2";
    if (score >= 5 && score <= 7) return "C1-C2";
    return null;
};

export const CjkLevelCheckSelect = ({ item, inputData, setInputData }: Props) => {

    const levelCheckData = useMemo(() => tLevelCheckData(inputData.language as Language), [inputData.language]);

    const [level, setLevel] = useState<"A1-A2" | "B1-B2" | "C1-C2" | "">("");
    const [score, setScore] = useState<number | "">();
    const [scoreError, setScoreError] = useState<string>("");
    const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
    const [selectedWeaknesses, setSelectedWeaknesses] = useState<string[]>([]);
    const [customStrengthInput, setCustomStrengthInput] = useState<string>("");
    const [customWeaknessInput, setCustomWeaknessInput] = useState<string>("");

    const text = levelCheckFormTranslation(inputData.language);

    const currentBand = score !== undefined && score !== "" ? cjkScoreToBand(score) : level; // returns [min , max]

    const predefinedStrengths =
        levelCheckData[item]?.[currentBand]?.strength
            ? levelCheckData[item][currentBand].strength
            : [];

    const predefinedWeaknesses =
        levelCheckData[item]?.[currentBand]?.weakness
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
                            value={score !== undefined && score !== "" ? score.toFixed(1) : ""}
                            id={`${item}_score`}
                            onChange={handleScoreChange}
                            className="form-field"
                            disabled={!level}
                        >
                            <option value="">{text.placeholderScore}</option>
                            {level &&
                                (() => {
                                    const [min, max] = scoreRange(level);
                                    const options = [];
                                    for (let i = Math.round(min * 2); i <= Math.round(max * 2); i++) {
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
                                            onChange={() =>
                                                toggleSelection(str, selectedStrengths, setSelectedStrengths)
                                            }
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

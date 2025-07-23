import { useState, useEffect } from "react";
import levelCheckData from "../../assets/other/levelCheck.json";
import { LevelCheckEntry, StrengthAndWeakness } from "../../type/LevelCheckForm";

type Props = {
  item: keyof LevelCheckEntry;
  inputData: LevelCheckEntry;
  setForm: React.Dispatch<React.SetStateAction<LevelCheckEntry>>;
};

const LevelCheckSelect = ({ item, inputData, setInputData }: Props) => {
  const [level, setLevel] = useState<string>("");
  const [score, setScore] = useState<number>();
  const [scoreError, setScoreError] = useState<string>("");
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [selectedWeaknesses, setSelectedWeaknesses] = useState<string[]>([]);
  const [customStrengthInput, setCustomStrengthInput] = useState<string>("");
  const [customWeaknessInput, setCustomWeaknessInput] = useState<string>("");

  const predefinedStrengths = levelCheckData.english[item]?.[level]?.strength || [];
  const predefinedWeaknesses = levelCheckData.english[item]?.[level]?.weakness || [];

  const allStrengths = [...predefinedStrengths, ...selectedStrengths.filter(s => !predefinedStrengths.includes(s))];
  const allWeaknesses = [...predefinedWeaknesses, ...selectedWeaknesses.filter(w => !predefinedWeaknesses.includes(w))];

  const maxStrengthsReached = selectedStrengths.length >= 3;
  const maxWeaknessesReached = selectedWeaknesses.length >= 3;

  const getScoreRange = (level: string) => {
    switch(level){
      case "A1-A2": return [1, 5];
      case "B1-B2": return [5, 9];
      case "C1-C2": return [9, 10];
      default: [0, 10];
    }
  }
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
    setScore(undefined);
    setScoreError("");
    setInputData(prev => ({
      ...prev,
      [item]: {
        ...prev[item],
        level_name: e.target.value,
      }
    }))
    setSelectedStrengths([]);
    setSelectedWeaknesses([]);

  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputScore = parseFloat(e.target.value);
    const [min, max] = getScoreRange(level);

    if(isNaN(inputScore)){
      setScore(undefined);
      setScoreError("Score must be a number");
      return;
    }
    if(inputScore < min || inputScore > max){
      setScoreError(`Score for ${level} must be between ${min} and ${max}.`);
    } else {
      setScoreError("");
    }
    setScore(inputScore);
  };

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
    console.log(current);
    setLevel(current.level_name || "");
    setScore(current.score ?? undefined);
    setSelectedStrengths(current.strength || []);
    setSelectedWeaknesses(current.weakness || []);
  },[]);

  // Push form updates to parent when all selections valid
  useEffect(() => {
    if (
      level &&
      selectedStrengths.length >= 2 && 
      selectedWeaknesses.length >= 2 && 
      score !== undefined && 
      !scoreError) {
      const updated: StrengthAndWeakness = {
        level_name: level,
        score,
        strength: selectedStrengths,
        weakness: selectedWeaknesses
      };

      setInputData(prev => ({
        ...prev,
        [item]: updated,
      }));
    }
  }, [level, score, selectedStrengths, selectedWeaknesses]);

  const title = item.charAt(0).toUpperCase() + item.slice(1);

  return (
    <section className="mt-6 min-h-[400px]">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
       <label htmlFor={`${item}_level`}>
        <select
          id={`${item}_level`}
          value={level}
          onChange={handleLevelChange}
          className="form-input mt-1 block w-full border-b-2 border-gray-200 focus:border-[#09c5eb]"
        >
          <option value="">Choose CEFR Level</option>
          {["A1-A2", "B1-B2", "C1-C2"].map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor= {`${item}_score`}>Enter a score
          <input 
            type="number"
            value={score}
            onChange={handleScoreChange}
            className= "form-input font-primary text-base text-black mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:outline-0 focus:ring-0 focus:border-[#09c5eb] hover:border-[#09c5eb]" 
            id={`${item}_score`} />
          {scoreError && <p className= "text-red-600 text-sm">{scoreError}</p>}
      </label>
      <div className="grid grid-cols-2 gap-3">

      {level && score !== undefined  && scoreError === "" && (
        <>
          {/* Strengths */}
          <div className="mt-6">
            <p className="font-semibold">Select 2–3 strengths:</p>
                      <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add custom strength"
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
                className="flex-1 border-b"
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
              <label key={idx} className="flex items-center gap-2 mt-1">
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
        
  
            {selectedStrengths.length < 2 && (
              <p className="text-sm text-red-600">Select at least 2 strengths.</p>
            )}
          </div>

          {/* Weaknesses */}
          <div className="mt-6">
            <p className="font-semibold">Select 2–3 weaknesses:</p>
                   <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add custom weakness"
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
                className="flex-1 border-b"
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
              <label key={idx} className="flex items-center gap-2 mt-1">
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
            {selectedWeaknesses.length < 2 && (
              <p className="text-sm text-red-600">Select at least 2 weaknesses.</p>
            )}
          </div>
        </>
      )}
      </div>
      {/* CEFR Level */}
     
    </section>
  );
};

export default LevelCheckSelect;

import { useState, useEffect } from "react";
import levelCheckData from "../../assets/other/levelCheck.json";
import { LevelCheckEntry, StrengthAndWeakness } from "../../type/LevelCheckForm";

type Props = {
  item: keyof LevelCheckEntry;
  setForm: React.Dispatch<React.SetStateAction<LevelCheckEntry>>;
};

const LevelCheckSelect = ({ item, inputData, setInputData }: Props) => {
  const [level, setLevel] = useState<string>("");
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

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
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

  // Push form updates to parent when all selections valid
  useEffect(() => {
    if (level && selectedStrengths.length >= 2 && selectedWeaknesses.length >= 2) {
      const updated: StrengthAndWeakness = {
        level_name: level,
        strength: selectedStrengths,
        weakness: selectedWeaknesses
      };

      setInputData(prev => ({
        ...prev,
        [item]: updated,
      }));
    }
  }, [level, selectedStrengths, selectedWeaknesses]);

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
      <div className="grid grid-cols-2 gap-3">

      {level && (
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
                Add
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
                Add
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

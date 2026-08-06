// src/pages/LevelCheckPage/CreateLevelCheckForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelCheckForm from "@/pages/LevelCheckPage/LevelCheckForm";
import { Language } from "@/utils/common";
import { CjkEntry, EnglishEntry } from "@/type/LevelCheckForm";
import { useUser } from "@/context/UserContext";
import labelText from "@/assets/other/labelText.json";

const LANGUAGE_KEYS: { value: Language; labelKey: "lang_english" | "lang_chinese" | "lang_korean" | "lang_japanese" }[] = [
  { value: "english", labelKey: "lang_english" },
  { value: "chinese", labelKey: "lang_chinese" },
  { value: "korean", labelKey: "lang_korean" },
  { value: "japanese", labelKey: "lang_japanese" },
];

type DropdownLanguageProps = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: Language | "";
  id: string;
  className: string;
  label: string;
  placeholder: string;
  options: { value: Language; label: string }[];
};

const DropdownLanguage: React.FC<DropdownLanguageProps> = ({
  id,
  className,
  handleChange,
  value,
  label,
  placeholder,
  options,
}) => {
  return (
    <div className="w-full">
      <label className="form-label-text mb-2 block" htmlFor={id}>
        {label}
      </label>
      <select
        className={className}
        name={id}
        onChange={handleChange}
        id={id}
        value={value}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const createEntryForLanguage = (value: Language): EnglishEntry | CjkEntry => {
  if (value === "english") {
    const initForm = new EnglishEntry();
    initForm.language = "english";
    return initForm;
  }
  const initForm = new CjkEntry();
  initForm.language = value;
  return initForm;
};

// --- Page ---------------------------------------------------------------------

const LevelCheckPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const appLanguage = (user?.language ?? "english") as Language;
  const t = labelText[appLanguage].levelCheck;

  const [inputData, setInputData] = useState<EnglishEntry | CjkEntry>(new EnglishEntry());
  const [language, setLanguage] = useState<Language | "">("");
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");

  const languageOptions = LANGUAGE_KEYS.map(({ value, labelKey }) => ({
    value,
    label: t[labelKey],
  }));

  const handleDraftLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage((e.target.value || "") as Language | "");
  };

  const handleCreate = () => {
    if (!language) return;
    setInputData(createEntryForLanguage(language));
    setStarted(true);
  };

  const handleSave = () => {
    if (error !== "") return;

    if (inputData === undefined) return setError("Submit failed: inputData is undefined.");

    const getUser = JSON.parse(localStorage.getItem("GEOS_app") || "{}");
    if (!getUser) return;

    if (!Array.isArray(getUser.levelCheck)) {
      getUser.levelCheck = [];
    }

    const index = getUser.levelCheck.findIndex((item: any) => item.id === inputData.id);

    if (index !== -1) {
      getUser.levelCheck[index] = inputData;
    } else {
      getUser.levelCheck.push(inputData);
    }

    localStorage.setItem("GEOS_app", JSON.stringify(getUser));
    navigate(`/levelCheck/preview/${inputData.id}`, { replace: true, state: { data: inputData } });
  };

  if (!started) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-10">
        <div className="panel w-full max-w-md p-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <DropdownLanguage
              id="create-language"
              className="form-field text-left"
              value={language}
              handleChange={handleDraftLanguageChange}
              label={t.choose_language}
              placeholder={t.select_language}
              options={languageOptions}
            />
            <button
              type="button"
              className="btn-primary min-w-40 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleCreate}
              disabled={!language}
            >
              {t.create}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[55rem] px-4 py-6">
      <section id="levelCheckForm">
        <LevelCheckForm
          inputData={inputData}
          setInputData={setInputData}
          handleSave={handleSave}
        />
      </section>
    </div>
  );
};

export default LevelCheckPage;

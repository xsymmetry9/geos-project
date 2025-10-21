const appName = "GEOS_app";
import User from "@/type/User";
import { Student } from "@/type/Student";
import levelData from "@/assets/other/levelInformation.json";

type LanguageKey = "english" | "chinese" | "korean" | "japanese";
type Aspect = "vocabulary" | "grammar" | "listening" | "conversation" | "pronunciation";

interface LevelDetail {
  level: string;
  description: string;
}

//Reads data from the local Storage
export function getDataFromLocal(): User {
  const data = localStorage.getItem(appName);

  if (data) {
    const parsed = JSON.parse(data);
    const user = Object.assign(new User(), parsed);
    return user;
  }

  // If there's no data, return a new User
  return new User();
}

export function getStudentById(id: string) {
  const data = localStorage.getItem(appName);
  if (!data) return null;

  const parsedData = JSON.parse(data);
  const { SPR } = parsedData;

  if (!Array.isArray(SPR)) return null;

  return SPR.find((student) => student.id === id) || null;
}

//Updates data in the localStorage
export function editDataFromLocal(data: User) {
  try {
    localStorage.setItem(appName, JSON.stringify(data));
  } catch (err) {
    return "Error loading the data";
  }
}

//Delete data from the local storage
export function deleteStudentById(obj) {
  const { id, type } = obj;
  const data = localStorage.getItem(appName);
  if (!data) return null;

  const parsedData = JSON.parse(data);
  if (!Array.isArray(parsedData[type])) return null;

  const updatedList = parsedData[type].filter((item: any) => item.id !== id);

  const newData = {
    ...parsedData,
    [type]: updatedList,
  };

  localStorage.setItem(appName, JSON.stringify(newData));
  return updatedList;
}

export function getLevelInformationByLevel(params: {
  lang: LanguageKey;
  cat: Aspect;
  level: string;
}): string {
  const { lang, cat, level } = params;
  // if (!level) return {id: null, description: "Choose a level"}

  if (level === "select_score") return "Choose a score";

  const aspectData = (levelData as any)[lang]?.[cat] as LevelDetail[] | undefined;

  if (!aspectData) return "Invalide category";

  const result = aspectData.find((item) => item.level == level);

  return result?.description ?? "Select a score";
}

export function getAllLevelsInformationByAspect(params: {
  lang: LanguageKey;
  name: Aspect;
}): LevelDetail[] {
  const { lang, name } = params;
  const data = (levelData as any)[lang]?.[name] as LevelDetail[] | undefined;

  return data ?? []; // returns an array
}

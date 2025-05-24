const appName = "GEOS_app";
import User from "@/type/User";
import {Student} from "@/type/Student";
import levelData from "@/assets/other/levelInformation.json";

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
export function deleteStudentById(id: string) {
  const data = localStorage.getItem(appName);
  if (!data) return null;

  const parsedData = JSON.parse(data);

  if (!Array.isArray(parsedData.SPR)) return null;

  const updatedSPR = parsedData.SPR.filter((student: Student) => student.id !== id);

  const newData = {
    ...parsedData,
    SPR: updatedSPR,
  };

  localStorage.setItem(appName, JSON.stringify(newData));

  return updatedSPR;
}

// Needs more work
export function getLevelInformationByLevel(obj) {
  const {lang, cat, level} = obj;
  // if (!level) return {id: null, description: "Choose a level"}

  if(level === "select_score") return "Choose a score";
  const aspectOfLanguage = levelData[lang][cat]; // returns an array
  const results = aspectOfLanguage.filter((item) => item.level == level);
  const result = results[0] != null ? results[0].description : "Select a score";

  return result;

}

// Needs more work
export function getAllLevelsInformationByAspect(obj: {lang: string; name: string}): any[] {
  const {lang, name} = obj;
  const result = levelData[lang][name];

  return result; // returns an array
}
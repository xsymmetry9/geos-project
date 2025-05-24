const appName = "GEOS_App";
import User from "@/type/User";
import levelData from "@/assets/other/levelInformation.json";

//Reads data from the local Storage
export function getDataFromLocal(): User | null {
  const data = localStorage.getItem(appName);

  return data ? JSON.parse(data) as User: null;
}

export function getStudentById(id) {
  const data = localStorage.getItem(appName);
  const parsedData = JSON.parse(data);
  const { SPR } = parsedData;
  return SPR.filter((student) => student.id === id)[0];
}

//Adds data to the localStorage
export function editDataFromLocal(data) {
  try {
    localStorage.setItem(appName, JSON.stringify(data));
  } catch (err) {
    return "Error loading the data";
  }
}

//Delete data from the local storage
export function deleteStudentById(id) {
  const data = localStorage.getItem(appName);
  const parsedData = JSON.parse(data);

  const newData = {
    ...parsedData,
    SPR: parsedData.SPR.filter((student) => student.id !== id),
  };
  localStorage.setItem(appName, JSON.stringify(newData));

  return newData.SPR;
}

export function getLevelInformationByLevel(obj) {
  const {lang, cat, level} = obj;
  // if (!level) return {id: null, description: "Choose a level"}

  if(level === "select_score") return "Choose a score";
  const aspectOfLanguage = levelData[lang][cat]; // returns an array
  const results = aspectOfLanguage.filter((item) => item.level == level);
  const result = results[0] != null ? results[0].description : "Select a score";

  return result;

}

export function getAllLevelsInformationByAspect(obj: {lang: string; name: string}): any[] {
  const {lang, name} = obj;
  const result = levelData[lang][name];

  return result; // returns an array
}
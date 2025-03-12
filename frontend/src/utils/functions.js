const appName = "GEOS_app";
import levelData from "../../public/levelInformation.json";

//Reads data from the local Storage
export function getDataFromLocal() {
  return localStorage.getItem(appName);
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
    return "Error loading the data", err;
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
  if (level == null) return {id: null, description: "Choose a level"}
  const aspectOfLanguage = levelData[lang][cat]; // returns an array
    const results = aspectOfLanguage.filter((item) => item.level == level);
    const result = results[0];

  return result; // returns an object
}

export function getAllLevelsInformationByAspect(obj) {
  const {lang, name} = obj;
  const result = levelData[lang][name];

  return result; // returns an array
}
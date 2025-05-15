const appName = "GEOS_app";
import levelData from "@/assets/other/levelInformation.json";

//Reads data from the local Storage
export function getDataFromLocal() {
<<<<<<< HEAD
    return localStorage.getItem(appName);
}

export function getStudentById(id){
        const data = getDataFromLocal();
        const parsedData = JSON.parse(data);
        const {SPR} = parsedData;
        return SPR.filter((student) => student.id === id)[0];
=======
  return localStorage.getItem(appName);
}

export function getStudentById(id) {
  const data = localStorage.getItem(appName);
  const parsedData = JSON.parse(data);
  const { SPR } = parsedData;
  return SPR.filter((student) => student.id === id)[0];
>>>>>>> 801b1729e44fb8be552d401c981161bf4f1f1e37
}

//Adds data to the localStorage
export function editDataFromLocal(data) {
<<<<<<< HEAD

    try {
        localStorage.setItem(appName, JSON.stringify(data));
        return {status: true, message: "Success!"}
    } catch (err) {
        return {status: false, error: err}
    }
=======
  try {
    localStorage.setItem(appName, JSON.stringify(data));
  } catch (err) {
    return "Error loading the data", err;
  }
>>>>>>> 801b1729e44fb8be552d401c981161bf4f1f1e37
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

export function getAllLevelsInformationByAspect(obj) {
  const {lang, name} = obj;
  const result = levelData[lang][name];

  return result; // returns an array
}
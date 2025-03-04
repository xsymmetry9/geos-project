const appName = "GEOS_app";

//Reads data from the local Storage
export function getDataFromLocal() {
  return  localStorage.getItem(appName);
}

export function getStudentById(id){
  const data = localStorage.getItem(appName);
  const parsedData = JSON.parse(data);
  const {SPR} = parsedData;
  return SPR.filter((student) => student.id === id)[0];
}

//Adds data to the localStorage
export function editDataFromLocal(data) {

  try {
    localStorage.setItem(appName, JSON.stringify(data));
  } catch (err) {
    return ("Error loading the data", err);
  }
}

//Delete data from the local storage
export function deleteStudentById(id){
  const data = localStorage.getItem(appName);
  const parsedData = JSON.parse(data);

  const newData = {
    ...parsedData,
    SPR: parsedData.SPR.filter((student) => student.id !== id)
  };
  localStorage.setItem(appName, JSON.stringify(newData));

  return newData.SPR;

}
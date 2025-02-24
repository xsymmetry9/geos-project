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
        console.log("Error loading the data", err);
    }
}
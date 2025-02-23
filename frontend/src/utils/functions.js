const appName = "GEOS_app";

//Reads data from the local Storage
export function getDataFromLocal() {
    try{
        const data = localStorage.getItem(appName);
        return data;
    } catch (err) {
        console.log("Error loading the data");
    }
}

export function getStudentById(id){
    try{
        const data = localStorage.getItem(appName);

        const parsedData = JSON.parse(data);
        const {SPR} = parsedData;

        return SPR.filter((student) => student.id === id)[0];
    } catch (err) {
        console.log("Error, can't find the student", err);
    }
}

//Adds data to the localStorage
export function editDataFromLocal(data) {

    try {
        localStorage.setItem(appName, JSON.stringify(data));
    } catch (err) {
        console.log("Error loading the data", err);
    }
}
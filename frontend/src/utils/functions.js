const appName = "GEOS_app";

//Reads data from the local Storage
export function getDataFromLocal() {
    try{
        const data = localStorage.getItem(appName)
        return data;
    } catch (err) {
        console.log("Error loading the data");
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
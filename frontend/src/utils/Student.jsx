import React, {createContext, useContext, useState} from 'react';

const StudentContext = createContext();

export const StudentProvider = ({children}) =>{
    const [student, setStudent] = useState({
        "name": "Gary",
        "course": "GL",
        "language": "English"
    });

    return(
        <StudentContext.Provider value = {{student, setStudent}} >
            {children}
        </StudentContext.Provider>
    )
}

export const useStudent = () => useContext(StudentContext);
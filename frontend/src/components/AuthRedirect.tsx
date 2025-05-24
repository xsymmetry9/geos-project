import {Navigate} from "react-router-dom";
import {useState, useEffect} from "react";
import User from "../type/User";

const appName = 'GEOS_app';
function AuthRedirect() {
    const [user, setUser] = useState<User | null> (null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUserFromLocalStorage = localStorage.getItem(appName);
        if(!getUserFromLocalStorage){
            const newUser = new User();
            localStorage.setItem(appName, JSON.stringify(newUser));
            setUser(newUser);
            setLoading(false);
        } else {
            const parsedUser = JSON.parse(getUserFromLocalStorage);

            if(!parsedUser.language)
            {
                const updatedUser = {
                    ...parsedUser,
                    language: new User().language
                }
                localStorage.setItem(appName, JSON.stringify(updatedUser));

                setUser(updatedUser);
            } else {
                setUser(parsedUser);
            }
        }
        setLoading(false);

    }, []);
    
    if (loading) return <div>Loading ...</div>
    if(user)
        {
            const language = user.language ?? "english";
            return <Navigate to= {`home/${user? user.language : "english"}`} replace /> 
    }
    return <Navigate to= "/language"/>
}

export default AuthRedirect;
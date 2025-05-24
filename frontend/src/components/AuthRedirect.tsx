import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import User from "../type/User";

const appName = 'GEOS_app';

function AuthRedirect() {
    const [user, setUser] = useState<User>();
    const [isNewUser, setIsNewUser] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true); // Prevent premature render

    useEffect(() => {
        const getUserFromLocalStorage = localStorage.getItem(appName);

        if (!getUserFromLocalStorage) {
            const newUser = new User();
            localStorage.setItem(appName, JSON.stringify(newUser));
            console.log("Created a new user");
            setIsNewUser(true);
            setLoading(false);
        } else {
            const parsedUser = JSON.parse(getUserFromLocalStorage);
            console.log("Not a new user");

            if (!parsedUser.language) {
                console.log("No language");
                const updatedUser = {
                    ...parsedUser,
                    language: new User().language,
                };
                localStorage.setItem(appName, JSON.stringify(updatedUser));
                setIsNewUser(true);
            } else {
                console.log("Yes language!");
                setUser(parsedUser);
                setIsNewUser(false);
            }
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Loading...</div>;

    return isNewUser
        ? <Navigate to="/language" replace />
        : <Navigate to={`home/${user?.language ?? "english"}`} replace />;
}

export default AuthRedirect;

<<<<<<< HEAD
// components/authRedirect.tsx
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const AuthRedirect = () => {
    const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

    useEffect(() =>{
        const token = localStorage.getItem("token");
        if(!token) {
            setStatus( "unauthenticated");
            return;
        }
        axios
            .get("http://localhost:8000/api/verify-token", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })   
            .then((res) => {
                console.log(res);
                if(res.data.authenticate) {
                    setStatus("authenticated");
                } else {
                    setStatus("unauthenticated");
                }
            })
            .catch(() => { setStatus("unauthenticated")});
    }, [])

    if(status === "loading") return <div>Loading ...</div>;

    return status === "authenticated" ? (
        <Navigate to="/profile" replace />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default AuthRedirect;
=======
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
>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c

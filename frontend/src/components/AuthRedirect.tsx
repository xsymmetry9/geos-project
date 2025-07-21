// components/authRedirect.tsx
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const AuthRedirect = () => {
    const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
    const navigate = useNavigate()

    useEffect(() =>{
        const token = localStorage.getItem("token");

        if(!token) {
            setStatus( "unauthenticated");
            navigate("/login", {replace: true});
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
                    console.log("logged in");
                    setStatus("authenticated");
                    navigate("/profile", {
                        replace: true, 
                        state: {user: res.data.user},
                    });
                } else {
                    console.log("error: not logged in");
                    setStatus("unauthenticated");
                    navigate("/login", {replace: true});
                }
            })
            .catch(() => { 
                setStatus("unauthenticated");
                navigate("/login", {replace: true});
            }

            );
    }, [])

    if(status === "loading") return <div>Loading ...</div>;
    return null;
};

export default AuthRedirect;

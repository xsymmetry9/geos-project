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
            .get("http://localhost:8000/api/admin/verify-token", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })   
            .then((res) => {
                if(res.data.authenticated) {
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
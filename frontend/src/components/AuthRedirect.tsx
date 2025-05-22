import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const AuthRedirect = () => {
    const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

    useEffect(() =>{
        axios
            .get("http://localhost:8000/api/admin/login", {withCredentials: true})
            .then((res) => {
                if(res.data.user) {
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
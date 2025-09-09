import { Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

function AuthRedirect() {

    const {user, isHydrated} = useUser();

    if(!isHydrated) return <div>Loading ...</div>

    if(!user?.language) return <Navigate to="/language" replace />

    return <Navigate to="/home"/>
}

export default AuthRedirect;

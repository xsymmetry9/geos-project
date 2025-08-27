import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

type LogoutButtonProps = {
    userType: "admin" | "user";
}
const LogoutButton = ({userType}: LogoutButtonProps) => {
    const navigate = useNavigate();

    const handleLogout = async () =>{
        const token = localStorage.getItem(userType === "admin" ? "adminToken" : "token");

        if(!token){
            navigate("/login");
        }

        localStorage.removeItem(userType === "admin" ? "adminToken" : "token");
    }
    return(
        <button 
            onClick={handleLogout}
            className="cursor-pointer w-32 mt-4 bg-red-600 flex items-center hover:bg-red-700 text-white font-semi-bold py-2 px-4 rounded">
                <LogOut size={24} color="white" className="mr-2" /><span>Log out</span>
            </button>
    )
}

export default LogoutButton;
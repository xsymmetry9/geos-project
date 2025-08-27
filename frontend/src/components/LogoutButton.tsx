import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () =>{
        const token = localStorage.getItem("token");

        if(!token){
            navigate("/login");
        }

        localStorage.removeItem("token");
    }
    return(
        <button 
            onClick={handleLogout}
            className="cursor-pointer w-32 mt-4 bg-red-600 flex items-center hover:bg-red-700 text-white font-semi-bold py-2 px-4 rounded">
                <LogOut size="small" color="white" className="w-[30px] h-[30px] mr-2" /><span>Log out</span>
            </button>
    )
}

export default LogoutButton;
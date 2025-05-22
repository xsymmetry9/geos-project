import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try{
            await axios.get("http://localhost:8000/api/logout", {
                withCredentials: true,
            });
            navigate("login");
        } catch (err) {
            console.log("Logout failed", err);
        }
    }
    return(
        <button 
            onClick={handleLogout}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semi-bold py-2 px-4 rounded">
            Log Out
            </button>
    )
}

export default LogoutButton;
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
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semi-bold py-2 px-4 rounded">
            Log Out
            </button>
    )
}

export default LogoutButton;
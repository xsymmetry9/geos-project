import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton"

const Sidebar = () =>{
    return (
        <nav className="h-full flex flex-col gap-4 p-4">
            <Link to="/profile/viewStudents" className="text-gray-700 hover:text-blue-600">View Students</Link> 
            <Link to="/profile/createStudent" className="text-gray-700 hover:text-blue-600">Add Student</Link>            
            <Link to="/profile/setting" className="text-gray-700 hover:text-blue-600">Settings</Link>            
            <LogoutButton />          
        </nav>       
    )
}

export default Sidebar;


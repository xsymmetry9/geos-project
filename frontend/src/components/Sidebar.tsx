import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton"

const Sidebar = () =>{
    return (
        <nav className="h-full flex flex-col gap-4 p-4">
            <NavLink to="/profile/viewStudents" className="text-gray-700 hover:text-blue-600">View Students</NavLink> 
            <NavLink to="/profile/createStudent" className="text-gray-700 hover:text-blue-600">Add Student</NavLink>            
            <NavLink to="/profile/setting" className="text-gray-700 hover:text-blue-600">Settings</NavLink>            
            <LogoutButton />          
        </nav>       
    )
}

export default Sidebar;


import LogoutButton from "./LogoutButton"

const Sidebar = () =>{
    return (
        <nav className="h-full flex flex-col gap-4 p-4">
            <a href="/profile/viewStudents" className="text-gray-700 hover:text-blue-600">View Students</a> 
            <a href="/profile/createStudent" className="text-gray-700 hover:text-blue-600">Add Student</a>            
            <a href="#" className="text-gray-700 hover:text-blue-600">Settings</a>            
            <LogoutButton />
          
           
        </nav>       
    )
}

export default Sidebar;


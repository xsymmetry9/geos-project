import { useLocation } from "react-router-dom";
const ProfilePage = () => {
    const location = useLocation();
    
    const user = location.state;
    
    return(
        <>
            <h1 className="text-center font-bold text-3xl">Hello there, {user.name}</h1>

            
        </>
    )
}

export default ProfilePage;
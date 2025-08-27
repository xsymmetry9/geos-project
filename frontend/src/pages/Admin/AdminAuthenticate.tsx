import { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";

const AdminAuthenticate = () => {
    const adminToken = localStorage.getItem("adminToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminToken) {
            // Redirect to login or show an error
            navigate("/admin/login", { replace: true });
        }
    }, [adminToken]);
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Admin Authentication</h1>
            <p className="mb-8">Please authenticate to access the admin panel.</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Authenticate
            </button>
        </div>
    );
};

export default AdminAuthenticate;
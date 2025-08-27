import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/api/axiosInstance";

const AdminAuthenticate = () => {
    const adminToken: string | null = localStorage.getItem("adminToken");
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            try {
                if (!adminToken) {
                    // Redirect to login or show an error
                    console.log("No admin token found, redirecting to login.");
                    navigate("/admin/login", { replace: true });
                } else {
                // Optionally, verify the token with the server here
                    const response = await axios.get(`${API_BASE_URL}/api/admin/verify-admin`, {
                        headers: { Authorization: `Bearer ${adminToken}` },
                    });
                    console.log("Admin token verified:", response.data);
                    setInterval(() => {
                        navigate("/admin/home", { replace: true });
                    }, 1000);
                }
            } catch (error) {
                console.error("Authentication error:", error);
                navigate("/admin/login", { replace: true });
            }
        };

        authenticate();
    }, [adminToken]);

    return null;
};

export default AdminAuthenticate;
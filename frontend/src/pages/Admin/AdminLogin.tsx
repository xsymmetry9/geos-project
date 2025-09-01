import {useState} from "react";
import axios from "axios";
import API_BASE_URL from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";

type FormData = {
    name: string;
    password: string;
}
type MessageBox = {
    type: string;
    message: string;
}

function AdminLogin() {
    const [formData, setFormData] = useState<FormData>({name: "", password: ""});
    const [messageBox, setMessageBox] = useState<MessageBox>({type: "", message: ""});
    const [loading, setLoading] = useState<boolean>(false);
    let navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setMessageBox({type: "info", message: "Logging in..."});
        setLoading(true);
        try{
            const res = await axios.post(`${API_BASE_URL}/api/admin/login`, formData);
            console.log(res);
             if(res.data.success){
                setMessageBox({type: "success", message:"Login successful"});
                localStorage.setItem("adminToken", res.data.token);
                setTimeout(() => {
                  setLoading(false);
                }, 500);
                navigate("/admin", {replace: true});
            } else {
                return setMessageBox({type: "error", message:"Login failed.  Please try again."});
            }
        } catch (err) {
            return setMessageBox({type: "error", message: "Server Error.  Please try again."});
        } finally {
          setTimeout(() => {
            if (messageBox.type !== "success")
            {
              setMessageBox({type: "", message: ""});
              setLoading(false);
            }
          }, 1000);
        }

       
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
      {loading && <div className={`absolute top-3 w-[300px] h-[100px] border ${messageBox.type === "error" ? "bg-red-100 border-red-400 text-red-700" : "bg-green-100 border-green-400 text-green-700"} p-2 rounded-md`}>
        {messageBox.message}
      </div> }

      <div className="font-secondary w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin
        </h1>

        <form onSubmit= {handleSubmit} autoComplete="off" className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export {AdminLogin};

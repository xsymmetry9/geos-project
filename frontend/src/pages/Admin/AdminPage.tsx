import {useState} from "react";
import axios from "axios";
import API_BASE_URL from "@/api/axiosInstance";

function AdminPage() {
    const [formData, setFormData] = useState({name: "", password: ""});
    const [error, setError]= useState("")
    const [success, setSuccess] = useState("");

    const handleChange = (e) =>{
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        setSuccess("");
        try{
            const res = await axios.post(`${API_BASE_URL}/api/admin/login`, formData);
             if(res.data.success){
                setSuccess("Login successful")
                console.log(success);
            } else {
                setError("Invalid Credentials");
                console.log(error);
                console.log(success);
            }
        } catch (err) {
            console.log(err);
            setError("Server Error.  Please try again.")
        }
       
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="font-secondary w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin
        </h1>

        <form onSubmit= {handleSubmit} className="space-y-6">
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

export default AdminPage;

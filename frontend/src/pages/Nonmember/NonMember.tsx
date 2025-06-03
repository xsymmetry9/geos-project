import { ChangeEvent, FormEvent, useState } from "react";
import { Outlet, useNavigate, Link, useLocation} from "react-router-dom";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

interface CreateAccountFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  language: string;
}

interface LocationState {
  from?: string;
  message?: string;
  userType?: string;
}

const SignInLayout = () =>{

  return(
    <div className = "flex items-center justify-center min-h-screen bg-gray-100">
      <Outlet/>
    </div>
  )
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axios.post("http://localhost:8000/api/login", formData);
      console.log(res);
      localStorage.setItem("token", res.data.token)
      navigate("/profile");

    } catch (err: any) {
      console.log(err.response?.status);
      setErrorMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }

  };

  return (
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Log in to your account</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00646c]"
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleInput}
            value={formData.email}
          />
          <input
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00646c]"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            value={formData.password}
          />
          <button
            className="flex justify-center bg-[#00646c] text-white font-semibold py-3 rounded-md hover:bg-[#005159] cursor-pointer transition duration-200"
            type="submit"
            disabled={loading}
          > {
            loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> Loading
              </>
            ) : "Log in"
          }
          </button>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        </form>

        <div className="text-center mt-4">
          <Link to="/forgotPassword" className="text-[#00646c] text-sm hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="text-center">
          <Link
            to="/createAccount"
            className="bg-white border border-[#00646c] text-[#00646c] font-semibold py-3 px-6 rounded-md hover:bg-[#00646c] hover:text-white transition duration-200"
          >
            Create New Account
          </Link>
        </div>
      </div>
  );
};

const CreateNewAccount = () =>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateAccountFormData>({
    name:"",
    email: "", 
    password: "", 
    confirmPassword: "", 
    language: "english" });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if(name === "confirmPassword" || name === "password") {
      setPasswordsMatch(
        name === "password" ? value === formData.confirmPassword : formData.password === value
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!passwordsMatch){
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try{
       const res = await axios.post("http://localhost:8000/api/createTeacherProfile", formData);
      if(res.data.result) {
        navigate("/login/success", {state: {from: "createAccount", message: "Account created successfully", userType: "nonmember"}});
      } else {
        console.log(res);
        setError("Email is taken, try another one");
      }
    } catch (err) {
      setError("Couldn't connect the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create new account</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00646c]"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInput}
            value={formData.name}
          />
          <input
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00646c]"
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleInput}
            value={formData.email}
          />
          <input
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00646c]"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            value={formData.password}
            required
          />
          <input
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00646c]"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleInput}
            value={formData.confirmPassword}
            required
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}

          <select className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00646c]" name="language" onChange={handleInput} value={formData.language}>
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
            <option value="korean">Korean</option>
            <option value="japanese">Japanese</option>

          </select>
          <button
            className="flex justify-center bg-[#00646c] text-white font-semibold py-3 rounded-md hover:bg-[#005159] cursor-pointer transition duration-200"
            type="submit"
            value="Done"
            disabled= {isLoading}
            >
              {
              isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg> Loading
                </>
                ) : ( 
                "Done"
                )}
              </button>
 
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="text-center mt-6">
          <Link to="/login" className="text-[#00646c] text-sm hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </div>
  );
};

const Success = () =>{

  const location = useLocation();
  const message = location.state?.message;
  const from = location.state?.from;

    return(
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#00646c] mb-4">
          {message}
        </h1>
        <p className="text-gray-700 mb-6">
          {from === "createAccount" ? "Your account has been created. You can now log in and start using the platform." : "You have successfully logged in."}
        </p>
        <Link to="/login"
            className="bg-[#00646c] text-white font-semibold py-3 px-3 rounded-md hover:bg-[#005159] cursor-pointer transition duration-200">
          Login</Link>
      </div>
    )
}

const Failure = () =>{
  const location = useLocation();
  const message = location.state?.message;
    return(
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Create Account failed</h1>
        <p className="text-gray-700 mb-6">
          We couldn’t create an account. Please try again
        </p>
        <Link
          to="/createAccount"
          className="inline-block bg-[#00646c] hover:bg-[#005159] text-white font-semibold py-3 px-6 rounded-md transition duration-200"
        >
          Create Account
        </Link>
      </div>
    )
}

export 
  {
    SignInLayout,
    Login, 
    CreateNewAccount, 
    Success, 
    Failure}

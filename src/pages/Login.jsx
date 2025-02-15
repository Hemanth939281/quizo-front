import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await loginUser(username, password);
  
      if (response.message === "Login successful" && response.user) {  
        toast.success("Successfully logged in");
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen lg:bg-gradient-to-r lg:from-gray-200 lg:to-gray-300 rounded-lg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

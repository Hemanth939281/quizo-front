import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../api/authApi";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    
    if (!username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    try {
      const response = isSignUp
        ? await signupUser(username, password)
        : await loginUser(username, password);

      if (response.message === (isSignUp ? "Signup successful" : "Login successful")) {
        toast.success(isSignUp ? "Successfully signed up" : "Successfully logged in");
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(isSignUp ? "Signup failed. Please try again." : "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:bg-gradient-to-r lg:from-gray-200 lg:to-gray-300 rounded-lg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              ref={usernameRef}
            />
          </div>
          <div>
            <Input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>
        
        <p className="text-center text-gray-600 mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"} 
          <button 
            className="text-blue-600 hover:underline ml-2" 
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

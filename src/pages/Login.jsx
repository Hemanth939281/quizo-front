import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../api/authApi";
import toast from "react-hot-toast";

const Login = () => {
  // Refs for input fields
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // State for tracking sign-up or login mode
  const [isSignUp, setIsSignUp] = useState(false);

  // State for managing loading state
  const [loading, setLoading] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Check if user is already logged in and redirect to dashboard
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle form submission for login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get input values and trim spaces
    const username = usernameRef.current?.value.trim() || "";
    const password = passwordRef.current?.value.trim() || "";

    // Basic input validation
    if (!username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true); // Set loading state to true while processing request

    try {
      // Determine whether to call login or signup API
      const response = isSignUp
        ? await signupUser(username, password)
        : await loginUser(username, password);

      // Handle success response
      if (
        response.message ===
        (isSignUp ? "Signup successful" : "Login successful")
      ) {
        toast.success(
          isSignUp ? "Successfully signed up" : "Successfully logged in"
        );

        // Store user data in localStorage and navigate to dashboard
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
      } else {
        toast.error(response.message); // Show error message if any
      }
    } catch (error) {
      // Handle API errors
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        {/* Form Title */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Login / Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              ref={usernameRef}
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password (min. 6 chars)"
              ref={passwordRef}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Login/Signup Mode */}
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

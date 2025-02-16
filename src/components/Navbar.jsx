import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from local storage
    toast.success("Logged out successfully"); // Show success message
    navigate("/"); // Redirect to home page
  };

  const user = localStorage.getItem("user") || ""; // Get user data from local storage

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-blue-100 transition"
        >
          Quizo
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="text-blue-100 hover:text-white font-medium transition text-sm uppercase tracking-wide"
          >
            Dashboard
          </Link>
          <Link
            to="/create-quiz"
            className="text-blue-100 hover:text-white font-medium transition text-sm uppercase tracking-wide"
          >
            Create Quiz
          </Link>
          {user && (
            <button
              onClick={handleLogout} // Logout user
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg hover:cursor-pointer uppercase tracking-wide"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-blue-700 p-4 space-y-4">
          <Link
            to="/dashboard"
            className="block text-white text-sm uppercase tracking-wide"
            onClick={() => setIsOpen(false)} // Close menu on click
          >
            Dashboard
          </Link>
          <Link
            to="/create-quiz"
            className="block text-white text-sm uppercase tracking-wide"
            onClick={() => setIsOpen(false)} // Close menu on click
          >
            Create Quiz
          </Link>
          {user && (
            <button
              onClick={handleLogout} // Logout user
              className="w-full bg-blue-500 hover:bg-blue-400 hover:cursor-pointer text-white py-2 rounded-lg text-sm font-medium transition uppercase tracking-wide"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

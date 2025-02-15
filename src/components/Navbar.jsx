import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import Button from "./Button";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("logged out successfully");
    navigate("/");
  };

  const user = localStorage.getItem("user") || "";

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-100 transition">
          Quizo
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
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
            <Button 
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md hover:shadow-lg hover:cursor-pointer uppercase tracking-wide"
            >
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-blue-700 p-4 space-y-4">
          <Link 
            to="/dashboard" 
            className="block text-white text-sm uppercase tracking-wide"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/create-quiz"
            className="block text-white text-sm uppercase tracking-wide"
            onClick={() => setIsOpen(false)}
          >
            Create Quiz
          </Link>
          {user && (
            <Button 
              onClick={handleLogout}
              className="w-full bg-blue-500 hover:bg-blue-400 hover:cursor-pointer text-white py-2 rounded-lg text-sm font-medium transition uppercase tracking-wide"
            >
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

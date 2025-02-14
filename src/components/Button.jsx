const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
    const baseStyles = "ml-2 px-4 py-2 font-bold rounded focus:outline-none focus:ring";
    const variants = {
      primary: "bg-blue-500 text-white hover:bg-blue-700",
      destructive: "bg-red-500 text-white hover:bg-red-700",
      secondary: "bg-gray-500 text-white hover:bg-gray-700",
    };
  
    return (
      <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
        {children}
      </button>
    );
  };
  
  export default Button;
  
const Input = ({ type = "text", placeholder, value, onChange }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
      />
    );
  };
  
  export default Input;
  
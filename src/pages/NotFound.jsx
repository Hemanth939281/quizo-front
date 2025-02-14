import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 underline">Go Home</Link>
    </div>
  );
};

export default NotFound;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzes, deleteQuiz } from "../api/quizApi";
import toast from "react-hot-toast";

const Dashboard = () => {
  // State to store quizzes
  const [quizzes, setQuizzes] = useState([]);
  // Loading state to prevent actions while fetching data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is logged in, otherwise redirect to home
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch quizzes from API when the component mounts
  useEffect(() => {
    getQuizzes()
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading when data is fetched
      });
  }, []);

  // Handle quiz deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
      toast.success("Quiz deleted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Quizzes</h1>
          <button
            onClick={() => navigate("/create-quiz")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Create New Quiz
          </button>
        </div>

        {/* Display loading message while data is being fetched */}
        {loading ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">Loading quizzes...</p>
          </div>
        ) : quizzes.length === 0 ? (
          // Message when there are no quizzes available
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">No quizzes available.</p>
            <p className="text-gray-400 mt-2">
              Create your first quiz to get started!
            </p>
          </div>
        ) : (
          // Display quizzes in a grid format
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {quiz.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {quiz.description}
                  </p>

                  <div className="flex gap-3">
                    {/* Edit quiz button */}
                    <button
                      onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Edit
                    </button>
                    {/* Delete quiz button */}
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

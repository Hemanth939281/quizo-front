import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quizApi";
import toast from "react-hot-toast";

const CreateQuiz = () => {
  // Using useRef for input fields instead of useState
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  // State for managing form submission loading state
  const [loading, setLoading] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Redirect user to home if not logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (loading) return;
    setLoading(true);

    // Extract values from refs
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    // Call API to create quiz
    const response = await createQuiz({ title, description, teacherId: 1 });

    if (response) {
      toast.success("Quiz created successfully");
      navigate("/dashboard");
    } else {
      toast.error("Failed to create quiz. Please try again.");
    }

    // Reset loading state
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Quiz Creation Form */}
        <form
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Form Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Quiz
            </h2>
            <p className="text-gray-600 text-sm">
              Fill in the details to create your quiz
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {/* Quiz Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title
              </label>
              <input
                ref={titleRef} // Using titleRef to track title
                placeholder="Enter quiz title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Quiz Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                ref={descriptionRef} // Using descriptionRef to track description
                placeholder="Enter quiz description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium py-2.5 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg`}
          >
            {loading ? "Creating..." : "Create Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;

import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById, updateQuiz } from "../api/quizApi";
import toast from "react-hot-toast";

const EditQuiz = () => {
  const titleRef = useRef(null); // Ref for title input
  const descriptionRef = useRef(null); // Ref for description input
  const { id } = useParams(); // Get quiz ID from URL params
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    // Fetch quiz details by ID
    getQuizById(id).then((quiz) => {
      if (titleRef.current) titleRef.current.value = quiz.title;
      if (descriptionRef.current)
        descriptionRef.current.value = quiz.description;
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateQuiz(id, {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    }); // Update quiz data
    toast.success("Quiz updated successfully");
    navigate("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <form
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          onSubmit={handleSubmit} // Handle form submission
        >
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Quiz</h2>
            <p className="text-gray-600 text-sm">Update your quiz details</p>
          </div>

          {/* Quiz Title Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title
              </label>
              <input
                type="text"
                placeholder="Enter quiz title"
                ref={titleRef}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Quiz Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                placeholder="Enter quiz description"
                ref={descriptionRef}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")} // Navigate back to dashboard
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Update Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuiz;

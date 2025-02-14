import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById, updateQuiz } from "../api/quizApi";
import Input from "../components/Input";
import Button from "../components/Button";

const EditQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getQuizById(id).then((quiz) => {
      setTitle(quiz.title);
      setDescription(quiz.description);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateQuiz(id, { title, description });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <form 
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Quiz</h2>
            <p className="text-gray-600 text-sm">Update your quiz details</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title
              </label>
              <Input 
                placeholder="Enter quiz title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Input 
                placeholder="Enter quiz description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Update Quiz
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuiz;
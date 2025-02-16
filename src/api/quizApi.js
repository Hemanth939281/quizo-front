const API_URL =
  import.meta.env.VITE_API_URL || "https://quizo-0yib.onrender.com/";

// Function to fetch all quizzes
export const getQuizzes = async () => {
  const response = await fetch(`${API_URL}api/quizzes`); // Fetching quizzes from API
  return response.json(); // Returning response in JSON format
};

// Function to fetch a single quiz by ID
export const getQuizById = async (id) => {
  const response = await fetch(`${API_URL}api/quizzes/${id}`); // Fetching a quiz by ID
  return response.json(); // Returning response in JSON format
};

// Function to create a new quiz
export const createQuiz = async (quiz) => {
  const response = await fetch(`${API_URL}api/quizzes`, {
    method: "POST", // HTTP POST method to create a quiz
    headers: { "Content-Type": "application/json" }, // Setting content type to JSON
    body: JSON.stringify(quiz), // Sending quiz data in request body
  });
  return response.json(); // Returning response in JSON format
};

// Function to update an existing quiz by ID
export const updateQuiz = async (id, quiz) => {
  const response = await fetch(`${API_URL}api/quizzes/${id}`, {
    method: "PUT", // HTTP PUT method to update a quiz
    headers: { "Content-Type": "application/json" }, // Setting content type to JSON
    body: JSON.stringify(quiz), // Sending updated quiz data in request body
  });
  return response.json(); // Returning response in JSON format
};

// Function to delete a quiz by ID
export const deleteQuiz = async (id) => {
  await fetch(`${API_URL}api/quizzes/${id}`, { method: "DELETE" }); // Sending delete request to API
};

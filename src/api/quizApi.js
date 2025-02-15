const API_URL = import.meta.env.VITE_API_URL || "https://quizo-0yib.onrender.com";

export const getQuizzes = async () => {
    const response = await fetch(`${API_URL}`);
    return response.json();
  };
  
  export const getQuizById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  };
  
  export const createQuiz = async (quiz) => {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quiz),
    });
    return response.json();
  };
  
  export const updateQuiz = async (id, quiz) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quiz),
    });
    return response.json();
  };
  
  export const deleteQuiz = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  };
  
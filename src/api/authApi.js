const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    
    return response.json();
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

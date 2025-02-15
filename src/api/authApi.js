const API_URL = import.meta.env.VITE_API_URL || "https://quizo-0yib.onrender.com";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return data.message || "Login failed";
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { message: error.message };
  }
};


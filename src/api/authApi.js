const API_URL =
  import.meta.env.VITE_API_URL || "https://quizo-0yib.onrender.com";

// Function to log in a user
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST", // HTTP method
      headers: { "Content-Type": "application/json" }, // Setting content type to JSON
      body: JSON.stringify({ username, password }), // Sending user credentials in request body
    });

    const data = await response.json(); // Parsing response JSON

    if (!response.ok) {
      return data; // Return error response if request fails
    }

    return data; // Return successful response
  } catch (error) {
    return { message: error.message }; // Return error message
  }
};

// Function to sign up a new user
export const signupUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST", // HTTP method
      headers: { "Content-Type": "application/json" }, // Setting content type to JSON
      body: JSON.stringify({ username, password }), // Sending user credentials in request body
    });

    const data = await response.json(); // Parsing response JSON

    if (!response.ok) {
      return data; // Return error response if request fails
    }

    return data; // Return successful response
  } catch (error) {
    return { message: error.message }; // Return error message
  }
};

# Quiz Management API Documentation

## Overview
This API provides endpoints for user authentication and quiz management.

## Base URL
```
https://quizo-0yib.onrender.com
```

---

## Authentication Endpoints

### 1. User Signup
**Endpoint:**
```
POST /api/auth/signup
```
**Description:** Registers a new user.

**Request Body:**
```json
{
  "username": "exampleUser",
  "password": "securePassword"
}
```
**Responses:**
- `201 Created`: Signup successful.
- `400 Bad Request`: Missing required fields or user already exists.
- `500 Internal Server Error`: Server error.

### 2. User Login
**Endpoint:**
```
POST /api/auth/login
```
**Description:** Authenticates a user.

**Request Body:**
```json
{
  "username": "exampleUser",
  "password": "securePassword"
}
```
**Responses:**
- `200 OK`: Login successful.
- `400 Bad Request`: Missing required fields.
- `401 Unauthorized`: Invalid credentials.
- `500 Internal Server Error`: Server error.

---

## Quiz Endpoints

### 1. Get All Quizzes
**Endpoint:**
```
GET /api/quizzes
```
**Description:** Fetches all available quizzes.

**Responses:**
- `200 OK`: Returns a list of quizzes.

### 2. Create a Quiz
**Endpoint:**
```
POST /api/quizzes
```
**Description:** Creates a new quiz.

**Request Body:**
```json
{
  "title": "Quiz Title",
  "description": "Quiz Description",
  "teacherId": 1
}
```
**Responses:**
- `201 Created`: Quiz successfully created.
- `400 Bad Request`: Missing required fields.

### 3. Get Quiz by ID
**Endpoint:**
```
GET /api/quizzes/:id
```
**Description:** Retrieves a quiz by its unique ID.

**Responses:**
- `200 OK`: Returns the quiz details.
- `404 Not Found`: Quiz not found.

### 4. Update Quiz
**Endpoint:**
```
PUT /api/quizzes/:id
```
**Description:** Updates an existing quiz.

**Request Body:** 
```json
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```
**Responses:**
- `200 OK`: Quiz updated successfully.
- `400 Bad Request`: Missing required fields.
- `404 Not Found`: Quiz not found.

### 5. Delete Quiz
**Endpoint:**
```
DELETE /api/quizzes/:id
```
**Description:** Deletes a quiz by ID.

**Responses:**
- `204 No Content`: Quiz deleted successfully.
- `404 Not Found`: Quiz not found.

---

## Error Handling
All error responses include a JSON object with a `message` field describing the error.
```json
{
  "message": "Error details here"
}
```

---

## Setup and Running the Server

### Install Dependencies
```
npm install
```

### Start Server
```
npm run dev
```

The server runs on port `5000` by default, unless changed in `.env`.

---

## Author
Developed by Hemanth kumar


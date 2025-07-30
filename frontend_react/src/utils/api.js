const API_BASE =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api";

/**
 * Lightweight API utility for backend HTTP/REST communication.
 * Methods: getAllRecipes, searchRecipes, getFavorites, favoriteRecipe, unfavoriteRecipe, submitRecipe, loginUser, signupUser, logoutUser, getMe
 *
 * Friendly error handling for connectivity and config issues.
 */

// Helper to check if the API base URL is configured
function checkApiBase() {
  if (!process.env.REACT_APP_BACKEND_URL && API_BASE === "http://localhost:8000/api") {
    // Instruct developer if they forgot to set the backend URL
    return "The backend URL is not configured. Please set REACT_APP_BACKEND_URL in your .env file.";
  }
  return null;
}

// Enhanced fetch function: Catches network/backend errors for all API requests
async function safeFetch(...args) {
  const apiBaseErrorMsg = checkApiBase();
  if (apiBaseErrorMsg) {
    return Promise.reject({ message: apiBaseErrorMsg });
  }
  try {
    // Standard fetch
    const resp = await fetch(...args);
    if (resp.status === 204) return {};
    const data = await resp.json().catch(() => ({}));
    if (resp.ok) return data;
    // propagate error from backend in readable way
    return Promise.reject(data && typeof data === "object" ? data : { message: "API Error" });
  } catch (err) {
    // Network, CORS, or other errors
    return Promise.reject({
      message: "Failed to connect to the backend. Please check your network connection or contact the administrator."
    });
  }
}

// PUBLIC_INTERFACE
export function getAllRecipes() {
  return safeFetch(`${API_BASE}/recipes`);
}

// PUBLIC_INTERFACE
export function searchRecipes(q) {
  return safeFetch(`${API_BASE}/recipes/search?q=${encodeURIComponent(q)}`);
}

// PUBLIC_INTERFACE
export function getFavorites() {
  return safeFetch(`${API_BASE}/favorites`, { credentials: "include" });
}

// PUBLIC_INTERFACE
export function favoriteRecipe(recipeId) {
  return safeFetch(`${API_BASE}/favorites/${recipeId}`, {
    method: "POST",
    credentials: "include"
  });
}

// PUBLIC_INTERFACE
export function unfavoriteRecipe(recipeId) {
  return safeFetch(`${API_BASE}/favorites/${recipeId}`, {
    method: "DELETE",
    credentials: "include"
  });
}

// PUBLIC_INTERFACE
export function submitRecipe(recipe) {
  return safeFetch(`${API_BASE}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
    credentials: "include"
  });
}

// PUBLIC_INTERFACE
export function loginUser({ email, password }) {
  return safeFetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((user) => user);
}

// PUBLIC_INTERFACE
export function signupUser({ email, password }) {
  return safeFetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((user) => user);
}

// PUBLIC_INTERFACE
export function logoutUser() {
  return safeFetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

// PUBLIC_INTERFACE
export function getMe() {
  return safeFetch(`${API_BASE}/auth/me`, {
    credentials: "include"
  });
}

const API_BASE =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api";

/**
 * Lightweight API utility for backend HTTP/REST communication.
 * Methods: getAllRecipes, searchRecipes, getFavorites, favoriteRecipe, unfavoriteRecipe, submitRecipe, loginUser, signupUser, logoutUser, getMe
 */
function handleResponse(r) {
  if (r.status === 204) return {};
  return r.json().then((data) =>
    r.ok ? data : Promise.reject(data)
  );
}

// PUBLIC_INTERFACE
export function getAllRecipes() {
  return fetch(`${API_BASE}/recipes`).then(handleResponse);
}

// PUBLIC_INTERFACE
export function searchRecipes(q) {
  return fetch(`${API_BASE}/recipes/search?q=${encodeURIComponent(q)}`).then(
    handleResponse
  );
}

// PUBLIC_INTERFACE
export function getFavorites() {
  return fetch(`${API_BASE}/favorites`, { credentials: "include" }).then(
    handleResponse
  );
}

// PUBLIC_INTERFACE
export function favoriteRecipe(recipeId) {
  return fetch(`${API_BASE}/favorites/${recipeId}`, {
    method: "POST",
    credentials: "include"
  }).then(handleResponse);
}

// PUBLIC_INTERFACE
export function unfavoriteRecipe(recipeId) {
  return fetch(`${API_BASE}/favorites/${recipeId}`, {
    method: "DELETE",
    credentials: "include"
  }).then(handleResponse);
}

// PUBLIC_INTERFACE
export function submitRecipe(recipe) {
  return fetch(`${API_BASE}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
    credentials: "include"
  }).then(handleResponse);
}

// PUBLIC_INTERFACE
export function loginUser({ email, password }) {
  return fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

// PUBLIC_INTERFACE
export function signupUser({ email, password }) {
  return fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

// PUBLIC_INTERFACE
export function logoutUser() {
  return fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  }).then(handleResponse);
}

// PUBLIC_INTERFACE
export function getMe() {
  return fetch(`${API_BASE}/auth/me`, {
    credentials: "include"
  }).then(handleResponse);
}

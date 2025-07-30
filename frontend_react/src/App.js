import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RecipeGrid from "./components/RecipeGrid";
import AuthModal from "./components/AuthModal";
import RecipeModal from "./components/RecipeModal";
import FavoriteSection from "./components/FavoriteSection";
import SubmitRecipeModal from "./components/SubmitRecipeModal";
import { getMe, logoutUser } from "./utils/api";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * App root. Handles main layout, authentication state, modals, and routing.
 */
function App() {
  // UI/Theme State
  const [theme, setTheme] = useState("light");

  // Auth State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  // Modal States
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Effect: Apply theme to root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE: Show Auth Modal and handle login state
  const openAuth = () => setShowAuthModal(true);
  const closeAuth = () => setShowAuthModal(false);

  // On mount: Check if user logged in
  useEffect(() => {
    getMe()
      .then((user) => {
        setIsLoggedIn(true);
        setAuthUser(user);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setAuthUser(null);
      });
  }, []);

  // PUBLIC_INTERFACE: Handle logout
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setIsLoggedIn(false);
        setAuthUser(null);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setAuthUser(null);
      });
  };

  // PUBLIC_INTERFACE: Handle showing recipe modal
  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };
  const closeRecipeModal = () => setShowRecipeModal(false);

  // PUBLIC_INTERFACE: Handle submit modal
  const openSubmitModal = () => setShowSubmitModal(true);
  const closeSubmitModal = () => setShowSubmitModal(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar
          onThemeToggle={toggleTheme}
          theme={theme}
          onAuth={openAuth}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          openSubmitModal={openSubmitModal}
        />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <RecipeGrid
                  onRecipeClick={openRecipeModal}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                isLoggedIn ? (
                  <FavoriteSection onRecipeClick={openRecipeModal} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {showAuthModal && (
          <AuthModal
            close={closeAuth}
            afterLogin={(user) => {
              setIsLoggedIn(true);
              setAuthUser(user);
              closeAuth();
            }}
          />
        )}
        {showRecipeModal && selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            close={closeRecipeModal}
            isLoggedIn={isLoggedIn}
          />
        )}
        {showSubmitModal && (
          <SubmitRecipeModal
            onClose={closeSubmitModal}
            afterSubmit={closeSubmitModal}
          />
        )}
      </div>
    </Router>
  );
}

export default App;

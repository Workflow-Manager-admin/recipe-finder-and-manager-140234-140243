import React from "react";
import { NavLink, useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation for the app.
 * Props:
 *   onThemeToggle: function to toggle app theme
 *   theme: current theme ("light" or "dark")
 *   onAuth: handler to open auth modal if not logged in
 *   onLogout: handler to log out user
 *   isLoggedIn: bool
 *   openSubmitModal: handler for posting a new recipe
 */
export default function Sidebar({
  onThemeToggle,
  theme,
  onAuth,
  onLogout,
  isLoggedIn,
  openSubmitModal,
}) {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">🍳 RecipeBox</div>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            "nav-link" + (isActive || location.pathname === "/" ? " active" : "")
          }
          end
        >
          Recipes
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          Favorites
        </NavLink>
      </nav>
      <button className="theme-toggle" onClick={onThemeToggle} aria-label="Toggle theme">
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <div className="sidebar-bottom">
        <button className="button accent" onClick={openSubmitModal}>
          + Submit Recipe
        </button>
        {isLoggedIn ? (
          <button className="button secondary" onClick={onLogout}>
            Log out
          </button>
        ) : (
          <button className="button" onClick={onAuth}>
            Sign In / Register
          </button>
        )}
      </div>
    </aside>
  );
}

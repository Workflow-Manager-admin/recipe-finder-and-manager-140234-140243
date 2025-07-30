import React, { useState, useEffect } from "react";
import { getFavorites } from "../utils/api";

/**
 * PUBLIC_INTERFACE
 * Displays the user's favorite recipes.
 * Props:
 *   onRecipeClick: function(recipe), open modal
 */
function FavoriteSection({ onRecipeClick }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFavorites()
      .then(setFavorites)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ color: "var(--color-primary)" }}>Your Favorite Recipes</h2>
      <div className="recipe-grid">
        {favorites.length === 0 && !loading && (
          <div>
            <em>No favorites yet.</em>
          </div>
        )}
        {favorites.map((r) => (
          <div
            className="recipe-card"
            key={r.id}
            onClick={() => onRecipeClick(r)}
            tabIndex={0}
          >
            <div className="card-title">{r.title}</div>
            <div className="card-desc">{r.shortDescription}</div>
            <div className="tags">{r.tags && r.tags.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteSection;

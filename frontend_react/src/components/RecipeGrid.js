import React, { useState, useEffect } from "react";
import { searchRecipes, getAllRecipes, favoriteRecipe, unfavoriteRecipe } from "../utils/api";

/**
 * PUBLIC_INTERFACE
 * Displays a grid of recipe cards and a search bar.
 * Props:
 *   onRecipeClick: function(recipe), called when a recipe card is clicked
 *   isLoggedIn: bool, shows fav button if true
 */
function RecipeGrid({ onRecipeClick, isLoggedIn }) {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllRecipes()
      .then(setRecipes)
      .finally(() => setLoading(false));
  }, []);

  // PUBLIC_INTERFACE: They can search by text
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    searchRecipes(query)
      .then(setRecipes)
      .finally(() => setLoading(false));
  };

  // PUBLIC_INTERFACE: Handle favoriting and unfavoriting
  const handleFavorite = (recipeId, isFav) => {
    if (!isLoggedIn) return;
    const apiCall = isFav ? unfavoriteRecipe : favoriteRecipe;
    apiCall(recipeId).then((newRecipe) => {
      setRecipes((old) =>
        old.map((r) => (r.id === newRecipe.id ? newRecipe : r))
      );
    });
  };

  return (
    <div>
      <form className="search-bar-container" onSubmit={handleSearch}>
        <input
          className="search-input"
          placeholder="Search recipes by title, ingredient, etc..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search recipes"
        />
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <div className="recipe-grid">
        {recipes.length === 0 && !loading && (
          <div style={{ textAlign: "center", width: "100%" }}>
            <em>No recipes found.</em>
          </div>
        )}
        {recipes.map((r) => (
          <div
            className="recipe-card"
            key={r.id}
            onClick={() => onRecipeClick(r)}
            tabIndex={0}
            aria-label={`View details for ${r.title}`}
          >
            <div className="card-title">{r.title}</div>
            <div className="card-desc">{r.shortDescription}</div>
            <div className="tags">{r.tags && r.tags.join(", ")}</div>
            {isLoggedIn && (
              <button
                className={
                  "favorite-btn" + (r.isFavorited ? " favorited" : "")
                }
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(r.id, r.isFavorited);
                }}
              >
                {r.isFavorited ? "★ Favorited" : "☆ Favorite"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeGrid;

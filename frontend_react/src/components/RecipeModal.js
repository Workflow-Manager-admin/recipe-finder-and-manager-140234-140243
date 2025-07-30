import React from "react";

/**
 * PUBLIC_INTERFACE
 * Displays a modal containing full recipe details.
 * Props:
 *   recipe: recipe object
 *   close: function to close modal
 *   isLoggedIn: bool (not used but could add favorite)
 */
function RecipeModal({ recipe, close /*, isLoggedIn*/ }) {
  if (!recipe) return null;

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close">
          ×
        </button>
        <div className="modal-header">{recipe.title}</div>
        <div>
          <p>
            <strong>By:</strong> {recipe.author?.email || "Anonymous"}
          </p>
          <div style={{ margin: "0.5em 0 1em 0" }}>
            {recipe.tags && (
              <span style={{ color: "var(--color-secondary)", fontSize: "0.99em" }}>
                {recipe.tags.join(", ")}
              </span>
            )}
          </div>
          <p>
            <strong>Description:</strong> {recipe.shortDescription}
          </p>
          <div>
            <strong>Ingredients:</strong>
            <ul>
              {recipe.ingredients &&
                recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>
          <div>
            <strong>Steps:</strong>
            <ol>
              {recipe.instructions &&
                recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;

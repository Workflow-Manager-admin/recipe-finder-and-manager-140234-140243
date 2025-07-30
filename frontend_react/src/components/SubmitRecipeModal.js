import React, { useState } from "react";
import { submitRecipe } from "../utils/api";

/**
 * PUBLIC_INTERFACE
 * Modal for submitting a new recipe.
 * Props:
 *   onClose: function to close dialog
 *   afterSubmit: function, called after successful submission
 */
function SubmitRecipeModal({ onClose, afterSubmit }) {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [tags, setTags] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    submitRecipe({
      title,
      shortDescription,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      ingredients: ingredients
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      instructions: instructions
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    })
      .then(() => {
        setTitle("");
        setShortDescription("");
        setTags("");
        setIngredients("");
        setInstructions("");
        if (afterSubmit) afterSubmit();
      })
      .catch(() => setError("Failed to submit recipe. Try again!"))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close">
          ×
        </button>
        <div className="modal-header">Submit New Recipe</div>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="sr-title">Title</label>
            <input
              id="sr-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              maxLength={80}
            />
          </div>
          <div className="form-field">
            <label htmlFor="sr-description">Short Description</label>
            <input
              id="sr-description"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              maxLength={140}
            />
          </div>
          <div className="form-field">
            <label htmlFor="sr-tags">Tags (comma separated)</label>
            <input
              id="sr-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. vegan, dessert"
            />
          </div>
          <div className="form-field">
            <label htmlFor="sr-ingredients">Ingredients (one per line)</label>
            <textarea
              id="sr-ingredients"
              rows={4}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="sr-instructions">Instructions (one step per line)</label>
            <textarea
              id="sr-instructions"
              rows={6}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>
          {error && <div className="form-errors">{error}</div>}
          <div className="form-actions">
            <button
              className="button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitRecipeModal;

import React, { useState } from "react";
import { loginUser, signupUser } from "../utils/api";

/**
 * PUBLIC_INTERFACE
 * AuthModal: User authentication modal (login/signup).
 * Props:
 *   close: function to close modal
 *   afterLogin: function(user) called after successful login/signup
 */
function AuthModal({ close, afterLogin }) {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handler for login/signup
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    const action =
      mode === "login"
        ? loginUser({ email, password })
        : signupUser({ email, password });
    action
      .then((user) => {
        afterLogin(user);
      })
      .catch((err) =>
        setErrors(
          err?.message ||
            (mode === "signup"
              ? "Failed to sign up."
              : "Login failed. Check your credentials.")
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close">
          ×
        </button>
        <div className="modal-header">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="auth-pass">Password</label>
            <input
              id="auth-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {errors && <div className="form-errors">{errors}</div>}
          <div className="form-actions">
            <button className="button" type="submit" disabled={loading}>
              {loading
                ? mode === "login"
                  ? "Signing in..."
                  : "Signing up..."
                : mode === "login"
                ? "Sign In"
                : "Sign Up"}
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login"
                ? "Need an account? Sign Up"
                : "Have an account? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;

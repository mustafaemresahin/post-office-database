import React from "react";
import '../LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-card"> {/* Wrap in login-card */}
          <div className="login-form">
            <form>
              <div className="username-field">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  className="username-input"
                />
              </div>
              <div className="password-field">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="password-input"
                />
              </div>
              <div className="submit-button">
                <button variant="primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
            <div className="register-link">
              <a href="/register">Register Account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

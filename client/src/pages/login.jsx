import React from "react";
import '../LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-card"> {/* Wrap in login-card */}
        <h1>Login</h1>
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
            
          </div>
          <div className="register-link">
            <p>If you don't have an account <a href="/register">Register Account</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

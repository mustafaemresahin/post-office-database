import React from "react";

// No need to import CSS file if you're not using any external styles
// import "./styles.css";

const LoginPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "40rem" }}>
        <div style={{ padding: "20px" }}>
          <form>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="text"
                placeholder="Username"
                required
                style={{ width: "200px" }}
                className="form-control-sm"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ padding: "10px" }}>
                Please enter your unique username.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="password"
                placeholder="Password"
                required
                style={{ width: "200px" }}
                className="form-control-sm"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}>
              <button variant="primary" type="submit">
                Submit
              </button>
            </div>
          </form>
          <div style={{ textAlign: "center", paddingTop: "10px" }}>
            <a href="/register">Register Account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

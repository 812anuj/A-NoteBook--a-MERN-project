import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook

function Signup({ showAlert }) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      showAlert("Passwords do not match!", "danger");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      showAlert("Account created successfully!", "success");
      navigate("/"); // ✅ redirect to home page
    } else {
      showAlert("Invalid details or user already exists!", "danger");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-50 border p-4 shadow rounded bg-light"
      >
        <h3 className="text-center mb-4">Signup</h3>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
          <label htmlFor="name">Enter Your Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
            minLength={5}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            minLength={5}
          />
          <label htmlFor="cpassword">Confirm Password</label>
        </div>

        <button type="submit" className="btn btn-outline-success w-100">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;


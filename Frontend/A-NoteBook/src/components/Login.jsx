import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import navigate hook

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // hook to redirect

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      showAlert("Login successful!", "success");
      navigate("/"); // redirect to home page
    } else {
      showAlert("Invalid credentials", "danger");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <form onSubmit={handleSubmit} className="w-50 border p-4 shadow rounded bg-light">
        <h3 className="text-center mb-4">Login</h3>

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
          />
          <label htmlFor="password">Password</label>
        </div>

        <button type="submit" className="btn btn-outline-success w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;



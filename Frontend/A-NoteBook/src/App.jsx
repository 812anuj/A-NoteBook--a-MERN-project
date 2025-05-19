import { useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

// Protected route component
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

// Redirect logged-in users away from login/signup
const GuestRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return !isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <>
      <Navbar />
      <Alert alert={alert} />
      <div className='container'>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={Home} showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<GuestRoute element={Signup} showAlert={showAlert} />} />
          <Route path="/login" element={<GuestRoute element={Login} showAlert={showAlert} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;




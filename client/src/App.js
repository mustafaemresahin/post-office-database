import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import LoginScreen from './pages/login';
import Registration from './pages/register';
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container"> {/* Wrap header and routes in a container */}
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<About />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import LoginScreen from './pages/login'; // Import your LoginScreen component
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes> {/* Corrected import to use Routes */}
        <Route
          path = "/"
          element = {<About/>}
        />
        <Route
          path = "/login"
          element = {<LoginScreen />}
        />
      </Routes>
    </Router>
  );
};

export default App;
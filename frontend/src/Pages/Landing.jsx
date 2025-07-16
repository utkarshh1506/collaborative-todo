import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import "./Landing.css";
import Login from "../Components/Login";
import Register from "../Components/Register";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div className="landing-container">
      <NavBar
        onLoginClick={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
        onRegisterClick={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <main className="main-section">
        <Hero />
      </main>
      <Footer />
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onLoginClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default Landing;

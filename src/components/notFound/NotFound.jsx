import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for doesn’t exist.</p>
        <Link to="/" className="home-btn">Go Back Home</Link>
      </div>
    </div>
  );
}

export default NotFound;

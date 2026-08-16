import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page-container">
      <div className="card not-found-page">

        <h1>
          404
        </h1>

        <h2>
          Page Not Found
        </h2>

        <p>
          The page you are looking for does not exist or has been moved.
        </p>

        <Link to="/" className="btn-primary">
          Go To Dashboard
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
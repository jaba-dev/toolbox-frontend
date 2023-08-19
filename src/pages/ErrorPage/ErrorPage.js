import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>404 - Something went wrong</h1>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default ErrorPage;

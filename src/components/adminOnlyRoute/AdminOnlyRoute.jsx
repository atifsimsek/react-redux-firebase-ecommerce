import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const adminEmail = useSelector(selectEmail);

  if (adminEmail === process.env.REACT_APP_ADMIN_USER) {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permisson Denied</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/react-redux-firebase-ecommerce/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const adminEmail = useSelector(selectEmail);

  if (adminEmail === "test@gmail.com") {
    return children;
  }

  return null;
};

export default AdminOnlyRoute;

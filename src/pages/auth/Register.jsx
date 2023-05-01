import React from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config.js";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }
    setLoading(true);

    // Create User

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Registration Successful...");
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.form}>
          <h2>Register</h2>

          <form onSubmit={registerUser}>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              placeholder="Email"
              type="text"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
              placeholder="Password"
              type="password"
            />
            <input
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
              value={cPassword}
              required
              placeholder="Confirm Password"
              type="password"
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <p>Already on account?</p>
            <Link to="/login">Login</Link>
          </span>
        </div>

        <div className={styles.img}>
          <img src={registerImg} alt="register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;

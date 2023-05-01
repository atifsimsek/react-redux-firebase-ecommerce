import styles from "./auth.module.scss";
import resetImg from "../../assets/forgot.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    //Reset User
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="register" width="400" />
        </div>

        <div className={styles.form}>
          <h2>Reset Password</h2>

          <form onSubmit={resetPassword}>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              placeholder="Email"
              type="text"
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/login">-Login</Link>
              </p>
              <p>
                <Link to="/register">-Register</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Reset;

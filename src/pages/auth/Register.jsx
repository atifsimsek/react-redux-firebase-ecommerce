import React from 'react'
import styles from "./auth.module.scss"
import registerImg from "../../assets/register.png"
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>


        <div className={styles.form}>
          <h2>Register</h2>

          <form>
            <input required placeholder='Email' type="text" />
            <input required placeholder='Password' type="password" />
            <input required placeholder='Confirm Password' type="password" />
            <button className="--btn --btn-primary --btn-block" >Register</button>
          </form>
          <span className={styles.register}>
            <p>Already on account?</p>
            <Link to="/login">
              Login
            </Link>
          </span>

        </div>
  
      <div className={styles.img}>
        <img src={registerImg} alt="register" width="400" />
      </div>


    </section>
  )
}

export default Register
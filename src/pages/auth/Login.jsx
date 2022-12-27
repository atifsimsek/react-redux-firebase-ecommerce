import React from 'react'
import styles from "./auth.module.scss"
import loginImg from "../../assets/login.png"
import { Link } from "react-router-dom"
import { FaGoogle } from 'react-icons/fa'
import Card from '../card/Card'
const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>

      <div className={styles.form}>
        <h2 className={styles}>Login</h2>

        <form>
          <input required placeholder='Email' type="text" />
          <input required placeholder='Placeholder' type="password" />
          <button className="--btn --btn-primary --btn-block" >Login</button>
          <div className={styles.links}>
            <Link to="/reset">
              Forgot Password
            </Link>
          </div>
          <p>-- or --</p>

        </form>
        <button className="--btn --btn-danger --btn-block" ><FaGoogle color='#fff' /> Login With Google</button>
        <span className='{styles.register'>
          <p>Don't have an account</p>
          <Link to="/register">Register</Link>
        </span>
      </div>


    </section>
  )
}

export default Login
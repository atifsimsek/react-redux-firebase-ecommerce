import { useState } from 'react'
import styles from "./auth.module.scss"
import loginImg from "../../assets/login.png"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle } from 'react-icons/fa'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config"
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSelector } from 'react-redux'
import { selectPreviousURL } from '../../redux/slice/cartSlice'



const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const previousURL = useSelector(selectPreviousURL)

  const navigate = useNavigate()


  const redirectUser = () =>{
    if(previousURL.includes("cart")){
      return navigate("/cart")
    }
    else{
      return navigate("/react-redux-firebase-ecommerce")
    }
  }

  const loginUser = (e) => {
    e.preventDefault()
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        setLoading(false)
        toast.success("Login Succsessful...")
        redirectUser()
        // ...
      })
      .catch((error) => {
        toast.error(error.message)
        setLoading(false)
      });

  }

  // Login With Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login Successfully")
        redirectUser()
      }).catch((error) => {
        toast.error(error.message)
      });

  }



  return (
    <>
      {loading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <div className={styles.form}>
          <h2 className={styles}>Login</h2>

          <form onSubmit={loginUser}>
            <input onChange={(e) => { setEmail(e.target.value) }} value={email} required placeholder='Email' type="text" />
            <input onChange={(e) => { setPassword(e.target.value) }} value={password} required placeholder='Placeholder' type="password" />
            <button type='submit' className="--btn --btn-primary --btn-block" >Login</button>
            <div className={styles.links}>
              <Link to="/reset">
                Forgot Password
              </Link>
            </div>
            <p>-- or --</p>

          </form>
          <button onClick={signInWithGoogle} className="--btn --btn-danger --btn-block" ><FaGoogle color='#fff' /> Login With Google</button>
          <span className='{styles.register'>
            <p>Don't have an account</p>
            <Link to="/register">Register</Link>
          </span>
        </div>


      </section>
    </>
  )
}

export default Login
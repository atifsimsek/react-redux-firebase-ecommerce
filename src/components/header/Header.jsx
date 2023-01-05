import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config"
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { SET_ACTİVE_USER, REMOVE_ACTİVE_USER } from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/HiddenLink";
import AdminOnlyRoute, { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";


// Helper Components

const logo = (
  <div className={styles.logo}>
    <Link>
      <h2>
        e<span>Commerce</span>.
      </h2>
    </Link>
  </div>
)
const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
)

const Header = () => {

  const [showMenu, setShowMenu] = useState(false)
  const [displayName, setdisplayName] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()




  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.split("@")[0]
          const uName = u1.charAt(0).toLocaleUpperCase() + u1.slice(1)
          setdisplayName(uName)
        }
        else {
          setdisplayName(user.displayName)
        }
        dispatch(SET_ACTİVE_USER({
          email: user.email,
          userName: displayName,
          userID: user.uid,
        }))
      } else {
        setdisplayName("")
        dispatch(REMOVE_ACTİVE_USER())
      }
    });
  }, [dispatch, displayName])


  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  const activeLink = ({ isActive }) =>
    (isActive ? `${styles.active}` : "")

  const logoutUser = () => {

    signOut(auth).then(() => {
      toast.success("Logout successfully")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }


  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        className="toast"
      />
      <header>
        <div className={styles.header}>
          {logo}

          <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`} >
            <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]} ` : `${styles["nav-wrapper"]}`}
              onClick={hideMenu}
            >
            </div>

            {/*****  Navigate Area *****/}

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <AdminOnlyLink>
                  {" "}
                  <Link to="/admin/home">
                    <button className="--btn --btn-primary">Admin</button>
                  </Link>
                </AdminOnlyLink>
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={activeLink} to="/contact">
                  Contact Us
                </NavLink>
              </li>
            </ul>

              {/***** User Login/Logout *****/}
            <div onClick={hideMenu} className={styles["header-right"]}>
              <span className={styles.links}>

                <ShowOnLogout>
                  <NavLink className={activeLink} to="/login">Login</NavLink>
                  <NavLink className={activeLink} to="/register">Register</NavLink>
                </ShowOnLogout>
                <ShowOnLogin>
                  <a style={{ color: "#ff7722" }} href="#home"><FaUserCircle size={16} /> Hi,{displayName}</a>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink className={activeLink} to="/order-history">My Orders</NavLink>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink onClick={logoutUser} to="/order-history">Logout</NavLink>
                </ShowOnLogin>

              </span>
              {cart}

            </div>

          </nav>
          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>

        </div>
      </header >
    </>
  );
};

export default Header;

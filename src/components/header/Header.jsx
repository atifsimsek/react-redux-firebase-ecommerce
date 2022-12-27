import styles from "./Header.module.scss"
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa"
import { HiOutlineMenuAlt3 } from "react-icons/hi"

import { useState } from "react";
const Header = () => {

  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }



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

  const activeLink = ({ isActive }) =>
    (isActive ? `${styles.active}` : "")

  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`} >
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]} ` : `${styles["nav-wrapper"]}`}
            onClick={hideMenu}
          >
          </div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
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
          <div onClick={hideMenu} className={styles["header-right"]}>
            <span className={styles.links}>
              <NavLink className={activeLink} to="/login">Login</NavLink>
              <NavLink className={activeLink} to="/register">Register</NavLink>
              <NavLink className={activeLink} to="/order-history">My Orders</NavLink>
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
  );
};

export default Header;

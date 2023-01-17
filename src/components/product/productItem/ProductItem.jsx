import { Link } from "react-router-dom"
import Card from "../../../pages/card/Card"
import styles from "./ProductItem.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { ADD_TO_CART, selectCartItems } from "../../../redux/slice/cartSlice"

const ProductItem = ({ product, grid, id, name, price, desc, imageUrl }) => {

  const dispatch = useDispatch()

  const shortenText = (text, n = 15) => {

    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...")

      return shortenedText
    }

    return text

  }



  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))

  }

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details} >
          <p>{`$${price} `}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)} </p>}

        <button onClick={() => { addToCart(product) }} className="--btn --btn-danger">Add To Cart</button>
      </div>
    </Card>
  )
}

export default ProductItem
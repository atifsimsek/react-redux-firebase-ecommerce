import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../../firebase/config'
import styles from "./ProductDetails.module.scss"
import spinner from "../../../assets/spinner.jpg"
import { ADD_TO_CART, CALCULATE_CARTQUANTİTY, DECREASE_CART, selectCartItems } from '../../../redux/slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  const cartItems = useSelector(selectCartItems)

  console.log(cartItems)
  const cartItem = cartItems.find((item) => item.id === id)


  const dispatch = useDispatch()

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {

    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setProduct(obj)
    } else {
      toast.error("Product not found")
    }

  }


  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_CARTQUANTİTY())

  }


  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_CARTQUANTİTY())
  }


  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_CARTQUANTİTY())
  }



  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr;Back To Products</Link>
        </div>

        {product === null ? (<img src={spinner} alt="Loading" style={{ width: "50px" }} />) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU: </b>{id}
                </p>
                <p>
                  <b>Brand: </b>{product.brand}
                </p>
                {
                  cartItem?.cartQuantity
                    ?(
                      <div className={styles.count}>
                        <button onClick={() => { decreaseCart(product) }} className='--btn'>-</button>
                        <p>
                          <b>{cartItem?.cartQuantity}</b>
                        </p>
                        <button onClick={() => { increaseCart(product) }} className='--btn'>+</button>
                      </div>
                    )
                    : null
                }
                <button onClick={() => { addToCart(product) }} className='--btn --btn-danger'>ADD TO CART</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}


export default ProductDetails
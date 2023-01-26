
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from "./ProductDetails.module.scss"
import spinner from "../../../assets/spinner.jpg"
import { ADD_TO_CART, CALCULATE_CARTQUANTİTY, DECREASE_CART, selectCartItems } from '../../../redux/slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import useFetchDocument from '../../../customHooks/useFetchDocument'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Card from '../../../pages/card/Card'
import StarsRating from 'react-star-rate'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { document } = useFetchDocument("products", id)
  const { data } = useFetchCollection("reviews")
  const filterReviews = data.filter((review) => review.productID === id)

  const cartItems = useSelector(selectCartItems)

  const cartItem = cartItems.find((item) => item.id === id)


  const dispatch = useDispatch()

  useEffect(() => {
    setProduct(document)
  }, [document])



  // const getProduct = async () => {

  //   const docRef = doc(db, "products", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const obj = {
  //       id: id,
  //       ...docSnap.data()
  //     }
  //     setProduct(obj)
  //   } else {
  //     toast.error("Product not found")
  //   }

  // }


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
          <Link to="/react-redux-firebase-ecommerce/#products">&larr;Back To Products</Link>
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
                    ? (
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
        <Card cardClass={styles.cardClass}>
          <h3>Product Reviews</h3>
          <div>
            {filterReviews.length === 0 ? (
              <p>There are no reviwes for this product yet.</p>
            ) : (
              <>
                {filterReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item
                  console.log(item)
                  return (
                    <div key={index} className={styles.review}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {userName}</b>
                      </span>


                    </div>
                  )
                })}
              </>
            )
            }
          </div>

        </Card>
      </div>
    </section>
  )
}


export default ProductDetails
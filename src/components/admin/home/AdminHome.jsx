import { useEffect } from "react"
import { AiFillDollarCircle } from "react-icons/ai"
import { BsCart4 } from "react-icons/bs"
import { FaCartArrowDown } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import useFetchCollection from "../../../customHooks/useFetchCollection"
import { CALC_TOTAL_ORDER_AMOUNT, selectOrderHistory, selectTotalOrderAmount, STORE_ORDERS } from "../../../redux/slice/orderSlice"
import { selectProducts, STORE_PRODUCTS } from "../../../redux/slice/productsSlice"
import InfoBox from "../../infoBox/InfoBox"
import styles from "./AdminHome.module.scss"

const AdminHome = () => {

  const dispatch = useDispatch()

  const products = useSelector(selectProducts)
  const orders = useSelector(selectOrderHistory)
  const totalOrderAmount = useSelector(selectTotalOrderAmount)

  const firebaseProducts  = useFetchCollection("products")
  const  firebaseOrders = useFetchCollection("orders")

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products: firebaseProducts.data
    }))
    dispatch(STORE_ORDERS(firebaseOrders.data))
    dispatch(CALC_TOTAL_ORDER_AMOUNT({
      amount: firebaseOrders.data
    }))
  }, [dispatch,firebaseProducts,firebaseOrders])




  const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />
  const productIcon = <BsCart4 size={30} color="#1f93ff" />
  const ordersIcon = <FaCartArrowDown size={30} color="orangered" />

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
    </div>
  )
}

export default AdminHome
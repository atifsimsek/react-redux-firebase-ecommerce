
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useFetchCollection from "../../../customHooks/useFetchCollection"
import { selectOrderHistory, STORE_ORDERS } from "../../../redux/slice/orderSlice"
import Loader from "../../loader/Loader"
import styles from "./AdminOrders.module.scss"

const AdminOrders = () => {
  const { data, isLoading } = useFetchCollection("orders")
  const orderHistory = useSelector(selectOrderHistory)
  // const userID = useSelector(selectUserID)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(STORE_ORDERS(data))
  }, [dispatch, data])


  const handleClick = (id) => {

    navigate(`/admin/order-details/${id}`)

  }


  return (
    <>
      <div className={styles.order}>
        <h2>All Order History</h2>
        <p>Open an order to leave a <b>Change order status</b></p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {orderHistory.length === 0
              ? (<p>Order list empty</p>)
              : (
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Date</th>
                      <th>Order ID</th>
                      <th>Order Amount</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orderHistory.map((order, index) => {
                        const { id, orderDate, orderTime, orderAmount, orderStatus } = order

                        return (
                          <tr key={id} onClick={() => { handleClick(id) }}>
                            <td>{index + 1}</td>
                            <td>{orderDate} at {orderTime}</td>
                            <td>{id}</td>
                            <td> {"$"}{orderAmount}</td>
                            <td>
                              <p className={orderStatus !== "Delivered" ? `${styles.pending}` : `${styles.delivered}`}>{orderStatus}</p>
                            </td>
                          </tr>
                        )

                      })
                    }
                  </tbody>
                </table>
              )}
          </div>
        </>

      </div>
    </>
  )
}

export default AdminOrders
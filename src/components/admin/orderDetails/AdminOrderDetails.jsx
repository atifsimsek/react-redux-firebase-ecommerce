import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";
const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={` ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/admin/orders">&larr;Back To Orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID</b> {order.id}
            </p>
            <p>
              <b>Order Amount</b> $ {order.orderAmount}
            </p>
            <p>
              <b>Order Status</b> {order.orderStatus}
            </p>
            <p>
              <b>Shipping Address</b>
              <br />
              <b>Address: </b> {order.shippingAddress.line1},{" "}
              {order.shippingAddress.line2}, {order.shippingAddress.city}
              <br />
              <b>State: </b>
              {order.shippingAddress.state}
              <br />
              <b> Country:</b> {order.shippingAddress.country}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageUrl, cartQuantity } = cart;

                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageUrl}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>$ {price}</td>
                      <td>{cartQuantity}</td>
                      <td>$ {(price * cartQuantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default AdminOrderDetails;

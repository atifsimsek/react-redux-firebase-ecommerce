import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Card from "../../../pages/card/Card";
import Loader from "../../loader/Loader";
import styles from "./changeOrderStatus.module.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setLoading(true);

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      setLoading(false);
      toast.success("Order status changes successfully");
      navigate("/admin/orders");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form
            onSubmit={(e) => {
              editOrder(e, id);
            }}
          >
            <span>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="" disabled>
                  -- Select one --
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button className="--btn --btn-primary" type="submit">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;

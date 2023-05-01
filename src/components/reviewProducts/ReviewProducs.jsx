import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { db } from "../../firebase/config";
import { Card } from "../../pages";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import spinnerImg from "../../assets/spinner.jpg";
import styles from "./ReviewProducts.module.scss";

const ReviewProducs = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { document } = useFetchDocument("products", id);

  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      productID: id,
      userName,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Rate This Product</h2>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product.name}
            </p>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating :</label>
            <StarsRating
              value={rate}
              onChange={(value) => {
                setRate(value);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => {
                setReview(e.target.value);
              }}
              cols="30"
              rows="10"
            ></textarea>
            <button className="--btn --btn-primary">Submit Review</button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducs;

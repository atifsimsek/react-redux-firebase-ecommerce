import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productsSlice";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import spinner from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { data, loading } = useFetchCollection("products");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [data, dispatch]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {loading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {loading ? (
            <img
              src={spinner}
              style={{ width: "50px" }}
              className="--center-all"
              alt=""
            />
          ) : (
            <ProductList products={products} />
          )}
          <div
            onClick={() => {
              setShowFilter(!showFilter);
            }}
            className={styles.icon}
          >
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;

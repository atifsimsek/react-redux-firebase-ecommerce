import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productsSlice";
import styles from "./ProductFilter.module.scss";

const ProductFilter = () => {
  const [category, setCategry] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  //Filter by Brand
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  //Filter by Range
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  //Filter by Category
  const filterProducts = (cat) => {
    setCategry(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  //Clear Filter

  const clearFilter = () => {
    setCategry("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              type="button"
              key={index}
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => {
                filterProducts(cat);
              }}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Categories</h4>
      <div className={styles.brand}>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          name="brand"
        >
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {" "}
                {brand}
              </option>
            );
          })}
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className={styles.price}>
          <input
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="range"
            name="proce"
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <br />
        <button onClick={clearFilter} className="--btn --btn-danger">
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;

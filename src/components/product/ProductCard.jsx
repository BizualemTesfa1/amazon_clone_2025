import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../currencyFormat/CurrencyFormat";
import styles from "./Product.module.css"
import { Link } from "react-router-dom";

function ProductCard({product,flex}) {
    const {image, title, id, rating, price} =product
  return (
    <div className={`${styles.card_container} ${flex?styles.product_flexed : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className={styles.img_container}/>
      </Link>
      <div>
        <h3>{title}</h3>

        <div className={styles.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* count */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        <button className={styles.button}>
            add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

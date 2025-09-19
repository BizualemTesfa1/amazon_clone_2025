import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../currencyFormat/CurrencyFormat";
import styles from "./Product.module.css"
import { Link } from "react-router-dom";
import { Type } from "../../utility/action.type";
import { DataContext } from "../dataProvider/DataProvider";

function ProductCard({product,flex, renderDesc, renderAdd}) {
    const {image, title, id, rating, price, description} =product;

const [state, dispatch] = useContext(DataContext)

const addToCart = ()=>{
  dispatch({
    type: Type.ADD_TO_BASKET,
    item: {
      image,
      title,
      id,
      rating,
      price,
      description,
    },
  });
}

  return (
    <div
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className={styles.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "600px" }}>{description}</div>}
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
        {
        renderAdd && 
        <button className={styles.button} onClick={addToCart}>
          add to cart
        </button>
        }
      </div>
    </div>
  );
}

export default ProductCard;

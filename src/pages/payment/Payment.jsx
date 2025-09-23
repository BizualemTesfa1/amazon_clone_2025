import React, { useContext, useState } from "react";
import LayOut from "../../components/layout/LayOut";
import { DataContext } from "../../components/dataProvider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import styles from "./Payment.module.css";
import CurrencyFormat from "../../components/currencyFormat/CurrencyFormat";

function Payment() {
  const [{user, basket }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null)

const stripe = useStripe()
const elements = useElements()

const handeleChange = (e)=>{
  e?.error?.message? setCardError(e?.error?.message): setCardError("")
}

  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment_header}>Checkout {totalItem} items</div>
      {/* payment method */}
      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 test street</div>
            <div>test, tt</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={styles.flex}>
          <h3>Payment Methods</h3>
          <div className={styles.payment_card_container}>
            <div className={styles.payment_details}>
              <form action="">
                {/* Error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handeleChange} />
                {/* price */}
                <div className={styles.payment_price}>
                  <div>
                    <span style={{display:"flex", gap: "5px"}}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;

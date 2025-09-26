import React, { useContext, useState } from "react";
import LayOut from "../../components/layout/LayOut";
import { DataContext } from "../../components/dataProvider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {ClipLoader} from "react-spinners"
import styles from "./Payment.module.css";
import CurrencyFormat from "../../components/currencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";
import { db } from "../../utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utility/action.type";

function Payment() {
  const [{user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)

const stripe = useStripe()
const elements = useElements()
const navigate = useNavigate()

const handelChange = (e)=>{
  e?.error?.message? setCardError(e?.error?.message): setCardError("")
}
const handelPayment = async(e)=>{
  e.preventDefault();
  try {
    setProcessing(true)
    // 1. backend -----> contact to the client secret
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total*100}`,
    });
    console.log(response.data)
    const clientSecret = response.data?.clientSecret;
    
    // client side confirmation
    const {paymentIntent} = await stripe.confirmCardPayment(
      clientSecret, 
      {
        payment_method:{
          card: elements.getElement(CardElement)
      }
  } )
  console.log(paymentIntent)
  // after confirmation ----> order store to database and clear basket
  // await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
  //   basket: basket,
  //   amount: paymentIntent.amount,
  //   created: paymentIntent.created
  // })
  await setDoc(
    doc(
      collection(doc(collection(db, "users"), user.uid), "orders"),
      paymentIntent.id
    ),
    {
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    }
  );
  // empty basket
dispatch({type: Type.EMPTY_BASKET})

  setProcessing(false)

  navigate("/orders", {state: {msg:"you have placed new order"}})
}catch (error) {
    console.log(error)
    setProcessing(false)
  }

  
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
            <div>test, tm</div>
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
              <form action="" onSubmit={handelPayment}>
                {/* Error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handelChange} />
                {/* price */}
                <div className={styles.payment_price}>
                  <div>
                    <span style={{display:"flex", gap: "5px"}}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {
                      processing?(
                        <div className={styles.loading}>
                          <ClipLoader color="grey" size={12}/>
                          <p>Please wait ...</p>
                        </div>
                      ): ("Pay Now")
                    }
              
                    </button>
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

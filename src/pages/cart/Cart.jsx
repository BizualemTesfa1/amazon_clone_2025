import React, { useContext } from 'react'
import LayOut from '../../components/layout/LayOut'
import { DataContext } from '../../components/dataProvider/DataProvider'
import ProductCard from '../../components/product/ProductCard'
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Cart.module.css"
import { Type } from '../../utility/action.type'

function Cart() {

const [{basket,user},dispatch] = useContext(DataContext)
const total = basket.reduce((amount, item)=>{
 return item.price *item.amount + amount
}, 0)

const increment =(item)=>{
  dispatch({
    type:Type.ADD_TO_BASKET,
    item
  })
}

const decrement =(id)=>{
  dispatch({
    type:Type.REMOVE_FROM_BASKET, 
    id
  })
}

  return (
    <LayOut>
      <section className={styles.cartContainer}>
        <div className={styles.cartItems}>
          <h2>hello</h2>
          <h3>your shoping basket</h3> <hr />
          {basket?.length == 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={styles.cart_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={styles.btn_container}>
                    <button
                      className={styles.btn}
                      onClick={() => increment(item)}
                    >
                      {" "}
                      <IoIosArrowUp size={30}/>
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={styles.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={30}/>
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {basket.length !== 0 && (
          <div className={styles.cartSummary}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments"> Continue to checkout </Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart
import React, { useContext } from 'react'
import LayOut from '../../components/layout/LayOut'
import { DataContext } from '../../components/dataProvider/DataProvider'
import ProductCard from '../../components/product/ProductCard'
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import styles from "./Cart.module.css"

function Cart() {

const [{basket,user},dispatch] = useContext(DataContext)
const total = basket.reduce((amount, item)=>{
 return item.price *item.amount + amount
}, 0)

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
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
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
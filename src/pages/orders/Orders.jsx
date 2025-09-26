import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../components/layout/LayOut";
import { db } from "../../utility/firebase";
import { DataContext } from "../../components/dataProvider/DataProvider";

import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import styles from "./Orders.module.css";
import ProductCard from "../../components/product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // if (user) {
    //   db.collection("users")
    //     .doc("user.uid")
    //     .collection("orders")
    //     .orderBy("created", "desc")
    //     .onSnapshot((snapshot) => {
    //       console.log(snapshot);
    //       setOrders(
    //         snapshot.docs.map((doc)=>({
    //           id: doc.id,
    //           data: doc.data()
    //         })
    //       ))
    //     });

   if (user) {
     const ordersRef = collection(db, "users", user.uid, "orders");
     const q = query(ordersRef, orderBy("created", "desc"));

     const unsubscribe = onSnapshot(q, (snapshot) => {
       setOrders(
         snapshot.docs.map((doc) => ({
           id: doc.id,
           data: doc.data(),
         }))
       );
     });

     return () => unsubscribe();
   } else {
     setOrders([]);
   }
  }, []);
  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.orders_container}>
          <h2>Your Orders</h2>
          {
            orders?.length === 0 && <div style={{padding: "20px"}}>You don't have orders yet</div>
          }
          <div>
            {
              orders?.map((eachOrder, i)=>{
                return (
                  <div key={i}>
                    <hr />
                    <p>Order ID: {eachOrder?.id}</p>
                    {
                      eachOrder?.data?.basket?.map((order)=>{
                        return <ProductCard flex={true} product={order}
                        key={order.id || index}
                        />
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;

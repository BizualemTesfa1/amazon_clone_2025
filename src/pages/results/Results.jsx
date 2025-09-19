import React, { useEffect, useState } from 'react'
import LayOut from '../../components/layout/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/endPoints'
import ProductCard from '../../components/product/ProductCard'
import styles from "./Result.module.css"
import Loader from '../../components/loader/Loader'

function Results() {
  const [results, setResults] =useState([])
  const [isLoading, setIsloading] =useState(false)
  const {categoryName} = useParams()
  useEffect(()=>{
    setIsloading(true)
   axios.get(`${productUrl}/products/category/${categoryName}`)

    .then((res)=>{
      setResults(res.data)
      setIsloading(false)
    }).catch((err)=>{
      console.log(err)
      setIsloading(false)
    })
  }, [])
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}> category {categoryName}</p> <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.products_container}>
            {results?.map((product) => (
              <ProductCard 
              key={product.id} 
              product={product}
              renderDesc={false}
              renderAdd={true} 
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results
import React, { useEffect, useState } from 'react'
import LayOut from '../../components/layout/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/endPoints'
import ProductCard from '../../components/product/ProductCard'
import styles from "./Result.module.css"

function Results() {
  const [results, setResults] =useState([])
  const {categoryName} = useParams()
  useEffect(()=>{
   axios.get(`${productUrl}/products/category/${categoryName}`)

    .then((res)=>{
      setResults(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])
  return (
    <LayOut >   
      <section>
        <h1 style={{padding:"30px"}}>Results</h1>
        <p style={{padding:"30px"}}> category {categoryName}</p> <hr />
        <div className={styles.products_container }>
           
         {
          results?.map((product)=>(
            <ProductCard key={product.id} product={product} />
          ))
         } 

        </div>
      </section>
    </LayOut>
  )
}

export default Results
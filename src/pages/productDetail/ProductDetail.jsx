import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../API/endPoints'
import ProductCard from '../../components/product/ProductCard'
import LayOut from '../../components/layout/LayOut'


function ProductDetail() {
  const {productId} = useParams()
  const [product, setProduct] =useState([])
  useEffect(()=>{
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setProduct(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <LayOut>
      <ProductCard  product={product}/>
    </LayOut>
  )
}

export default ProductDetail
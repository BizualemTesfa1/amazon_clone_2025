import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../API/endPoints'
import ProductCard from '../../components/product/ProductCard'
import LayOut from '../../components/layout/LayOut'
import Loader from '../../components/loader/Loader'


function ProductDetail() {
  const {productId} = useParams()
  const [product, setProduct] =useState([])
  const [isLoading, setIsLoading] =useState(false)
  useEffect(()=>{
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setProduct(res.data)
      setIsLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  },[])
  return (
    <LayOut>
      {isLoading? (<Loader/>) : (

      <ProductCard  product={product}/>
      )}
    </LayOut>
  )
}

export default ProductDetail
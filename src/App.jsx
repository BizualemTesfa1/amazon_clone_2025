import React, { useContext, useEffect } from 'react'
import Header from './components/header/Header'
import CarouselEffect from './components/carousel/Carousel'
import Category from './components/category/Category'
import Product from './components/product/Product'
import Landing from './pages/landing/Landing'
import Router  from './Router'
import { DataContext } from './components/dataProvider/DataProvider'
import { Type } from './utility/action.type'
import { auth } from './utility/firebase'



function App() {
  const [user, dispatch] = useContext(DataContext)
useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
    console.log(authUser)
    dispatch({
      type:Type.SET_USER,
      user:authUser
    })
  }else{
    dispatch({
      type:Type.SET_USER,
      user:null
    })

  }
})
}, [])
  return (
    <>
      <Router/>
    </>
  )
}

export default App
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Payment from './pages/payment/Payment'
import Orders from './pages/orders/Orders'
import Cart from './pages/cart/Cart'
import Results from './pages/results/Results'
import ProductDetail from './pages/productDetail/ProductDetail'
import Auth from './pages/auth/Auth'
import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'

function Router() {
  const stripePromise = loadStripe(
    "pk_test_51SA6if1LkBsRfvdj1tKmcO1UX5yoWHN2OByRUCoWxtngWVD9Mc3SdC71Pi8GK8sn6AqfbIzQ6tIpmQty6VYa01e800Cny7jxsx"
  );
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/payments' element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
          } />
        <Route path='/orders' element={<Orders />}/>
        <Route path='/category/:categoryName' element={<Results />}/>
        <Route path='/products/:productId' element={<ProductDetail />}/>
        <Route path='/cart' element={<Cart />}/>
    </Routes>

    </BrowserRouter>
  )
}

export default Router
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './pages/landing/Landing'
import SignUp from './pages/auth/SignUp'
import Payment from './pages/payment/Payment'
import Orders from './pages/orders/Orders'
import Cart from './pages/cart/Cart'
import Results from './pages/results/Results'
import ProductDetail from './pages/productDetail/ProductDetail'

function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<SignUp/>}/>
        <Route path='/payments' element={<Payment />} />
        <Route path='/orders' element={<Orders />}/>
        <Route path='/category/:categoryName' element={<Results />}/>
        <Route path='/products/:productId' element={<ProductDetail />}/>
        <Route path='/cart' element={<Cart />}/>
    </Routes>

    </BrowserRouter>
  )
}

export default Router
import React from 'react'
import LayOut from '../../components/layout/LayOut';
import CarouselEffect from '../../components/carousel/Carousel';
import Category from '../../components/category/Category';
import Product from '../../components/product/Product';

function Landing() {
  return (
    <LayOut>
        
      <CarouselEffect />
      <Category />
      <Product />
      
    </LayOut>
  );
}

export default Landing
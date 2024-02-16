import React from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css'
import ProductCard from './Card.jsx';
import Metadata from '../layout/Metadata.jsx';
import { fetchProducts } from '../../redux/reducers/product/productReducer.js';
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader.jsx';
import {  toast } from 'react-toastify';
// import Banner from '../Carousel/Carousel.js';
// import { bannerData } from '../data/data.js';
// import styled from 'styled-components'



// const Image=styled.img`
//     width: 100%;
//     height: 280;
//     margin-top: 80px;
// ` 

const Home = () => {
  const dispatch=useDispatch()
  const {loading,error,products}=useSelector(state=>state.products)


  
  useEffect(()=>{
    dispatch(fetchProducts({}))
  
  },[dispatch])

  if(error){
    toast.error(error)
  }

 
  return (
    <>

   
    {loading ? 
       <Loader/>:
       <>
       <Metadata title="ShopKart"/>
      <div className='banner' >
        <p>Welcome to ShopKart</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#homeHeading">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
     

      <h2 id='homeHeading' className="homeHeading">Featured Products</h2>
      <div className="container" id="container">

      {products && products.map((product)=>(
        <ProductCard key={product._id} product={product}/>
      ))}
      </div>
       </>}
    </>
  );
}

export default Home;

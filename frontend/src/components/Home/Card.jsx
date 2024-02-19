import React from 'react'
import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './Home.css'



const ProductCard = ({product}) => {
  const options={
    edit: false,
    value:product.ratings,
    isHalf:true,
    size: window.innerWidth < 600 ? 12 : 20,
}
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
    <img src={product.images[0].url} alt={product.name} className='card-image' />
    <p>{product.name}</p>
    <div>
    <ReactStars {...options}/> <span className='review'>({product.numOfReviews}  Reviews)</span>
    </div>
    <span>₹{product.price}</span>
    </Link>
  )
}

export default ProductCard
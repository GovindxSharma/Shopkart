import React, { useEffect ,useState} from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProd } from '../../redux/reducers/product/productDetailsReducer';
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import './ProductDetails.css';
import Loader from '../layout/Loader/Loader.jsx';
import {  toast } from 'react-toastify';
import Metadata from '../layout/Metadata.jsx';
import {  fetchProductAndAddToCart } from '../../redux/reducers/cart/cartReducers.js';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Rating } from "@mui/material"
import { clearErrors, newReviewReset, submitNewReview } from '../../redux/reducers/reviews/newReview.js';



const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product,loading,error } = useSelector((state) => state.productDetails);
  const {success,error:reviewError}=useSelector((state)=>state.newReview)

  useEffect(() => {
    
    if(error){
      toast.error(error)
      
    }
    if(reviewError){
      toast.error(reviewError)
      dispatch(clearErrors())
    }
   dispatch(fetchProd(id));
   if(success){
   
    dispatch(newReviewReset())
   }
     
  }, [dispatch, id,reviewError,success,error]);


  const options={
    edit: false,
    value:product.ratings,
    isHalf:true,
    size: window.innerWidth < 600 ? 12 : 20,
}
const [quantity, setQuantity] = useState(1);
const [open, setOpen] = useState(false);
const [rating, setRating] = useState(0); // Initialize with a number, not a string
const [comment, setComment] = useState("");

const increaseQuantity=()=>{
  if(product.Stock<=quantity)return
  const qty =quantity+1;
  setQuantity(qty)
}
const decreaseQuantity=()=>{
  if(1>=quantity)return
  const qty =quantity-1;
  setQuantity(qty)
}
const addToCartHandler=()=>{
  dispatch(fetchProductAndAddToCart({id,quantity}))
  toast.success('Item Added')
  
}

const submitReviewToggle = () => {
  open ? setOpen(false) : setOpen(true);
};


const reviewSubmitHandler = () => {

  if (rating <= 0) {
    toast.error("Please provide a rating before submitting the review");
    return;
  }
  const myForm = new FormData();

  myForm.set("rating", rating);
  myForm.set("comment", comment);
  myForm.set("productId", id);

  dispatch(submitNewReview(myForm));
  // navigate('/products')
  toast.success("Review Submitted")
  setOpen(false);
};



  return (
    <>
      {loading ? <Loader/>:
      (<>
        <Metadata title={`${product.name}-ShopKart`}/>
        <div className="ProductDetails">
          <div>
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i}Slide`}
                  />
                ))}
            </Carousel>
          </div>
       
        <div className='container'>
          <div className='detailsBlock-1'>
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options}/> <span className='review'>({product.numOfReviews}  Reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>₹{product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} readOnly/>

                <button onClick={increaseQuantity}>+</button>
              </div>
              <button disabled={product.Stock<1?true:false} onClick={addToCartHandler}> Add to Cart</button>
            </div>
            <p>
              Status:
              <b className={product.Stock<1?"redColor":"greenColor"}>
                {product.Stock<1?"OutOfStock":"InStock"}{`(${product.Stock})`}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>
          <button  onClick={submitReviewToggle} className='submitReview'> Submit Review</button>
        </div>
      </div>
      <h3 className='reviewsHeading'>ReVieWs </h3>
      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
            <Rating
               onChange={(e) => setRating(parseFloat(e.target.value))}
                value={rating} size="large" />


              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      {product.reviews && product.reviews[0]?
      ( 
        <div className='reviews'>
          {product.reviews &&
          product.reviews.map((review)=><ReviewCard review={review} key={review._id}/>)}
        </div>
      ):
    <p className='noReviews'>No Reviews Yet</p>
    }
      </>)}
    </>
  );
};

export default ProductDetails;

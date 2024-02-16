import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profilePng from '../images/Profile.png'

const ReviewCard = ({review}) => {
    const options={
        edit: false,
        value:review.rating,
        isHalf:true,
        size: window.innerWidth < 600 ? 12 : 20,
    }
    
  return (
    <>
        <div className="reviewCard">
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <ReactStars {...options}/>
            <p>{review.comment}</p>
        </div>
    </>
  )
}

export default ReviewCard
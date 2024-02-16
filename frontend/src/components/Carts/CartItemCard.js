import React from "react";
import "./CartItemCard.css"; // Make sure to correct the file name if it's different
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  // console.log(item, "-----------------------------item");

  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt={item.name} />

        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`Price: ₹${item.price}`}</span>
          <p onClick={() => deleteCartItems(item.product)}>Remove</p>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;

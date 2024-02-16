import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_URL } from "../../BaseUrl";
// axios.defaults.withCredentials = true;



// Async thunk
export const fetchProductAndAddToCart = createAsyncThunk(
    'cart/fetchProductAndAddToCart',
    async ({ id, quantity }, { dispatch, getState }) => {
      try {
        console.log('Fetching product for ID:', id);
        console.log('Quantity:', quantity);
  
        // Fetch product data
        const { data } = await axios.get(` /api/v1/product/${id}`);
        console.log('Product Data:', data);
  
        // Extract relevant information from the response
        const product = data.product;
        console.log('Data FROM reducer', product);
  
        const itemToAdd = {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0].url,
          stock: product.Stock,
          quantity, 
        };
  
        // Dispatch the addToCart action with the item to add
        dispatch(addToCart(itemToAdd));
  
        // Update localStorage
        const updatedCartItems = getState().cart.cartItems;
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      } catch (error) {
        // Handle any errors, e.g., show an error message
        console.error('Error fetching product:', error);
      }
    }
  );
  

// 
const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: getCartItemsFromLocalStorage(), shippingInfo: getShippingInfoFromLocalStorage() },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.product === newItem.product);
   
    
      if (existingItem) {
        // If the product already exists, update the quantity
        existingItem.quantity = newItem.quantity;
      } else {
        // If the product doesn't exist, add a new item
        state.cartItems.push(newItem);
      }
    
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      const productIdToRemove = action.payload
      console.log(productIdToRemove.id,'----remove')

      // Filter out the item with the specified product ID
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== productIdToRemove.id
      );

      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingInfo: (state, action) => {
      // Update the shippingInfo state
      state.shippingInfo = action.payload;

      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductAndAddToCart.pending, (state) => {
      // Handle loading state if needed
    });
    builder.addCase(fetchProductAndAddToCart.fulfilled, (state) => {
      // Handle successful completion if needed
    });
    builder.addCase(fetchProductAndAddToCart.rejected, (state, action) => {
      // Handle error state if needed
      console.error('Error fetching product:', action.error);
    });
  },
});

// Exporting actions
export const { addToCart, removeCartItem, saveShippingInfo } = cartSlice.actions;

// Exporting reducer
export const cartReducer = cartSlice.reducer;

// Helper function to get cart items from localStorage
function getCartItemsFromLocalStorage() {
  const storedCartItems = localStorage.getItem('cartItems');
  return storedCartItems ? JSON.parse(storedCartItems) : [];
}

function getShippingInfoFromLocalStorage() {
  const storedShippingInfo = localStorage.getItem('shippingInfo');
  return storedShippingInfo ? JSON.parse(storedShippingInfo) : {};
}
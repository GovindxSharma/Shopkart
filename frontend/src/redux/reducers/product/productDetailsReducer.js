import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { API_URL } from '../../BaseUrl';
// axios.defaults.withCredentials = true;

// Modified createAsyncThunk to accept an 'id' argument
export const fetchProd = createAsyncThunk("fetchProd", async (id) => {
  try {
    const response = await axios.get(`/api/v1/product/${id}`);
    return { product: response.data.product }; // Return response.data directly
  } catch (error) {
    // Handle errors by throwing them
    throw error;
  }
});


const initialState = {
  loading: false,
  product: {},
  error: null, // Add error state to handle errors
};


const productDetailSlice = createSlice({
  name:'productDetails',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProd.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProd.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(fetchProd.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.error = true; // Set error state on rejection
      });
  },
});

export const actions = productDetailSlice.actions;
export const productDetailsReducer = productDetailSlice.reducer;

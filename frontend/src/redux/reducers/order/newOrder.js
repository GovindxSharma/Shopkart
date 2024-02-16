import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_URL } from "../../BaseUrl";
// axios.defaults.withCredentials = true;

// Define the initial state
const initialState = {
  loading: false,
  order: {},
  error: null,
};

// Create an asynchronous thunk for the createOrder action
export const createOrder = createAsyncThunk('newOrder/createOrder', async (order) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(` /api/v1/order/new`, order, config);
    console.log(order)
    return response.data;
  } catch (error) {
    return (error.response.data.message);
  }
});

// Create a slice of the Redux store
const newOrderSlice = createSlice({
  name: 'MyOrder',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handling the asynchronous actions
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the action creator for clearing errors
export const { clearErrors } = newOrderSlice.actions;

// Export the reducer
export const newOrderReducer = newOrderSlice.reducer;

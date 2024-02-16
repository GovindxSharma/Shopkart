import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_URL } from '../../BaseUrl';
// axios.defaults.withCredentials = true;

// Define the initial state
const initialState = {
  order: {},
  loading: false,
  error: null,
};

// Create an asynchronous thunk action
export const fetchOrderDetails = createAsyncThunk(
  'orderDetails/fetchOrderDetails',
  async (id, { dispatch }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${id}`);
      return data.order;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

// Create a slice
const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearErrors: (state) => {
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { clearErrors } = orderDetailsSlice.reducer

export const orderDetailsReducer= orderDetailsSlice.reducer;

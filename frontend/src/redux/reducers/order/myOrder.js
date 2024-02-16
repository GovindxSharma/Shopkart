import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_URL } from "../../BaseUrl";
// axios.defaults.withCredentials = true;


// Async Thunk for fetching orders
export const fetchMyOrders = createAsyncThunk('myOrders/fetchMyOrders', async () => {
  try {
    const { data } = await axios.get(` /api/v1/orders/me`);
    return data.orders;
  } catch (error) {
    throw error.response.data.message;
  }
});

// Redux Toolkit Slice
const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Exporting actions and reducer
export const { clearErrors } = myOrdersSlice.actions;
export const myOrderReducer= myOrdersSlice.reducer;

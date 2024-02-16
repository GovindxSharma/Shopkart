import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import {API_URL} from '../../BaseUrl.js'
// axios.defaults.withCredentials = true;


// Async Thunk for fetching orders
export const fetchAllOrdersAdmin = createAsyncThunk('AdminOrders/fetchAllOrders', async () => {
  try {
    const { data } = await axios.get(`/api/v1/admin/orders`);
    return data.orders;
  } catch (error) {
    throw error.response.data.message;
  }
});


export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id, { dispatch }) => {
    try {
      // Dispatching the pending action
      dispatch(deleteOrder.pending());

      // Making the API call to delete the order
      const response = await axios.delete(` /api/v1/admin/order/${id}`);

      // Dispatching the fulfilled action with the success message
      dispatch(deleteOrder.fulfilled(response.data.success));
    } catch (error) {
      // Dispatching the rejected action with the error message
      dispatch(deleteOrder.rejected(error.response.data.message));
    }
  }
);


// Async Thunk for updating an order
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, myForm }, { dispatch }) => {
    try {
      // Dispatching the pending action
      dispatch(updateOrder.pending());
      console.log('ID and Order',id,myForm)
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      

      // Making the API call to update the order
      const response = await axios.patch(` /api/v1/admin/order/${id}`, myForm,config);

      // Dispatching the fulfilled action with the success message
      dispatch(updateOrder.fulfilled(response.data.success));
    } catch (error) {
      // Dispatching the rejected action with the error message
      dispatch(updateOrder.rejected(error.response.data.message));
    }
  }
);


// Redux Toolkit Slice
const AllOrdersSlice = createSlice({
  name: 'allOrders',
  initialState: { orders: [], loading: false, error: null,success:null },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    deleteOrderReset: (state) => {
    
        state.success=null
    
    },
    updateOrderReset: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrdersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload;
      });
  },
});

// Exporting actions and reducer
export const { clearErrors,deleteOrderReset ,updateOrderReset} = AllOrdersSlice.actions;
export const allOrderAdminReducer= AllOrdersSlice.reducer;

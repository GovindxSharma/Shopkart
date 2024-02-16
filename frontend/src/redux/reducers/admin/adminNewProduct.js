import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_URL} from '../../BaseUrl';
// axios.defaults.withCredentials = true;


// Async thunk for creating a new product
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, { dispatch }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.post(` /api/v1/admin/product/new`, productData, config);

      dispatch(newProductSlice.actions.createProductSuccess(data));

      return data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(newProductSlice.actions.createProductFail(errorMessage));

      throw error;
    }
  }
);

// Slice for creating a new product
const newProductSlice = createSlice({
  name: 'product',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    createProductReset: (state) => {
      state.success = false;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },
    createProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { createProductReset, clearErrors } = newProductSlice.actions;

export const newProductReducer = newProductSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// import { API_URL } from '../../BaseUrl';
// axios.defaults.withCredentials = true;

export const fetchProducts = createAsyncThunk("fetchProducts", async ({ keyword = "", currentPage = 1, price = [0, 250000], category, ratings = 0 }) => {
  let link = ` /api/v1/products?page=${currentPage}&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
  if (category) {
    link = ` /api/v1/products?page=${currentPage}&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
  }
  try {
    const response = await axios.get(link);
    const data = response.data;

    console.log(data.products,'-----------------------products------------------------------')
    return { products: data.products, productCount: data.productCount, resultPerPage: data.resultPerPage, filteredProductsCount: data.filteredProductsCount };
  } catch (error) {
    console.error("Error", error);
    throw error; // Rethrow the error to be caught by the rejected handler
  }
});

const initialState = {
  loading: false,
  products: [],
  error: null,
  productCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
      state.error = null; // Clear the error on success
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      console.error("Error", action.payload);
      state.error = action.payload;
      state.loading = false;
    })
  },
});

export const actions = productSlice.actions;
export const productReducer = productSlice.reducer;

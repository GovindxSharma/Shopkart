import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// import { API_URL } from "../../BaseUrl";
// axios.defaults.withCredentials = true;

export const fetchAdminProducts = createAsyncThunk("fetchAdminProducts", async () => {
  try {
    const response = await axios.get(` /api/v1/admin/products`);
    const data = response.data;

    return { products: data.products };
  } catch (error) {
    console.error("Error", error);
    throw error; // Rethrow the error to be caught by the rejected handler
  }
});



// Delete Product
export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
  try {
    await axios.delete(`  /api/v1/admin/product/${id}`);

    // You can return data if needed
    return { success: true };
  } catch (error) {
    console.error("Error", error);
    throw error; // Rethrow the error to be caught by the rejected handler
  }
});


// Update Product
export const updateProduct = createAsyncThunk("updateProduct", async ({ id, productData }, { dispatch }) => {
  try {

    const response = await axios.put(` /api/v1/admin/product/${id}`, productData);

    dispatch(adminProductSlice.actions.updateProductSuccess(response.data));

    return response.data;
  } catch (error) {
    console.error("Error", error);
    dispatch(adminProductSlice.actions.updateProductFail(error.message));
    throw error;
  }
});





const initialState = {
  loading: false,
  products: [], // Set an empty array as the default value
  error: null,
  isDeleted:false,
  isUpdated:false,
  productCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0
};




const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers:{
    clearErrors: (state) => {
      state.error = null;
    },
    resetDeleteProduct: (state) => {
      state.isDeleted = false;
    },
    resetUpdatedProduct:(state)=>{
        state.isUpdated=false;
    },
  
    updateProductReset: (state) => {
        state.isUpdated= false;
      
    },
    updateProductSuccess: (state) => {
      state.loading = false;
      state.isUpdated = true;
    },
    
    updateProductFail: (state, action) => {
      return {
       
        loading: false,
        error: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;

      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        console.error("Error", action.payload);
        state.error = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        // Handle pending state if needed
        state.loading=true;

      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // Handle fulfilled state if needed
        // You can access the returned data like action.payload
        state.isDeleted=action.payload
        // state.isDeleted = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        // Handle rejected state if needed
        console.error("Error", action.payload);
        state.isDeleted=action.payload
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        console.error("Error", action.payload);
        state.error = action.payload;
      });
  },
});

export const {clearErrors,resetDeleteProduct,resetUpdatedProduct} = adminProductSlice.actions;
export const adminProductReducer = adminProductSlice.reducer;

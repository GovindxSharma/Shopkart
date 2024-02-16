import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_URL } from '../../BaseUrl';
// axios.defaults.withCredentials = true;

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (email, { dispatch }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };

      const { data } = await axios.post(` /api/v1/password/forgot`, email, config);

      return  data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

// Async thunk for reset password
// Async thunk for reset password
export const resetPassword = createAsyncThunk(
  'resetPassword',
  async ({ token, resetData }, { dispatch }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };

      console.log(token,resetData,'REDUCER')
      const { data } = await axios.put(` /api/v1/password/reset/${token}`,resetData, config);

      return { success: data.success };
    } catch (error) {
      throw error.response.data.message;
    }
  }
);


// Create the slice
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    message: null,
    success: null,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { clearErrors } = forgotPasswordSlice.actions;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;

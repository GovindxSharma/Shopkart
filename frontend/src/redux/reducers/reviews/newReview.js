import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_URL } from '../../BaseUrl';
// axios.defaults.withCredentials = true;


// Async thunk for new review
export const submitNewReview = createAsyncThunk(
  'newReview/submitNewReview',
  async (reviewData, { dispatch }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.patch(` /api/v1/review`, reviewData, config);

      dispatch(newReviewSlice.actions.newReviewSuccess(data.success));

      return data.success;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(newReviewSlice.actions.newReviewFail(errorMessage));

      throw error;
    }
  }
);

// Slice for new review
const newReviewSlice = createSlice({
  name: 'newReview',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    newReviewReset: (state) => {
      state.success = false;
    },
    newReviewSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    newReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitNewReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitNewReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(submitNewReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { newReviewReset, newReviewSuccess, newReviewFail, clearErrors } =
  newReviewSlice.actions;

export const newReviewReducer= newReviewSlice.reducer;

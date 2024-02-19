import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { API_URL } from '../../BaseUrl';
// axios.defaults.withCredentials = true;



export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (userData, { dispatch }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.patch(` /api/v1/me/update`, userData, config);
      return {user:data.user , success:data.success}
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const updatePassword=createAsyncThunk('update/password',
async (passwords)=>{
    try{
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.patch(
          ` /api/v1/password/update`,
          passwords,
          config
        );
    return {user:data.user,success:data.success}

    }catch(error){
        throw error.response.data.message
    }
})

const initialState = {
  loading: false,
  isUpdated: false,
  error: null,
  message:false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = false;
    },
    reset: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
       
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.message=true
        state.error= null
      })
      .addCase(updatePassword.rejected, (state, action) => {
     
       state.loading = false;
        state.error = action.error.message;
        state.message=false
      })
      

  },
});

export const { clearError, reset} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

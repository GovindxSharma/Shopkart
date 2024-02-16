import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_URL } from '../../BaseUrl';
// axios.defaults.withCredentials = true;


// Async Thunk for fetching users
export const fetchAllUsersAdmin = createAsyncThunk('AdminUsers/fetchAllUsers', async () => {
  try {
    const { data } = await axios.get(` /api/v1/admin/users`);
    return data.users;
  } catch (error) {
    throw error.response.data.message;
  }
});



// Async Thunk for updating a user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, myForm }, { dispatch }) => {
    try {
      // Dispatching the pending action
      dispatch(updateUser.pending());

      const config = { headers: { "Content-Type": "application/json" } };

      // Making the API call to update the user
      const response = await axios.patch(` /api/v1/admin/user/${id}`, myForm, config);

      // Dispatching the fulfilled action with the success message
      dispatch(updateUser.fulfilled(response.data.success));
    } catch (error) {
      // Dispatching the rejected action with the error message
      dispatch(updateUser.rejected(error.response.data.message));
    }
  }
);

// Async Thunk for deleting a user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { dispatch }) => {
    try {
      // Dispatching the pending action
      dispatch(deleteUser.pending());

      // Making the API call to delete the user
      const response = await axios.delete(`/api/v1/admin/user/${id}`);

      // Dispatching the fulfilled action with the success message
  
      dispatch(deleteUser.fulfilled(response.data.success));
    } catch (error) {
      // Dispatching the rejected action with the error message
      dispatch(deleteUser.rejected(error.response.data.message));
    }
  }
);

// Async Thunk for fetching user details
export const getUserDetails = createAsyncThunk(
  'users/getUserDetails',
  async (id, { dispatch }) => {
    try {
      // Dispatching the pending action
      dispatch(getUserDetails.pending());

      // Making the API call to get user details
      const { data } = await axios.get(` /api/v1/admin/user/${id}`);

      // Dispatching the fulfilled action with the user details
      dispatch(getUserDetails.fulfilled(data.user));
    } catch (error) {
      // Dispatching the rejected action with the error message
      dispatch(getUserDetails.rejected(error.response.data.message));
    }
  }
);


// Redux Toolkit Slice
const AllUsersSlice = createSlice({
  name: 'allUsers',
  initialState: { users: [], loading: false, error: null ,isDeleted:false,isUpdated:false,  userDetails: null,},
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    deleteUserReset:(state)=>{
      state.isDeleted=false
    },
    updateUserReset:(state)=>{
      state.isUpdated=false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the update success if needed
        
        state.isUpdated=action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the delete success if needed
        state.isDeleted=true
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

// Exporting actions and reducer
export const { clearErrors,deleteUserReset ,updateUserReset} = AllUsersSlice.actions;
export const allUsersAdminReducer = AllUsersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { API_URL } from '../../BaseUrl';
// axios.defaults.withCredentials = true;


//LOGIN
export const login = createAsyncThunk("user/login", async ({ email, password }, { dispatch }) => {
  try {
    const response = await fetch(` /api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      // You can handle errors here, for example:
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    return { user: data.user, message: data.message };
  } catch (error) {
    throw error; // Rethrow the error to be caught in the rejected case
  }
});


// REGISTER
export const register = createAsyncThunk("user/register", async (formData, { dispatch }) => {
  try {
    const response = await fetch(`/api/v1/register`, {
      method: 'POST',
      body: formData,
       // Pass the FormData object directly as the body
    });

    if (!response.ok) {
      // You can handle errors here, for example:
      const data = await response.json();
      // console.log('****************************',data)
      throw new Error(data.message);
    }

    const data = await response.json();
    return { user: data.user, message: data.message };
  } catch (error) {
    throw error; // Rethrow the error to be caught in the rejected case
  }
});

//LOAD USER
export const loadUser = createAsyncThunk("user/load", async () => {
  try {
  
    const response = await axios.get(`/api/v1/me`);
    const data=response.data
    return { user: data.user };
  } catch (error) {
    throw error; // Rethrow the error to be caught in the rejected case
  }
});

// Async Thunk for Logout
export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const response = await axios.get(`/api/v1/logout`);
    return response.data; // Assuming the server returns some data upon successful logout
  } catch (error) {
    throw error;
  }
});





//INITIAL STATE FOR EACH
const initialState = {
  loading: false,
  user: {},
  error: false,
  isAuthenticated: false,
  message: '',
 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = "Logged In"
        state.error=false
        
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Error", action.error.message);
        state.error = true;
        state.isAuthenticated = false;
        state.loading=false;
        state.message = action.error.message;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.isAuthenticated = false;

      })
      .addCase(register.fulfilled, (state, action) => {
       
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = "Registered"
        state.error=false
        console.log("Register Fulfilled Data: ", action.payload.user);
        
      })
      .addCase(register.rejected, (state, action) => {
        state.error = true;
        state.loading=false;
        state.isAuthenticated = false;
        console.log("Register**********************************",state.user)
        if(state.message==='E11000 duplicate key error collection: test.users index:'){
          state.message='Already Exists'
        }else{
        state.message = action.error.message;
        }
      })
      .addCase(loadUser.pending, (state) => {
        // state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = false;
        console.log("LoadUser************************",state.user)
      })
      .addCase(loadUser.rejected, (state, action) => {
        // console.log("Error", action.error.message);
        // state.loading=true
        state.error = true;
        state.isAuthenticated = false;
        
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message=''
        // handle any additional state changes upon successful logout
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = userSlice.actions;
export const userLoginReducer = userSlice.reducer;

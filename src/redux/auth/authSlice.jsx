import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginfun, register } from "../../services/api";

// Register User Thunk
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const response = await register(userData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Login User Thunk
export const login = createAsyncThunk(
  'user/login',
  async (loginData, thunkAPI) => {
    try {
      const response = await loginfun(loginData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Initial State
const initialState = {
  auth: null,
  token: null,
  status: null,
  error: null,
};

// Slice
export const authSlice = createSlice({
  name: "user",
  initialState,
   reducers: {
    logout(state) {
      state.auth = null;
      state.token = null;
      state.status = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
      state.auth = null;
      state.token = null;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.auth = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.auth = null;
      state.token = null;
      state.error = action.payload;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.auth = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.auth = null;
      state.token = null;
      state.error = action.payload;
    });
  },
});

export const {logout}= authSlice.actions
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../helpers/axios";

interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export const login = createAsyncThunk<any, string>(
    "github/login",
    async (code: string, { rejectWithValue }) => {
      try {
        const response = await axiosApi.post('/login/oauth/access_token', {
          code,
          client_id: 'YOUR_CLIENT_ID',
          client_secret: 'YOUR_CLIENT_SECRET',
        });
  
        const accessToken = new URLSearchParams(response.data).get('access_token');
        
        if (accessToken) {
          // Save the access token in local storage or state for later use
          localStorage.setItem('access_token', accessToken);
        }
        
        // Return the response data
        return response.data;
      } catch (error: any) {
        // Handle any error that occurs during the login process
        console.error('Login error:', error);
        
        // Return the error response data
        return rejectWithValue(error.response.data);
      }
    }
  );
  

const initialState: AuthState = {
  accessToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;

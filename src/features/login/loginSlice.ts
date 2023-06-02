import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LoginData, login } from "./loginAPI";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: LoginData) => {
    try {
      const res = await login(payload);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export interface AuthState {
  token: string;
  status: string;
}

const initialState: AuthState = {
  token: "",
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // logout: (state) => {
    //     state.token = "",
    //     state.status = "idle"
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = "idle";
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectToken = (state: RootState) => state.login.token;

// export const { logout } = loginSlice.actions;

export default loginSlice.reducer;

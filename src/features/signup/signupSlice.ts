import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignupData, signup } from "./signupApi";

export const signupAsync = createAsyncThunk(
  "auth/register",
  async (payload: SignupData) => {
    try {
      const res = await signup(payload);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export interface RegisterState {
  status: string;
}

const initialState: RegisterState = {
  status: "idle",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

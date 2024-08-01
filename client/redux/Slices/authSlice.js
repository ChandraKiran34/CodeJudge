import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
  token : localStorage.getItem('token') || ""
};

export const createAccount = createAsyncThunk(
  "/auth/register",
  async (data) => {
    const promise = axiosInstance.post("/auth/register", data);
    toast.promise(promise, {
      loading: "Wait! creating your account",
      success: (response) => {
        return response?.data?.message;
      },
      error: "Failed to create your account",
    });
    try {
      const response = await promise;
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      throw error; // Make sure to throw the error so that the thunk knows it failed
    }
  }
);

export const login = createAsyncThunk("/auth/login", async (data) => {
  const promise = axiosInstance.post("/auth/login", data);
  toast.promise(promise, {
    loading: "Wait! authenticating your account",
    success: "Login success",
    error: "Failed to authenticate your account",
  });
  try {
    const response = await promise;
    console.log(response, " response");
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
    throw error; // Make sure to throw the error so that the thunk knows it failed
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  const promise = axiosInstance.get("/auth/logout");
  toast.promise(promise, {
    loading: "Wait! logging out your account",
    success: (response) => {
      return response?.data?.message;
    },
    error: "Failed to logout your account",
  });
  try {
    const response = await promise;
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
    throw error; // Ensure the error is thrown so the thunk knows it failed
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("token", action?.payload?.token);
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;
        state.token = action?.payload?.token;
      })

      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("token", action?.payload?.token);
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;
        state.token = action?.payload?.token;
      })

      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        state.token = ""
      });
  },
});

// Export the action creators
// export const { addUser, loginu, logout } = authSlice.actions;

export default authSlice.reducer;

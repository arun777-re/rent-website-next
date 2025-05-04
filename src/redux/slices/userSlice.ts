import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorProps } from "./adminSlice";

interface UserProps {
  _id: string;
  firstName: string;
  lastName?: string;
}
interface dataProps {
  message?: string;
  status?: number;
  success?: boolean;
  data?: UserProps | null;
}

interface NotificationProps {
  title?: string;
  message?: string;
}

interface SearchParams {
  propertyId?:string;
  type:"liked" | "booking";
}

interface userstate {
  success: boolean | null;
  user: dataProps;
  loading: boolean;
  error: ErrorProps;
  interaction: null;
  notification: NotificationProps[] | null;
}
const initialState: userstate = {
  success: false,
  user: {
    message: "",
    status: 0,
    success: false,
    data: {
      _id: "",
      firstName: "",
      lastName: "",
    },
  },
  loading: false,
  error: {
    message: "",
    status: 0,
    success: false,
  },
  interaction: null,
  notification: [
    {
      title: "",
      message: "",
    },
  ],
};

// thunk to create user
export const createUser = createAsyncThunk<
  dataProps, // what it resolves to
  object, // argument
  { rejectValue: ErrorProps }
>("/user/create", async (formData, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/auth/usersignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const resData = await response.json();

    if (!response.ok) {
      return rejectWithValue({
        message: resData.message,
        status: response.status,
        success: false,
      });
    }

    return resData;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during create user: ${error.message}`,
      success: false,
    });
  }
});

// thunk to add property to favorate
export const addFavorate = createAsyncThunk<
  any,
  SearchParams,
  { rejectValue: ErrorProps }
>("/user/addfavorate", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `/api/user/favorate?propertyId=${data.propertyId}&type=${data.type}`,
      {
        method: "POST",
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      return rejectWithValue({
        message: resData.message,
        status: response.status,
        success: false,
      });
    }

    return resData;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during add to favorite: ${error.message}`,
      success: false,
    });
  }
});

// thunk for login user
export const loginUser = createAsyncThunk<
  dataProps,
  object,
  { rejectValue: ErrorProps }
>("/user/login", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/auth/userlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
      return rejectWithValue({
        message: resData.message,
        status: response.status,
        success: false,
      });
    }

    alert("Logged in successfully");
    return resData;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during login user: ${error.message}`,
      success: false,
    });
  }
});

// thunk for logout user
export const logoutuser = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorProps }
>("user/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    const resData = await res.json();

    if (!res.ok) {
      return rejectWithValue({
        message: resData.message,
        status: res.status,
        success: false,
      });
    }

    return resData;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during logout: ${error.message}`,
      success: false,
    });
  }
});

// get a user
export const getUser = createAsyncThunk<
  dataProps,
  void,
  { rejectValue: ErrorProps }
>("/user/get", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/user/get-user`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const resData = await response.json();

    if (!response.ok) {
      return rejectWithValue({
        message: resData.message,
        status: response.status,
        success: false,
      });
    }

    return resData;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during get user: ${error.message}`,
      success: false,
    });
  }
});

export const createInteraction = createAsyncThunk<
  any,
  object,
  { rejectValue: ErrorProps }
>("/user/create/interaction", async (formData, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/user/interaction/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const resData = await response.json();

    if (!response.ok) {
      return rejectWithValue({
        message: resData.message,
        status: response.status,
        success: false,
      });
    }

    return resData;
  } catch (error: any) {
    console.error(error);
    window.location.href = "/login";
    return rejectWithValue({
      message: `Error during create interaction: ${error.message}`,
      success: false,
    });
  }
});

export const getInteraction = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorProps }
>("/user/get/interaction", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/user/interaction/get`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const resData = await response.json();

    if (!response.ok) {
      return rejectWithValue({
        message: resData.message,
        status: response.status,
        success: false,
      });
    }

    return resData;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during get interaction: ${error.message}`,
      success: false,
    });
  }
});

export const getNotification = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorProps }
>("/user/get/notification", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/user/notify/get-notification", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return rejectWithValue({
        message: data?.message,
        status: data?.status,
        success: data?.success,
      });
    }

    return data;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during get notification: ${error.message}`,
      success: false,
    });
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.success = action.payload.success ?? true;
        state.loading = false;
        state.error = { message: "", status: 0, success: false };
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorProps;
        state.user = {
          message: "",
          status: 0,
          success: false,
          data: {
            _id: "",
            firstName: "",
            lastName: "",
          },
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = { message: "", status: 0, success: false };
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as ErrorProps;
        state.user = {
          message: "",
          status: 0,
          success: false,
          data: {
            _id: "",
            firstName: "",
            lastName: "",
          },
        };
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = { message: "", status: 0, success: false };
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as ErrorProps;
        state.user = {
          message: "",
          status: 0,
          success: false,
          data: {
            _id: "",
            firstName: "",
            lastName: "",
          },
        };
      })
      .addCase(logoutuser.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
        state.error = { message: "", status: 0, success: false };
        state.user = {
          message: "",
          status: 0,
          success: false,
          data: {
            _id: "",
            firstName: "",
            lastName: "",
          },
        };
      })
      .addCase(logoutuser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as ErrorProps;
        state.user = {
          message: "",
          status: 0,
          success: false,
          data: {
            _id: "",
            firstName: "",
            lastName: "",
          },
        };
      })
      .addCase(createInteraction.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
        state.error = { message: "", status: 0, success: false };
      })
      .addCase(getInteraction.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = { message: "", status: 0, success: false };
        state.interaction = action.payload;
      })
      .addCase(addFavorate.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
        state.error = { message: "", status: 0, success: false };
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = { message: "", status: 0, success: false };
        state.notification = action.payload;
      });
  },
});

export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "@/redux/services/api";

export interface DataProps {
  _id: string;
  name: string;
  email: string;
  phone: string;
  agencyName: string;
  agencyAddress: string;
  licenseNumber: number;
  isMainAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminProps {
  message?: string;
  status?: number;
  data?: DataProps | null;
  success?: boolean;
  totalPages?: number;
  totalItems?: number;
}

export interface ErrorProps {
  message?: string;
  status?: number;
  success?: boolean;
}
interface InitialValProps {
  admin: AdminProps;
  loading: boolean;
  error?: ErrorProps;
  code?: string;
  activeUsers?: number;
}

interface SearchParams {
  propertyId?:string;
  status?:string;
}
const initialState: InitialValProps = {
  admin: {
    message: "",
    status: 0,
    data: {
      _id: "",
      email: "",
      name: "",
      agencyName: "",
      licenseNumber: 0,
      isMainAdmin: false,
      agencyAddress: "",
      phone: "",
      createdAt: "",
      updatedAt: "",
    },
    success: false,
    totalItems: 0,
    totalPages: 0,
  },
  loading: false,
  error: {
    message: "",
    status: 0,
    success: false,
  },
  code: "",
  activeUsers: 0,
};

// create a thunk api
export const signupAdmin = createAsyncThunk(
  "/admin/signup",
  async (formData: any, { rejectWithValue }) => {
    if (formData) {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const data = await res.json();
          return data.admin;
        } else {
          const errorData = await res.json();
          console.error("Error during signup:", errorData);
          rejectWithValue(errorData);
        }
      } catch (error: any) {
        rejectWithValue({ "Error during signup fetch": error });
      }
    } else {
      throw new Error("Invalid form data");
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "/admin/login",
  async (formData: any, { rejectWithValue }) => {
    try {
      if (!formData) throw new Error("please provide formData");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        window.location.href = `/admindashboard/${data?.admin?._id}`;
        return data.admin;
      } else {
        const errorData = await res.json();
        rejectWithValue(errorData);
      }
    } catch (error: any) {
      const errorData = error.message;
      rejectWithValue({ errorData });
      throw new Error("login during admin login");
    }
  }
);
export const createCode = createAsyncThunk(
  "/admin/code",
  async (data:string, { rejectWithValue }) => {
    try {
      if (!data) throw new Error("please provide formData");
      const res = await fetch(`/api/admin/create-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body:JSON.stringify({code:data})
      });
      const data1 = await res.json();

      if (!res.ok) {
        return rejectWithValue(data1?.message)
      }
      return data1;

    } catch (error: any) {
      const errorData = error.message;
      rejectWithValue({ errorData });
      throw new Error("login during admin login");
    }
  }
);
export const sendNotification = createAsyncThunk(
  "/admin/sendNotification",
  async (formData: any, { rejectWithValue }) => {
    try {
      if (!formData) throw new Error("please provide formData");
      const res = await fetch(
        "/api/admin/create-notification?access='secure'",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        rejectWithValue(data);
      }
      return data;
    } catch (error: any) {
      const errorData = error.message;
      return rejectWithValue({ errorData });
    }
  }
);

export const getAdmin = createAsyncThunk(
  "admin/getAdmin",
  async (_, thunkAPI) => {
    try {
      const res = await getRequest("/api/admin/get-admin", null, thunkAPI);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getActiveUsers = createAsyncThunk(
  "admin/getactiveusers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/user/get-activeuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        return rejectWithValue(result.message);
      }
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeStatus = createAsyncThunk('admin/changestatus',async(data:SearchParams,{rejectWithValue})=>{
  try {
    const res = await fetch(`/api/admin/change-status?status=${data.status}&propertyId=${data.propertyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      return rejectWithValue(result.message);
    }
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
})
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAdmin.pending, (state, action) => {
        state.loading = true;
        state.error = {message:'',status:0,success:false}
      })
      .addCase(signupAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.admin = action.payload;
        } else {
          console.error("No admin data received");
        }

        state.error = {message:'',status:0,success:false}
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.admin = action.payload;
        } else {
          console.error("No admin data received");
        }
        state.error = {message:'',status:0,success:false}
      })
      .addCase(createCode.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload;
        state.error = {message:'',status:0,success:false}
      })

      .addCase(sendNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.error = {message:'',status:0,success:false}
      })
      .addCase(sendNotification.pending, (state) => {
        state.loading = true;
        state.error = {message:'',status:0,success:false}
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorProps;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.loading = false;
        state.error = {message:'',status:0,success:false}
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = {message:'',status:0,success:false};
        
      })
      .addCase(getActiveUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = {message:'',status:0,success:false}
        state.activeUsers = action.payload?.totalItems;
      });
  },
});

export default adminSlice.reducer;

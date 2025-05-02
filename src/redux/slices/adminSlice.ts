import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequest } from "@/redux/services/api";
import { handleFullfill, PropertyProps } from "./propertSlice";


interface initialValProps{
  admin:PropertyProps,
  loading:boolean,
  error?:string[] | null,
  code?:string,
  activeUsers?:null  
}

const initialState:initialValProps = {
  admin:{
    message:"",
    status:0,
    data:[],
    success:false,
  },
  loading: false,
  error: [],
  code:'',
  activeUsers:null
};

// create a thunk api
export const signupAdmin = createAsyncThunk(
  "/admin/signup",
  async (formData: any, { rejectWithValue }) => {
    if (formData) {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
         headers:{
            "Content-Type":"application/json"
         },
          body:JSON.stringify(formData),
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
      const res = await fetch("/api/auth/adminlogin", {
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
  async (formData: any, { rejectWithValue }) => {
    try {
      if (!formData) throw new Error("please provide formData");
      const res = await fetch("/api/admin/admin1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({code:formData}),
      });

      if (res.ok) {
        const data = await res.json();
        return data;
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
export const sendNotification = createAsyncThunk(
  "/admin/sendNotification",
  async (formData: any, { rejectWithValue }) => {
    try {
      if (!formData) throw new Error("please provide formData");
      const res = await fetch("/api/admin/create-notification?access='secure'", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        return data;
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


export const getActiveUsers = createAsyncThunk('admin/get/activeusers',async(_,thunkAPI)=>{
  try {
    const res = await getRequest('/api/admin/activeuser',null,thunkAPI);
    return res.user;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const getAdmin = createAsyncThunk('admin/getAdmin',async(_,thunkAPI)=>{
  try {
    const res = await getRequest('/api/admin/get-admin',null,thunkAPI);
    return res;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.message)
  }
})


export 

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAdmin.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.admin = action.payload;
        } else {
          console.error("No admin data received");
        }

        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.admin = action.payload;
        } else {
          console.error("No admin data received");
        }
        state.error = null;
      })
      .addCase(createCode.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload;
        state.error = null;
      })
      .addCase(getActiveUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.activeUsers = action.payload;
      })

      .addCase(sendNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

      })
      .addCase(sendNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string[];
      })
      .addCase(getAdmin.fulfilled,(state,action)=>{
        state.admin = action.payload;
        state.loading = false;
        state.error = null;
        
      })
  },
});

export default adminSlice.reducer;

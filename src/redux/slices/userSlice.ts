import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  firstName: string;
  success:boolean;
  user: Record<string, any> | null;
}

interface usertate {
  success: boolean | null;
  user: User[] | null;
  loading: boolean;
  error: string | null;
  interaction:null,
}
const initialState: usertate = {
  success: false,
  user: null,
  loading: false,
  error: null,
  interaction:null,
};



export const createUser = createAsyncThunk(
  "/user/create",
  async (formData: Object,{rejectWithValue}) => {
    if (formData) {
      try {
        const response = await fetch("/api/auth/userignup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const resData = await response.json();

        if (!response.ok) {
          return rejectWithValue(resData.message) || "Account Creation Failed";
        }
        if (response.status === 201) {
          return resData;
        }
      } catch (error: any) {
        console.error(error);
        return rejectWithValue(`Error during create user:${error.message}`);
      }
    }
  }
);


export const addFavorate = createAsyncThunk('/user/addfavorate',async(propertyId:string,{rejectWithValue})=>{
  try {
    const response = await fetch(`/api/user/favorate?propertyId=${propertyId}`,{
      method:'POST',
    });
    if (!response.ok) {
      const errData = await response.json();
      return rejectWithValue(errData.message) || "Failed to add to favorate";
    }
    if (response.status === 201) {
      alert("Added to favorate successfully");
      return response.json();
    }
  } catch (error:any) {
    console.error(error);
      return rejectWithValue(`Error during add to favorate:${error.message}`)
  }
})




export const loginUser = createAsyncThunk(
  "/user/login",
  async (data: object,{rejectWithValue}) => {
    try {
      if (data) {
        const response = await fetch("/api/auth/userlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const resData = await response.json()
        if (!response.ok) {
          return rejectWithValue(resData.message || "Login failed");
        }
        if (response.status === 200) {
          alert("Logged in successfully");
          return response.json();
        }
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(`Error during login user:${error.message}`)
    }
  }
);


export const logoutuser = createAsyncThunk('user/logout',async(_,thunkAPI)=>{
  try {
    const res = await fetch('/api/auth/logout',{
      method:"POST",
      credentials:"include"
    });
    if(!res.ok){
      const error = await res.json();
      return thunkAPI.rejectWithValue(error.message);
    }

    return res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
});

// get a user
export const getUser = createAsyncThunk("/user/get", async (_,{rejectWithValue}) => {

    try {
      const response = await fetch(`/api/user/get-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const errData =await response.json();
        return rejectWithValue(errData.message) || "Failed Operation Get User";
      }
      if (response.status === 200){
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(`Error during get user:${error.message}`)
    }
 
});




export const createInteraction = createAsyncThunk('/user/create/interaction',async(formData:Object,{rejectWithValue})=>{
  try {
    const response = await fetch(`/api/user/interaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body:JSON.stringify(formData)
    });
    if (!response.ok) {
      const errData =await response.json();
      return rejectWithValue(errData.message) || "Failed Operation Get User";
    }
    if (response.status === 200){
      return response.json();
    }
  } catch (error: any) {
    console.error(error);
      window.location.href = '/login'
    throw new Error("Error during create User Interaction:", error.message);
  }
});

export const getInteraction = createAsyncThunk('/user/get/interaction',async(_,{rejectWithValue})=>{
  try {
    const response = await fetch(`/api/user/interaction`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      const errData =await response.json();
      return rejectWithValue(errData.message) || "Failed Operation Get User";
    }
    if (response.status === 200){
      return response.json();
    }
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(`Error during get Interaction:${error.message}`)
  }
});


const userlice = createSlice({
  initialState: initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to create user";
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string || 'Login Failed ';
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string || "Failed to get User";
        state.user = null;
      })
      .addCase(logoutuser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(logoutuser.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string || "Failed Logout User";
        state.user = null;
      })
      .addCase(createInteraction.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(getInteraction.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.interaction = action.payload;
      })
   
      .addCase(addFavorate.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
      })
    
  },
});


export default userlice.reducer;

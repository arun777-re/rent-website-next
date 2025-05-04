import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {SearchParams } from "./propertSlice";
import build from "next/dist/build";

export interface FavoriteItem {
    _id: string;
    createdAt: string;
    updatedAt: string;
    userId: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: number | string;
    };
    propertyId: {
      _id: string;
      slug: string;
      price: number;
      address: {
        city: string;
        state: string;
        country: string;
        postalCode: string;
      };
      owner: {
        name: string;
        phone: string;
        email: string;
        address: string;
      };
    };
  }
  


export interface PropertyProps {
  message: string;
  data: FavoriteItem[];
  success: boolean;
  status: number;
  totalPages?: number;
  dataLength?: number;
}

interface InitialValProps{
    cardData:PropertyProps;
    loading:boolean;
    error:string[] | null;
}


const initialState:InitialValProps = {
    cardData:{
        message: "",
        data: [],
        success: false,
        status: 0,
        totalPages: 0,
        dataLength: 0,
    },
    loading:false,
    error:null
}


// get favorate
export const getAdminFavorate = createAsyncThunk(
    "property/getadminfavorate",
    async (data:SearchParams, { rejectWithValue }) => {
      try {
        const response = await fetch(`/api/admin/favorate/get-liked?page=${data.page}&limit=${data.limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const errData = await response.json();
        if (!response.ok) {
          return rejectWithValue(errData.message) || "Failed to get favorate";
        }
        return errData;
      } catch (error: any) {
        console.error(error);
        return rejectWithValue(`Error during get favorate:${error.message}`);
      }
    }
  );

  // get booking
export const getAdminBooking = createAsyncThunk(
    "property/getadminbooking",
    async (data:SearchParams, { rejectWithValue }) => {
      try {
        const response = await fetch(`/api/admin/favorate/get-booking?page=${data.page}&limit=${data.limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const errData = await response.json();
        if (!response.ok) {
          return rejectWithValue(errData.message) || "Failed to get booking";
        }
        return errData;
      } catch (error: any) {
        console.error(error);
        return rejectWithValue(`Error during get booking:${error.message}`);
      }
    }
  );


export const cardSlice = createSlice({
    name:'card',
    initialState:initialState,
    reducers:{},
    extraReducers(builder) {
        builder
              .addCase(getAdminFavorate.fulfilled,(state,action)=>{
                state.loading = false;
                state.error= null;
                state.cardData = action.payload;
              })
              .addCase(getAdminBooking.fulfilled,(state,action)=>{
                state.loading = false;
                state.error= null;
                state.cardData = action.payload;
              })
        
    },
})


export default cardSlice.reducer;
"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PropertyItem {
  _id: string;
  agent: string; // Or a more detailed Agent type if populated
  title: string;
  description: string;
  price: number;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  category:
    | "apartment"
    | "house"
    | "commercial"
    | "land"
    | "industrial"
    | "farmhouse"
    | "villa"
    | "office"
    | "shop"
    | "warehouse"
    | "factory"
    | "plot"
    | "residential"
    | "retail"
    | "mixed-use"
    | "hospitality"
    | "hospital"
    | "school"
    | "university"
    | "college"
    | "hotel"
    | "mansion"
    | "penthouse"
    | "studio"
    | "duplex"
    | "triplex"
    | "townhouse";
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  owner: {
    name: string;
    phone: string;
    email: string;
    address?: string;
  };
  status: "available" | "sold" | "rented";
  featured: boolean;
  images: string[];
  address: {
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyProps {
  message: string;
  data: PropertyItem[];
  success: boolean;
  status: number;
  totalPages?: number;
  dataLength?: number;
}

export interface initialValProps {
  property: PropertyProps;
  error?: string[] | null;
  loading: boolean;
}
export interface SearchParams {
  location?: string;
  page: number;
  limit: number;
  category?: string;
}

const initialValues: initialValProps = {
  property: {
    message: "",
    status: 0,
    success: false,
    data: [
      {
        _id: "",
        images: [""],
        category: "office",
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        price: 0,
        description: "",
        title: "",
        amenities: [""],
        location: {
          type: "Point",
          coordinates: [0, 0],
        },
        agent: "",
        owner: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
        status: "available",
        featured: false,
        address: {
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
        slug: "",
        createdAt: "",
        updatedAt: "",
      },
    ],
    totalPages: 0,
    dataLength: 0,
  },
  error: [],
  loading: false,
};

export const handleFullfill = (state: initialValProps, action: any) => {
  state.loading = false;
  state.error = null;
  state.property = action.payload;
};

export const createProperty = createAsyncThunk<
  PropertyProps, // Make sure this matches what your backend returns in `data`
  FormData,
  { rejectValue: string[] }
>("/admin/createproperty", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/admin/create-property", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      return rejectWithValue([result.message || "Property creation failed"]);
    }

    if (!result.success) {
      return rejectWithValue([result.message || "Property creation failed"]);
    }

    return result;
  } catch (error: any) {
    return rejectWithValue([`Error during create property: ${error.message}`]);
  }
});

// get property by category
export const getPropertyByCategory = createAsyncThunk(
  "property/getcategory",
  async (data: SearchParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/user/property/category?category=${data.category}&page=${data.page}&limit=${data.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        return (
          rejectWithValue(errData.message) ||
          "Failed Operation Get Property By Category"
        );
      }
      if (response.status === 200) {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue("Error during fetch property by search");
    }
  }
);

// get property by home-search
export const getPropertyByHome = createAsyncThunk(
  "property/homesearch",
  async (data: SearchParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/user/property/home-search?location=${data.location}&page=${data.page}&limit=${data.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        return rejectWithValue(errData.message) || "Failed Operation Get User";
      }
      if (response.status === 200) {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue("Error during fetch property by search");
    }
  }
);

// get property by home search
export const getPropertyByAdvanceSearch = createAsyncThunk(
  "property/advancesearch",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      if (!formData) {
        return rejectWithValue("Provide at least one field");
      }
      const response = await fetch(
        `/api/user/property/advance-search?page=4&limit=10`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        return rejectWithValue(errData.message) || "Failed Operation Get User";
      }
      if (response.status === 200) {
        return response.json();
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        `Error during fetch property by search:${error.message}`
      );
    }
  }
);

//   get recommended properties

export const getRecommendedProperties = createAsyncThunk(
  "property/getRecommended",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/recommended`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const errData = await response.json();
        return rejectWithValue(errData.message) || "Failed Operation Get User";
      }
      return response.json();
    } catch (error: any) {
      console.error(error);
      return rejectWithValue("Error during fetch recommended property");
    }
  }
);

// thunk to get available properties
export const getavailableProperties = createAsyncThunk(
  "property/getAvailable",
  async (data: SearchParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/user/get-available?page=${data.page}&limit=${data.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const errData = await response.json();

      if (!response.ok) {
        return (
          rejectWithValue(errData.message) || "Failed Operation Get Properties"
        );
      }
      return errData;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue("Error during fetch available property");
    }
  }
);
// thunk to get sold properties
export const getSoldProperties = createAsyncThunk(
  "/property/getSold",
  async (data: SearchParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/user/get-sold?page=${data.page}&limit=${data.limit}&access=secure`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const errData = await response.json();

      if (!response.ok) {
        return (
          rejectWithValue(errData.message) || "Failed Operation Get Properties"
        );
      }

      return errData;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue("Error during fetch sold property");
    }
  }
);
// thunk to get rented properties
export const getRentedProperties = createAsyncThunk(
  "/property/getRented",
  async (data: SearchParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/user/get-rented?page=${data.page}&limit=${data.limit}&access=secure`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const errData = await response.json();

      if (!response.ok) {
        return (
          rejectWithValue(errData.message) || "Failed Operation Get Properties"
        );
      }

      return errData;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue("Error during fetch rented property");
    }
  }
);

//   thunk to get single property
export const getSingleProperty = createAsyncThunk(
  "/property/getsingleproperty",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/properties/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const errData = await response.json();

      if (!response.ok) {
        return (
          rejectWithValue(errData.message) || "Failed Operation Get Property"
        );
      }
      return errData;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue("Error during fetch single property");
    }
  }
);

// thunk to get all properties
export const getAllProperty = createAsyncThunk(
  "/property/getallproperty",
  async (data: SearchParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/admin/get-allproperty?page=${data.page}&limit=${data.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const errData = await response.json();

      if (!response.ok) {
        return (
          rejectWithValue(errData.message) || "Failed Operation Get Property"
        );
      }
      console.log("errordataaaaaaaaaaa", errData);

      return errData;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue("Error during fetch all property");
    }
  }
);

// thunk to get favorate properties of a user
export const getFavorate = createAsyncThunk(
  "property/getfavorate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user/favorate`, {
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
export const getFeatured = createAsyncThunk(
  "property/getfeatured",
  async (data: SearchParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/admin/featured?page=${data.page}&limit=${data.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

// thunk to get total revenue
export const getTotalRevenue = createAsyncThunk(
  "admin/getRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/admin/total-revenue", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data?.message);
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//
export const getPropertyByOwner = createAsyncThunk(
  "admin/getpropertybyowner",
  async (data: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/admin/property-byowner?ownerName=${data}`, {
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

const propertySlice = createSlice({
  name: "property",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.fulfilled, handleFullfill)
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ["Failed to create Property"];
      })
      .addCase(getPropertyByCategory.fulfilled, handleFullfill)
      .addCase(getPropertyByAdvanceSearch.fulfilled, handleFullfill)
      .addCase(getRecommendedProperties.fulfilled, handleFullfill)
      .addCase(getSingleProperty.fulfilled, handleFullfill)
      .addCase(getSoldProperties.fulfilled, handleFullfill)
      .addCase(getavailableProperties.fulfilled, handleFullfill)
      .addCase(getRentedProperties.fulfilled, handleFullfill)
      .addCase(getFavorate.fulfilled, handleFullfill)
      .addCase(getAllProperty.fulfilled, handleFullfill)
      .addCase(getFeatured.fulfilled, handleFullfill)
      .addCase(getTotalRevenue.fulfilled, handleFullfill)
      .addCase(getPropertyByOwner.fulfilled, handleFullfill);
  },
});

export default propertySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axiosInstance";

// Async thunk to create a listing
export const createListing = createAsyncThunk(
  "listing/createListing",
  async (listingData, thunkAPI) => {
    try {
      const response = await axios.post("/listings/create", listingData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getListingById = createAsyncThunk(
  "listings/getListingById",
  async (parsedFilters,thunkAPI) => {
    try {
      console.log("Parsed Filters:", parsedFilters);
      const response = await axios.get("listings/getListByUser", {
        params: parsedFilters,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearListingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.listings.push(action.payload); // Add new listing to local state
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getListingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListingById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.listings = action.payload; // Update listings with fetched data
      })
      .addCase(getListingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearListingState } = listingSlice.actions;
export default listingSlice.reducer;

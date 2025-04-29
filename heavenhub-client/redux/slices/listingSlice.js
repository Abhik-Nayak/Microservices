import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axiosInstance";

// Async thunk to create a listing
export const createListing = createAsyncThunk(
  "listing/createListing",
  async (listingData, thunkAPI) => {
    try {
      // Create a FormData object
      const formData = new FormData();

      // Append non-file fields
      for (const [key, value] of Object.entries(listingData)) {
        if (key !== 'images') {
          formData.append(key, value);
        }
      }

      // Append the images (multiple files)
      if (listingData.images && listingData.images.length > 0) {
        listingData.images.forEach((file) => {
          formData.append('images', file); // 'images' is the field name
        });
      }
      console.log("FormData:", formData); // Debugging line

      // const response = await axios.post(
      //   "/listings/create",
      //   formData,
      // );
      // return response.data;
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
      });
  },
});

export const { clearListingState} = listingSlice.actions;
export default listingSlice.reducer;
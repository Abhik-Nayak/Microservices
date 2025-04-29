"use client";

import { createListing } from "@/redux/slices/listingSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateListingPage() {
  const dispatch = useDispatch();
  const { listings, loading, error, success } = useSelector(
    (state) => state.listing
  );
  console.log(listings, loading, error, success)
  const [formData, setFormData] = useState({
    title: "ada",
    description: "sdf",
    address: "sdfs",
    city: "sdfs",
    state: "dsf",
    country: "sdfs",
    regularPrice: "122121",
    propertyType: "sale",
    bedrooms: 1,
    bathrooms: 1,
    area: "123",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleFileChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: e.target.files,
  //   }));
  // };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setFormData((prev) => ({
      ...prev,
      images: files, // Store the selected files in the 'images' field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Listing: ", formData, localStorage.getItem("user"));
    // TODO: Dispatch redux action or call API
    // dispatch(createListing(formData));
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Create a New Property Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-8"
      >
        {/* Property Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Property Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter property name"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your property..."
              className="input-field"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address"
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Location Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["city", "state", "country"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-semibold mb-1 capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                className="input-field"
                required
              />
            </div>
          ))}
        </div>

        {/* Pricing and Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="regularPrice"
              value={formData.regularPrice}
              onChange={handleChange}
              placeholder="Price"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Property Type
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="input-field"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Area */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Area (sqft)
          </label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Area in sqft"
            className="input-field"
            required
          />
        </div>

        {/* Upload Images */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Property Images
          </label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-bold text-lg"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}

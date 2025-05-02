"use client"

import { getListingById } from "@/redux/slices/listingSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// app/protected/listings/page.js
export default function ListingsPage() {
  const dispatch = useDispatch();
  const { loading, error, success, listings } = useSelector((state) => state.listing);
  useEffect(() => {
    // Fetch listings when the component mounts
    dispatch(getListingById());
  }, [dispatch]);
  console.log(loading, error, success,listings);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Listings</h1>
      <p>All your listings appear here.</p>
    </div>
  );
}

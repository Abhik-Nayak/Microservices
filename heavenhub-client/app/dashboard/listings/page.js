"use client";

import FiltersBar from "@/components/FiltersBar";
import ListingCard from "@/components/ListingCard";
import { getListingById } from "@/redux/slices/listingSlice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ListingsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1); // Initialize page state
  const { loading, error, success, listings } = useSelector(
    (state) => state.listing
  );
  useEffect(() => {
    if (listings?.content?.data?.length > 0) {
      setPropertyDetails(listings?.content?.data);
    }
    setPropertyDetails(listings?.content?.data);
  }, [listings]);
  useEffect(() => {
    dispatch(getListingById());
  }, [dispatch]);

  function getDaysSince(createdAt) {
    const createdDate = new Date(createdAt);
    const today = new Date();

    // Calculate difference in milliseconds
    const diffTime = today - createdDate;

    // Convert milliseconds to full days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return "Today";
    }

    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  }

  const handleFilterChange = useCallback(
    (filters) => {
      const queryParams = new URLSearchParams();

      if (filters.search) queryParams.set("search", filters.search);
      if (filters.priceMin) queryParams.set("priceMin", filters.priceMin);
      if (filters.priceMax) queryParams.set("priceMax", filters.priceMax);
      if (filters.type) queryParams.set("type", filters.type);

      router.push(`/dashboard/listings?${queryParams.toString()}`);
      setPage(1);
      setFilters(filters);
    },
    [router]
  );
  return (
    <div className="px-4 my-16">
      <h1 className="text-3xl font-bold mb-4">Listings</h1>
      <p className="mb-6">All your listings appear here.</p>
      <FiltersBar onFilterChange={handleFilterChange} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {propertyDetails?.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {propertyDetails.map((item, index) => (
            <ListingCard
              key={index}
              image={
                item?.image ||
                `/Property${Math.floor(Math.random() * 12) + 1}.jpg`
              }
              title={item?.title || "3BHK Luxury Apartment"}
              location={
                `${item?.city},${item.state},${item?.country}` ||
                "Bhubaneswar, Odisha"
              }
              price={item?.regularPrice || "85,00,000"}
              listedBy={item?.listedBy || "Monisha Gajendra"}
              carParking={item?.parking ? "Yes" : "No" || "2 Slots"}
              advertised={getDaysSince(item?.createdAt) || "5 days ago"}
              avatar={item?.avatar || "/img/monisha.jpg"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import FiltersBar from "@/components/FiltersBar";
import ListingCard from "@/components/ListingCard";
import { getListingById } from "@/redux/slices/listingSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ListingsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [propertyDetails, setPropertyDetails] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  const { loading, error, listings } = useSelector((state) => state.listing);

  // Extract filters from URL only once on initial load
  useEffect(() => {
    const parsedFilters = {
      search: searchParams.get("search") || "",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
      type: searchParams.get("type") || "",
      page: 1,
    };
    setFilters(parsedFilters);
    setPage(1);
    dispatch(getListingById(parsedFilters));
  }, [dispatch, searchParams]);

  // Update listings when fetched
  useEffect(() => {
    const newData = listings?.content?.data?.data || [];
    const hasMoreData = listings?.content?.data?.hasMore ?? false;

    if (page === 1) {
      setPropertyDetails(newData);
    } else {
      setPropertyDetails((prev) => [...prev, ...newData]);
    }

    // setHasMore(hasMoreData);
  }, [listings,page]);

  const handleFilterChange = useCallback(
    (filters) => {
      const queryParams = new URLSearchParams();

      if (filters.search) queryParams.set("search", filters.search);
      if (filters.priceMin) queryParams.set("priceMin", filters.priceMin);
      if (filters.priceMax) queryParams.set("priceMax", filters.priceMax);
      if (filters.type) queryParams.set("type", filters.type);

      setFilters(filters);
      setPage(1);
      // setHasMore(true);
      setPropertyDetails([]);
      isFirstLoad.current = false;

      router.push(`/dashboard/listings?${queryParams.toString()}`);
      dispatch(getListingById({ ...filters, page: 1 }));
    },
    [router, dispatch]
  );

  function getDaysSince(createdAt) {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const diffDays = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
    return diffDays === 0
      ? "Today"
      : `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight + 25; // Adjust threshold if needed

      if (scrollPosition >= threshold) {
        // reachedAtBottom(); // Call your function here
        console.log("Reached the bottom of the page");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-4 my-16">
      <h1 className="text-3xl font-bold mb-4">Listings</h1>
      <p className="mb-6">All your listings appear here.</p>
      <FiltersBar onFilterChange={handleFilterChange} />

      {error && <p className="text-red-500">Error: {error}</p>}

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
              `${item?.city}, ${item?.state}, ${item?.country}` ||
              "Bhubaneswar, Odisha"
            }
            price={item?.regularPrice || "85,00,000"}
            listedBy={item?.listedBy || "Monisha Gajendra"}
            carParking={item?.parking ? "Yes" : "No"}
            advertised={getDaysSince(item?.createdAt) || "5 days ago"}
            avatar={item?.avatar || "/img/monisha.jpg"}
          />
        ))}
      </div>
    </div>
  );
}

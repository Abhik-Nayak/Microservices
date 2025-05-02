"use client";

import ListingCard from "@/components/ListingCard";
import { getListingById } from "@/redux/slices/listingSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ListingsPage() {
  const dispatch = useDispatch();
  const { loading, error, success, listings } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    dispatch(getListingById());
  }, [dispatch]);

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-4">Listings</h1>
      <p className="mb-6">All your listings appear here.</p>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 })
          .map((item, index) => (
            <ListingCard
              key={index}
              image={item?.image || `/Property${index+1}.jpg`}
              title={item?.name || "3BHK Luxury Apartment"}
              location={item?.location || "Bhubaneswar, Odisha"}
              price={item?.price || "85,00,000"}
              listedBy={item?.listedBy || "Monisha Gajendra"}
              carParking={item?.carParking || "2 Slots"}
              advertised={item?.advertised || "5 days ago"}
              avatar={item?.avatar || "/img/monisha.jpg"}
            />
          ))}
      </div>
    </div>
  );
}

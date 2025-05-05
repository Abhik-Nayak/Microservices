"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";

export default function SellerDashboard() {
  const { user } = useSelector((state) => state.auth);
  const listings = useSelector((state) => state.listing.listings?.content?.data || []);

  const totalListings = listings.length;
  const activeListings = listings.filter(item => item.status !== "inactive").length;
  const totalViews = listings.reduce((sum, item) => sum + (item.views || 0), 0);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen my-6">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || "Seller"} 👋</h1>
      <p className="text-gray-600 mb-6">Here's a quick overview of your real estate activity.</p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Listings</p>
          <h2 className="text-2xl font-semibold">{totalListings}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Active Listings</p>
          <h2 className="text-2xl font-semibold">{activeListings}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Views</p>
          <h2 className="text-2xl font-semibold">{totalViews}</h2>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recent Listings</h2>
        <Link
          href="/dashboard/create-listing"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create New Listing
        </Link>
      </div>

      {/* Listings Preview */}
      {listings.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.slice(0, 6).map((item, index) => (
            <ListingCard
              key={index}
              image={item.image || `/Property${Math.floor(Math.random() * 12) + 1}.jpg`}
              title={item.title}
              location={`${item.city}, ${item.state}`}
              price={item.regularPrice}
              listedBy={item.listedBy}
              advertised={item.createdAt}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have not added any listings yet.</p>
      )}
    </div>
  );
}

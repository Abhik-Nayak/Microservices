"use client";
import { useEffect, useState } from "react";

export default function FiltersBar({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [type, setType] = useState("");
  const [showSticky, setShowSticky] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY && currentScrollY > 200) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ search, priceMin, priceMax, type });
    setDrawerOpen(false); // Close drawer on submit
  };

  return (
    <>
      {/* Filter Toggle Button (mobile only) */}
      <div
        className={`md:hidden fixed bottom-5 right-5 z-40 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition`}
      >
        <button onClick={() => setDrawerOpen(true)}>Filter</button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={() => setDrawerOpen(false)} className="text-gray-600 text-xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <input
            type="text"
            placeholder="Search location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Types</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Desktop / Tablet Filter Bar */}
      <div
        className={`hidden md:flex z-30 transition-all duration-300 ${
          showSticky ? "fixed top-15 left-0 right-0 bg-white shadow-md" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-4 items-center p-4 mx-auto max-w-7xl"
        >
          <input
            type="text"
            placeholder="Search location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />

          <input
            type="number"
            placeholder="Min Price"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full sm:w-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full sm:w-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="">All Types</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </>
  );
}

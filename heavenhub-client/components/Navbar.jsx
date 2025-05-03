"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useState, useEffect } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/auth/login";
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">HeavenHub</h1>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            {user?.role === "admin" && (
              <Link href="/admin/dashboard" className="hover:text-blue-600">
                Admin Panel
              </Link>
            )}
            {user?.role === "seller" && (
              <>
                <Link href="/dashboard/listings" className="hover:text-blue-600">
                  My Listings
                </Link>
                <Link href="/dashboard/create-listing" className="hover:text-blue-600">
                  Add New Listings
                </Link>
              </>
            )}
            {user?.role === "buyer" && (
              <Link href="/buyer/saved" className="hover:text-blue-600">
                Saved Homes
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow">
          <div className="flex flex-col gap-3 mt-2">
            {user?.role === "admin" && (
              <Link href="/admin/dashboard" className="hover:text-blue-600">
                Admin Panel
              </Link>
            )}
            {user?.role === "seller" && (
              <>
                <Link href="/dashboard/listings" className="hover:text-blue-600">
                  My Listings
                </Link>
                <Link href="/dashboard/create-listing" className="hover:text-blue-600">
                  Add New Listings
                </Link>
              </>
            )}
            {user?.role === "buyer" && (
              <Link href="/buyer/saved" className="hover:text-blue-600">
                Saved Homes
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/auth/login";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-600">HeavenHub</h1>
      <div className="flex gap-4">
        {/* <Link href="/dashboard">Dashboard</Link> */}
        {user?.role === "admin" && (
          <Link href="/admin/dashboard">Admin Panel</Link>
        )}
        {user?.role === "seller" && (
          <Link href="/seller/my-properties">My Listings</Link>
        )}
        {user?.role === "buyer" && <Link href="/buyer/saved">Saved Homes</Link>}

        {/* <Link href="/dashboard/listings">Listings</Link> */}
        <button onClick={handleLogout} className="text-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}

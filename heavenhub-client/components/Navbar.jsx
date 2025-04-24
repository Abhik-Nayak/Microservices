"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/auth/login";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-600">HeavenHub</h1>
      <div className="flex gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/listings">Listings</Link>
        <button onClick={handleLogout} className="text-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}

"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

export default function DashboardPage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // This clears state + localStorage and redirects
    window.location.href = "/auth/login";
  };
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600">This is a protected route.</p>
        <p className="text-lg text-gray-600">
          You must be logged in to see this.
        </p>
        <p className="text-lg text-gray-600">Welcome to your dashboard!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}

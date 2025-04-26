// app/protected/layout.js
"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function ProtectedLayout({ children }) {
  console.log("children",children)
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </ProtectedRoute>
  );
}

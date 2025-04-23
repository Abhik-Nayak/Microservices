"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    // Now this runs only on the client
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    console.log("Token:", token,user);

    if (token && user) {
      setIsAuthenticated(true);
    } else {
      router.push("/auth/signup");
      setIsAuthenticated(false);
    }
  }, [router]);

  if (isAuthenticated === null) return null; // optional: show spinner
  if (!isAuthenticated) return null;

  return children;
}

// src/App.js
import React, { useState } from "react";
import { register, login, getUser, updateUser, logout } from "./services/authService";

function App() {
  const [user, setUser] = useState(null);

  const handleRegister = async () => {
    await register("test@example.com", "password123");
    alert("Registered!");
  };

  const handleLogin = async () => {
    const res = await login("test@example.com", "password123");
    console.log("Login response:", res);
    alert("Logged in!");
  };

  const handleGetUser = async () => {
    try {
      const data = await getUser();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleUpdateUser = async () => {
    const updated = await updateUser({ name: "New Name" });
    setUser(updated);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    alert("Logged out!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>JWT Auth Test Client</h1>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetUser}>Get User</button>
      <button onClick={handleUpdateUser}>Update User</button>
      <button onClick={handleLogout}>Logout</button>

      {user && (
        <div style={{ marginTop: 20 }}>
          <h3>User Info:</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

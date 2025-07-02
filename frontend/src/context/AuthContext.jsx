// =====================================
// File: AuthContext.jsx
// Purpose: Authentication context provider for managing user sessions
// Used in: App root for global auth state management
// Features: JWT handling, local storage sync, login/logout
// Dependencies: React Context API
// =====================================

// Import required React features for context and state management
import React, { createContext, useState, useEffect } from "react";

// Create authentication context with default values
export const AuthContext = createContext({
  token: null,          // JWT token
  user: null,           // User object
  login: async () => {}, // Login function placeholder
  logout: () => {}      // Logout function placeholder
});

// Authentication Provider Component
export function AuthProvider({ children }) {
  // Initialize token state from localStorage or null
  const [token, setToken] = useState(() => {
    return localStorage.getItem("jwttoken") || null;
  });

  // Initialize user state from localStorage or null
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sync token with localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwttoken", token);
    } else {
      localStorage.removeItem("jwttoken");
    }
  }, [token]); // Only re-run if token changes

  // Login function - called from Login component
  const login = async (username, password) => {
    // Make authentication request to backend
    const response = await fetch("http://localhost:8080/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    // Handle authentication failure
    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    // Process successful authentication
    const data = await response.json();
    setToken(data.jwt);              // Store JWT token
    setUser({ username });           // Store user data
    localStorage.setItem("user", JSON.stringify({ username })); // Persist user
  };

  // Logout function - clear all auth state
  const logout = () => {
    setToken(null);                  // Clear token
    setUser(null);                   // Clear user
    localStorage.removeItem("user");  // Clear persisted user
  };

  // Provide auth context to child components
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
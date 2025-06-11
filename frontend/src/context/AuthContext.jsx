import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const[token,setToken] = useState(() => {
        return localStorage.getItem("jwttoken") || null;
    }
    );

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem("jwttoken", token);
        } else {
            localStorage.removeItem("jwttoken");
        }
    }
    , [token]);
    const login = async (username, password) => {
        const response = await fetch("http://localhost:8080/api/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })  //  Correct key names
        });
    
        if (!response.ok) {
            throw new Error("Invalid username or password");
        }
    
        const data = await response.json();
        setToken(data.jwt);
        setUser({ username });
        localStorage.setItem("user", JSON.stringify({ username }));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

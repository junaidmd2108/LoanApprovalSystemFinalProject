import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const[token,setToken] = useState(() => {
        return localStorage.getItem("jwttoken") || null;
    }
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem("jwttoken", token);
        } else {
            localStorage.removeItem("jwttoken");
        }
    }
    , [token]);

    const login = async (username, password) => {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: username, password })
        });
        if (!response.ok) {
            throw new Error("Invalid username or password");    

        }
        const data = await response.json();
        setToken(data.jwt); 
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

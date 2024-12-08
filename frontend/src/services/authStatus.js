import React, { createContext, useState, useEffect } from "react";

async function fetchAuthenticatedStatus() {
    const response = await fetch("/auth/status", {
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export const AuthStatusContext = createContext();

export function AuthStatusProvider({ children }) {
    const [authState, setAuthState] = useState({
        isUserAuthenticated: null,
    });

    useEffect(() => {
        fetchAuthenticatedStatus().then((data) => setAuthState(data));
    }, []);

    return (
        <AuthStatusContext.Provider value={authState}>
            {children}
        </AuthStatusContext.Provider>
    );
}

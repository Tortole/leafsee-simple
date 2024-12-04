import React, { createContext, useState, useEffect } from "react";

import getCookie from "../getCookie";

export const fetchAuthenticatedStatus = async () => {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/auth/status", {
        headers: {
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
    });
    const data = await response.json();
    return data;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        authenticated: null,
    });

    useEffect(() => {
        const checkAuth = async () => {
            const data = await fetchAuthenticatedStatus();
            setAuthState(data);
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

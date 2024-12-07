import React, { createContext, useState, useEffect } from "react";

import getCookie from "../getCookie";

async function fetchAuthenticatedStatus() {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/auth/status", {
        headers: {
            "X-CSRFToken": csrfToken,
        },
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

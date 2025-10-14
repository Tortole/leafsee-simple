/*
Context and functions for updating and querying user authentication status
*/

import { createContext, useEffect, useState } from "react";

async function fetchAuthenticatedStatus() {
    /*
    Requesting user authentication status

    Returns:
        authStatusData - authentication status data
    */

    const response = await fetch("/auth/status", {
        credentials: "include",
    });
    const authStatusData = await response.json();
    return authStatusData;
}

export const AuthStatusContext = createContext();

export function AuthStatusProvider({ children }) {
    const [authState, setAuthState] = useState({
        isUserAuthenticated: null,
    });

    // Update authentication status once on page load
    useEffect(() => {
        fetchAuthenticatedStatus().then((authStatusData) =>
            setAuthState(authStatusData),
        );
    }, []);

    return (
        <AuthStatusContext.Provider value={authState}>
            {children}
        </AuthStatusContext.Provider>
    );
}

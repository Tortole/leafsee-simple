import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./static/css/out.css";

import Main from "./pages/Main";

import { AuthProvider } from "./services/authentication/authStatus";

const router = createBrowserRouter([
    {
        path: "",
        element: <Main />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
);

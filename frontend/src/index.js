import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./static/css/out.css";

import Main from "./pages/Main";

import { AuthStatusProvider } from "./services/authStatus";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const router = createBrowserRouter([
    {
        path: "",
        element: <Main />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthStatusProvider>
            <RouterProvider router={router} />
        </AuthStatusProvider>
    </React.StrictMode>,
);

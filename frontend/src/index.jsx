/*
React components root
*/

import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "pages/Main";
import VideoWatch from "pages/VideoWatch";
import { AuthStatusProvider } from "services/authStatus";

import "static/css/out.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/video/:videoId",
        element: <VideoWatch />,
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

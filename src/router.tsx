import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";

export const router = createBrowserRouter([
    {
        path: "/create-an-account",
        element: <h1>Sign up!</h1>
    },
    {
        path: "/log-in",
        element: <Login/>
    },
    {
        path: "/",
        element: <App/>
    }
]);

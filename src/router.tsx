import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import CreateAnAccount from "./pages/CreateAnAccount";

export const router = createBrowserRouter([
    {
        path: "/create-an-account",
        element: <CreateAnAccount/>
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

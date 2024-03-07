import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";

export const router = createBrowserRouter([
    {
        path: "/create-new-account",
        element: <h1>Sign up!</h1>
    },
    {
        path: "/log-in",
        element: <h1>Login!</h1>
    },
    {
        path: "/",
        element: <App/>
    },
]);

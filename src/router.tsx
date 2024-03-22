import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAnAccount from "./pages/CreateAnAccount";

export const router = createBrowserRouter([
    {
        path: "/k",
        element: <Home/>,
        children: [
            {
                path: ":chatId",
                element: <Home/>
            }
        ]
    },
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
        element: <Navigate to="/k" replace/>
    },
    {
        path: "*",
        element: <h1>404 =(</h1>
    }
]);

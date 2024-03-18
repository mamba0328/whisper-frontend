import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
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
        element: <App/>
    }
]);

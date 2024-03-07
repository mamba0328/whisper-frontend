import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

import "./style/index.css";

// Clear the existing HTML content
document.body.innerHTML = "<div id=\"app\"></div>";

// Render your React component instead
// eslint-disable-next-line
const root = createRoot(document.getElementById("app")!);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

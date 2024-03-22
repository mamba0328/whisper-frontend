import React from "react";
import { RouterProvider } from "react-router-dom";

import { CurrentUserIdContextProvider } from "./context/CurrentUserIdContext/CurrentUserIdContext";

import { router } from "./router";

import "./style/index.css";
const App = () => {
    return (
        <main className={"font-regular"}>
            <CurrentUserIdContextProvider>
                <RouterProvider router={router} />
            </CurrentUserIdContextProvider>
        </main>
    );
};

export default App;

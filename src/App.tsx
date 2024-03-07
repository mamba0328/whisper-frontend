import React from "react";
import { Link } from "react-router-dom";

const App = () => {
    return (
        <main className={"container text-center mx-auto my-0"}>
            <h1 className={"underline text-4xl"}>Hello whisper!</h1>
            <Link to={"/log-in"}>Log-in!</Link>
        </main>
    );
};

export default App;

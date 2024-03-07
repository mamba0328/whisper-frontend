import React from "react";
import { Link } from "react-router-dom";

const App = () => {
    return (
        <section>
            <h1 className={"underline text-4xl"}>Hello whisper!</h1>
            <Link to={"/log-in"}>Log-in!</Link>
        </section>
    );
};

export default App;

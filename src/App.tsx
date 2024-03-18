import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/k");
    });
    return (
        <section>
        </section>
    );
};

export default App;

import React from "react";
import { Link } from "react-router-dom";

import logo_letter from "../../assets/imgs/svg/logo_letter.svg";
export const Login = () => {
    return (
        <section className={"w-full h-[100vh] bg-surface-color pt-[4rem]"}>
            <div className={"container mx-auto flex flex-col justify-center items-center"}>
                <div className={"size-logo-lg rounded-full bg-primary-color p-3 flex"}>
                    <img src={logo_letter} alt={"whisper logo"} className={"fill-body-background-color"}/>
                </div>

                <h1 className={"text-center text-primary-text-color text-3xl font-medium py-[1rem]  leading-tight"}>Sign-in to Whisper</h1>

                <div className={"text-center text-secondary-text-color leading-tight mb-[2rem]"}>
                    <p>Please confirm your country code</p>
                    <p>and enter your phone number.</p>
                </div>

                <button>
                    <Link to={"/log-in"} className={"text-primary-color"}>
                        OR SIGN-UP
                    </Link>
                </button>
            </div>
        </section>
    );
};


import React from "react";
import { Link } from "react-router-dom";

import logo_letter from "../../assets/imgs/svg/logo_letter.svg";

import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export const Login = () => {
    return (
        <section className={"w-full h-[100vh] bg-surface-color pt-[4rem] select-none"}>
            <div className={"container mx-auto flex flex-col justify-center items-center"}>
                <div className={"size-logo-lg rounded-full bg-primary-color p-3 flex mb-[3rem]"}>
                    <img src={logo_letter} alt={"whisper logo"} className={"fill-body-background-color"}/>
                </div>

                <h1 className={"text-center text-primary-text-color text-3xl font-medium mb-[1rem]  leading-tight"}>Sign-in to Whisper</h1>

                <div className={"text-center text-secondary-text-color leading-tight mb-[2rem]"}>
                    <p>Please confirm your country code</p>
                    <p>and enter your phone number.</p>
                </div>

                <form className={"w-full max-w-[300px] flex flex-col gap-[1rem] mb-[5px]"}>
                    <Input legend={"Account identifier"} inputTags={{ type: "text", name: "identity_field", id: "identity_field", placeholder: "Username, email or phone number" }} />
                    <Input legend={"Password"} inputTags={{ type: "password", name: "password", id: "password" }}/>
                    <Button size={"lg"} label={"sign-in"}/>
                </form>

                <Link to={"/create-an-account"} className={"w-full max-w-[300px]"}>
                    <Button size={"lg"} label={"or sign-up"} invert={true}/>
                </Link>
            </div>
        </section>
    );
};


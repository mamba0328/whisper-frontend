import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserIdContext } from "../../context/CurrentUserIdContext/CurrentUserIdContext";

import { Input } from "../../components/Input/Input";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { Button } from "../../components/Button/Button";

import { signIn } from "../../services/UserRequestsService/UserRequestsService";
import { SignInPayload } from "../../types/types";

export const Login = () => {
    const { setCurrentUserId } = useContext(CurrentUserIdContext);
    const navigate = useNavigate();
    const handleSignIn = async (signInPayload: SignInPayload) => {
        try {
            const signedInUserId = await signIn(signInPayload);

            localStorage.setItem("userId", signedInUserId!);
            setCurrentUserId(signedInUserId);

            signedInUserId && navigate("/k");
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        const { identity_field, password } = event.target;

        const signInPayload = {
            identity_field: identity_field.value,
            password: password.value
        };

        await handleSignIn(signInPayload);
    };

    return (
        <section className={"w-full h-[100vh] bg-surface-color pt-[4rem] select-none"}>
            <div className={"container mx-auto flex flex-col justify-center items-center"}>
                <div className={"size-logo-lg rounded-full bg-primary-color p-3 flex mb-[3rem]"}>
                    <img src={"/assets/imgs/svg/logo_letter.svg"} alt={"whisper logo"} className={"fill-body-background-color"}/>
                </div>

                <h1 className={"text-center text-primary-text-color text-3xl font-medium mb-[1rem]  leading-tight"}>Sign-in to Whisper</h1>

                <div className={"text-center text-secondary-text-color leading-tight mb-[2rem]"}>
                    <p>Please enter your account data</p>
                    <p>and password to login.</p>
                </div>

                <form className={"w-full max-w-[300px] flex flex-col gap-[1rem] mb-[5px]"} onSubmit={(event) => handleSubmit(event)}>
                    <Input legend={"Account identifier*"} inputTags={{ type: "text", name: "identity_field", id: "identity_field", placeholder: "Username, email or phone number" }} />
                    <PasswordInput/>
                    <Button size={"lg"} label={"sign-in"}/>
                </form>

                <Link to={"/create-an-account"} className={"w-full max-w-[300px]"}>
                    <Button size={"lg"} label={"or sign-up"} invert={true}/>
                </Link>
            </div>
        </section>
    );
};


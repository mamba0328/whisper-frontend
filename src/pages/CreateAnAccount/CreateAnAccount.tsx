import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/UI/Input/Input";
import { PasswordInput } from "../../components/UI/PasswordInput/PasswordInput";
import { Button } from "../../components/UI/Button/Button";

import { signUp } from "../../services/UserRequestsService/UserRequestsService";

export const CreateAnAccount = () => {
    const navigate = useNavigate();
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        const { first_name, last_name, username, phone_number, email, password } = event.target;

        const signUpPayload = {
            first_name: first_name.value,
            last_name: last_name.value,
            username: username.value,
            phone_number: phone_number.value,
            email: email.value,
            password: password.value
        };

        const response = await signUp(signUpPayload);
        response && navigate("/log-in");
    };

    return (
        <section className={"w-full h-[100vh] bg-surface-color pt-[4rem] select-none"}>
            <div className={"container mx-auto flex flex-col justify-center items-center"}>
                <div className={"size-logo-lg rounded-full bg-primary-color p-3 flex mb-[3rem]"}>
                    <img src={"/assets/imgs/svg/logo_letter.svg"} alt={"whisper logo"} className={"fill-body-background-color"}/>
                </div>

                <h1 className={"text-center text-primary-text-color text-3xl font-medium mb-[1rem]  leading-tight"}>Create Whisper account</h1>

                <div className={"text-center text-secondary-text-color leading-tight mb-[2rem]"}>
                    <p>Please enter your personal data</p>
                    <p>to create an account</p>
                </div>

                <form className={"w-full grid max-w-[300px] md:max-w-[700px] md:grid-cols-2  gap-[1rem] mb-[5px]"} onSubmit={(e) => void handleSubmit(e)}>
                    <div>
                        <Input legend={"First name*"} inputTags={{ type: "text", name: "first_name", id: "first_name", placeholder: "John" }} />
                        <Input legend={"Last name*"} inputTags={{ type: "text", name: "last_name", id: "last_name", placeholder: "Doe" }}/>
                        <Input legend={"Username*"} inputTags={{ type: "text", name: "username", id: "username", placeholder: "john_doe" }}/>
                    </div>
                    <div>
                        <Input legend={"Phone number*"} inputTags={{ type: "tel", name: "phone_number", id: "phone_number", placeholder: "+380XXXXXXXXX" }} />
                        <Input legend={"Email*"} inputTags={{ type: "email", name: "email", id: "email", placeholder: "johndoe@mail.com" }}/>
                        <PasswordInput/>
                    </div>
                    <Button size={"lg"} label={"sign-up"}/>
                    <Link to={"/log-in"} className={"w-full"}>
                        <Button size={"lg"} label={"or sign-in"} invert={true}/>
                    </Link>
                </form>
            </div>
        </section>
    );
};


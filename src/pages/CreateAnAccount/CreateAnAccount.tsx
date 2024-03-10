import React from "react";
import { Link } from "react-router-dom";

import logo_letter from "../../assets/imgs/svg/logo_letter.svg";

import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export const CreateAnAccount = () => {
    return (
        <section className={"w-full h-[100vh] bg-surface-color pt-[4rem] select-none"}>
            <div className={"container mx-auto flex flex-col justify-center items-center"}>
                <div className={"size-logo-lg rounded-full bg-primary-color p-3 flex mb-[3rem]"}>
                    <img src={logo_letter} alt={"whisper logo"} className={"fill-body-background-color"}/>
                </div>

                <h1 className={"text-center text-primary-text-color text-3xl font-medium mb-[1rem]  leading-tight"}>Create Whisper account</h1>

                <div className={"text-center text-secondary-text-color leading-tight mb-[2rem]"}>
                    <p>Please enter your personal data</p>
                    <p>to create an account</p>
                </div>

                <form className={"w-full grid max-w-[300px] md:max-w-[700px] md:grid-cols-2  gap-[1rem] mb-[5px]"}>
                    <div>
                        <Input legend={"First name*"} type={"text"} inputTags={{ name: "first_name", id: "first_name", placeholder: "John" }} />
                        <Input legend={"Last name*"} type={"text"} inputTags={{ name: "last_name", id: "last_name", placeholder: "Doe" }}/>
                        <Input legend={"Username*"} type={"text"} inputTags={{ name: "username", id: "username", placeholder: "john_doe" }}/>
                    </div>
                    <div>
                        <Input legend={"Phone number*"} type={"tel"} inputTags={{ name: "phone_number", id: "phone_number", placeholder: "+380XXXXXXXXX" }} />
                        <Input legend={"Email*"} type={"email"} inputTags={{ name: "email", id: "email", placeholder: "johndoe@mail.com" }}/>
                        <Input legend={"Password*"} type={"password"} inputTags={{ name: "password", id: "password", placeholder: "********" }}/>
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


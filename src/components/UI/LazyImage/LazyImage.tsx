import React from "react";
import { MessageImg } from "../../../types/types";
import { twMerge } from "tailwind-merge";

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;

type Props = {
    public_id: MessageImg["public_id"],
    width: number,
    height: number,
    wrapperStyles?: string,
    imgStyles?: string
}

function LazyImage ({ public_id, width = 300, height = 400, wrapperStyles, imgStyles }:Props) {
    return (
        <div style={{ "backgroundImage": `url(https://res.cloudinary.com/${CLOUDINARY_NAME}/image/upload/w_30,h_40,c_fill,q_20/${public_id}.jpg)` }} className={twMerge(`rounded-md bg-no-repeat bg-center bg-cover w-[${width}px] h-[${height}px] ${wrapperStyles}`)}>
            <img src={`https://res.cloudinary.com/${CLOUDINARY_NAME}/image/upload/w_${width},h_${height},c_fill,q_100/${public_id}.jpg`} className={twMerge(`max-w-[300px] max-h-[400px] w-[${width}px] h-[${height}px] backdrop-blur-xl  rounded-md ${imgStyles}`)} alt={"message image"} />
        </div>
    );
}

export default LazyImage;

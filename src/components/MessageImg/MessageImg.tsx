import { MessageImg } from "../../types/types";
import { getImgSrc } from "../../utils/helpers";
import React from "react";
import { twMerge } from "tailwind-merge";

export default ({ width, height, filename }:MessageImg) => {

    return <img src={getImgSrc(filename)} style={{ "backgroundImage": `url(${getImgSrc(filename.replace(".", "-small."))})` }} className={twMerge(`max-w-[300px] max-h-[400px] w-[${width}] h-[${height}] rounded-md`)} alt={"message image"} />;
};

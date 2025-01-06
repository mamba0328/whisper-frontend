import React, { useEffect, useState } from "react";
import { SignatureResponse } from "../types/types";
import { getSignature } from "../services/UserRequestsService/UserRequestsService";

export const useCloudinarySignature = () => {
    const [signature, setSignature] = useState<Partial<SignatureResponse>>({});

    useEffect(() => {
        void newSignature();
    }, []);

    const newSignature = async () => {
        const response = await getSignature();
        setSignature(response);
    };

    return signature;
};

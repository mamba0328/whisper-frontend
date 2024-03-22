import axios from "axios";
import { router } from "../../router";

const axiosInstance = axios.create({
    timeout: 1000
});

axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) { // Unauthorized
        return router.navigate("/log-in");
    }
});


export const { get, post, put, delete: del } = axiosInstance;


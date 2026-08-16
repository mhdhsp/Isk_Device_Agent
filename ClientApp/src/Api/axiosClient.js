import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});


// Request Interceptor
axiosClient.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(
            `${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
        );

        return config;
    },
    (error) => Promise.reject(error)
);


// Response Interceptor
axiosClient.interceptors.response.use(

    (response) => response.data,

    (error) => {

        if (error.response) {

            console.error(
                "API Error:",
                error.response.status,
                error.response.data
            );

        }
        else if (error.request) {

            console.error(
                "Server not reachable"
            );

        }
        else {

            console.error(
                error.message
            );

        }

        return Promise.reject(error);
    }
);


export default axiosClient;
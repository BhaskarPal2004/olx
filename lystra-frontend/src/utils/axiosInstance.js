import axios from "axios";
import { AUTH_API_ENDPOINT } from "@/utils/endPoints";

export const createInstance = (baseURL, accessToken, refreshToken, withAuth = true, unwrapResponse = true) => {
    const instance = axios.create({ baseURL });

    if (withAuth) {
        instance.interceptors.request.use(
            (req) => {
                if (accessToken) {
                    req.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                return req;
            },
            (error) => Promise.reject(error)
        );

        if (unwrapResponse) {
            instance.interceptors.response.use(
                (response) => response.data,
                async (error) => {
                    const originalReq = error.config;
                    if (error.response?.status === 401 && !originalReq._retry) {
                        originalReq._retry = true;
                        try {
                            const res = await axios.get(`${AUTH_API_ENDPOINT}/accessToken`, {
                                headers: { Authorization: `Bearer ${refreshToken}` },
                            });

                            const newAccessToken = res.data.accessToken;
                            localStorage.setItem("accessToken", newAccessToken);

                            originalReq.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axios(originalReq);
                        } catch (refreshError) {
                            console.error("Token refresh failed", refreshError);
                            return Promise.reject(refreshError);
                        }
                    }
                    return Promise.reject(error);
                }
            );
        } else {
            // If unwrapResponse is false, return full response 
            instance.interceptors.response.use(
                (response) => response,
                (error) => Promise.reject(error)
            );
        }
    } else {
        instance.interceptors.response.use((response) => (unwrapResponse ? response.data : response), (error) => Promise.reject(error));
    }

    return instance;
};

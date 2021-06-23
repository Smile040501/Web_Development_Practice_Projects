import { useState, useEffect } from "react";

const useHttpErrorHandler = (httpClient) => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(
        (req) => {
            setError(null);
            return req;
        },
        (err) => {
            setError(err);
            return Promise.reject(err);
        }
    );

    const resInterceptor = httpClient.interceptors.response.use(
        (res) => res,
        (err) => {
            setError(err);
            return Promise.reject(err);
        }
    );

    useEffect(() => {
        return () => {
            // Removing interceptors
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
};

export default useHttpErrorHandler;

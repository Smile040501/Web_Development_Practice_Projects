import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback(
        async (
            url,
            method = "GET",
            body = null,
            headers = {},
            domain = process.env.REACT_APP_API_DOMAIN
        ) => {
            setIsLoading(true);

            // Aborting requests which are on the way and user redirects
            const httpAbortCtrll = new AbortController();
            activeHttpRequest.current.push(httpAbortCtrll);

            try {
                const res = await fetch(domain + url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrll.signal,
                });

                const resData = await res.json();

                // If request got complete we no longer need to abort controller
                activeHttpRequest.current = activeHttpRequest.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrll
                );

                if (!res.ok) {
                    throw new Error(resData.message);
                }
                setIsLoading(false);
                return resData;
            } catch (err) {
                setError(err.message || "Something went wrong, please try again.");
                setIsLoading(false);
                throw err;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };

    // While unmounting, abort all the pending requests
    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};

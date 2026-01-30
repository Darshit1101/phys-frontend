import { VITE_BACKEND_URL, VITE_ENVIRONMENT } from "../constants/environment";
import { useAuth } from "../stores/useAuth";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

const useApiCall = ({
  url,
  method = "GET",
  body = null,
  headers = {},
  params = {},
  autoFetch = true,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const configRef = useRef({ url, method, body, headers, params });

  const apiCall = useCallback(async (override = {}) => {
    setLoading(true);
    setError(null);

    try {
      const finalMethod = override.method || configRef.current.method;
      const finalUrl = `${
        VITE_ENVIRONMENT === "DEV" ? `${VITE_BACKEND_URL}/app` : "/api/app"
      }${override.url || configRef.current.url}`;

      const finalHeaders = override.headers || configRef.current.headers;
      const finalParams = override.params || configRef.current.params;
      const rawBody = override.body ?? configRef.current.body;

      const response = await axiosInstance({
        method: finalMethod,
        url: finalUrl,
        data: rawBody,
        headers: finalHeaders,
        params: finalParams,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      if (err?.response?.status === 401) {
        const reason = err?.response?.data;
        if (reason?.data?.logout) {
          const { logout } = useAuth.getState();
          logout();
        }
      }

      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) apiCall();
  }, [apiCall, autoFetch]);

  return { data, loading, error, apiCall };
};

export default useApiCall;

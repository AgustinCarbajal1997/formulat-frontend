import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let abortController = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}`, {
          ...options,
          signal: abortController.signal,
        });
        if (!abortController.signal.aborted) {
          const data = await response.json();
          setData(data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.name === "AbortError") {
          return;
        }
        setError(error);
      }
    })();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    data,
    setData,
    error,
    loading,
  };
};

export default useFetch;

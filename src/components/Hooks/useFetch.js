import { useState, useEffect, useMemo } from "react";

function useFetch(api, opts = {}, delay = 0) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = useMemo(() => {
    return api;
  }, [api]);
  const options = useMemo(() => {
    return opts;
  }, [api]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, delay));
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (isMounted) {
          const jsonData = await response.json();
          setData(jsonData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url, options]);
  return { data, loading, error };
}

export default useFetch;

// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (apiCallFunction, ...params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stringify params to use as a dependency, ensuring stability if params are objects/arrays
  const paramsString = JSON.stringify(params);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await apiCallFunction(...JSON.parse(paramsString));
        setData(res.data);
      } catch (err) {
        console.error('API Error in useFetch:', err);
        setError(
          err.response?.data?.status_message ||
            err.message ||
            'Something went wrong!'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCallFunction, paramsString]); // Re-run if function or stringified params change

  return { data, loading, error };
};

export default useFetch;

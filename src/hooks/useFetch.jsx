import { useCallback, useState } from "react";

const useFetch = (url) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (options) => {
      setPending(true);
      setError(null);

      try {
        const response = await fetch(url, options);

        const result = await response.json();

        if (response.status === 401) {
          setError("Your Session has expired");
          return { expired: true };
        }
        if (!response.ok)
          throw new Error(result.message || "Something went wrong");

        return result; // Return response data instead of updating state
      } catch (error) {
        setError(error.message);
        return null;
      } finally {
        setPending(false);
      }
    },
    [url]
  );

  return { pending, error, fetchData };
};

export default useFetch;

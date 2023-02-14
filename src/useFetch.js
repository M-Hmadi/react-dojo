import { useState, useEffect, useCallback } from "react";

const useFetch = (url, immediate, blog = null) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(
    (blog = null) => {
      setIsPending(true);
      const requestInit = blog
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
          }
        : null;
      // set timeout is added to mimic a delay
      setTimeout(() => {
        fetch(url, requestInit)
          .then((res) => {
            if (!res.ok) {
              throw Error("could not fetch data for that resource");
            }
            return res.json();
          })
          .then((receivedData) => {
            setData(receivedData);
            setIsPending(false);
            setError(null);
          })
          .catch((err) => {
            setIsPending(false);
            setError(err.message);
          });
      }, 500);
    },
    [url]
  );

  useEffect(() => {
    if (immediate) {
      executeFetch(blog);
    }
  }, [blog, executeFetch, immediate]);

  return { data, isPending, error, executeFetch };
};

export default useFetch;

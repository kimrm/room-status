import { useState, useEffect, useRef } from "react";

const fetchUrl = async (url: string) => {
  console.log("Fetching from " + url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const json = await response.json();
  return json;
};

export const useFetch = <T>(url: string, interval = 0): T | null => {
  const [data, setData] = useState<T | null>(null);
  const dataRef = useRef<T | null>(null);

  useEffect(() => {
    let ignore = false;
    let intervalId: number | undefined;

    const fetchData = async () => {
      try {
        const json = await fetchUrl(url);
        if (!ignore) {
          if (JSON.stringify(json) !== JSON.stringify(dataRef.current)) {
            dataRef.current = json;
            setData(json);
          }
        }
      } catch (error) {
        if (!ignore) {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();

    if (interval > 0) {
      intervalId = window.setInterval(fetchData, interval);
    }

    return () => {
      ignore = true;
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [url, interval]);

  return data;
};

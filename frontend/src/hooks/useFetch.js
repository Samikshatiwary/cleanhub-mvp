import { useEffect, useRef, useState } from "react";
import axios from "axios";

/**

 * @param {Function} runner async () => data
 * @param {Array} deps dependencies to refetch on change
 */
export default function useFetch(runner, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);
    setError("");
    (async () => {
      try {
        const res = await runner();
        if (mounted.current) setData(res);
      } catch (e) {
        if (mounted.current) setError(e?.response?.data?.message || e.message);
      } finally {
        if (mounted.current) setLoading(false);
      } 
    })();
    return () => {
      mounted.current = false;
    };
  }, deps);

  return { data, loading, error, setData };
}
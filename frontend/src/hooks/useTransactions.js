import { useEffect, useState } from "react";
import api from "../services/api";
import qs from "qs";

export default function useTransactions(params) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1, limit: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const cleaned = {};

        Object.keys(params).forEach((key) => {
          const value = params[key];
          if (value === undefined || value === null) return;
          if (Array.isArray(value) && value.length === 0) return;
          if (typeof value === "string" && value.trim() === "") return;
          cleaned[key] = Array.isArray(value) ? value.join(",") : value;
        });

        const query = qs.stringify(cleaned, { addQueryPrefix: true, encode: false });
        const response = await api.get(`/transactions${query}`);
        if (cancelled) return;

        setData(response.data.data || []);
        setMeta(response.data.meta || { total: 0, page: 1, pages: 1, limit: 10 });
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(params)]);

  return { data, meta, loading, error };
}

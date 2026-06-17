"use client";

import { useEffect, useState } from "react";

export interface HomeData {
  hero?: any;
  promo?: any;
  testimonials?: any;
  concentrados?: any;
  action?: any;
}

export function useHomeData() {
  const [data, setData] = useState<HomeData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/home");
        if (!response.ok) throw new Error("Error fetching data");
        const homeData = await response.json();
        setData(homeData);
      } catch (err) {
        setError((err as Error).message);
        console.error("Error fetching home data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

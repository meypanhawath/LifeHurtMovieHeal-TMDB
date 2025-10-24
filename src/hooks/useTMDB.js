
import { useState, useEffect } from 'react';

const API_KEY = '866c685154847d45f45a1e53dd9f590c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const useTMDB = (endpoint, params = {}, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          api_key: API_KEY,
          ...params
        });
        
        const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params), enabled]);

  return { data, loading, error, IMAGE_BASE_URL };
};
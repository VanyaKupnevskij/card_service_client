import axios from '../axios.common';
import { useState, useCallback } from 'react';

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async ({ url, params = {}, method = 'get', data = {}, headers = {} }) => {
      setLoading(true);
      try {
        if (data) {
          data = JSON.stringify(data);
        }

        const options = {
          method,
          headers,
          data,
          url,
          params,
        };

        const response = await axios(options);

        setLoading(false);

        return response.data;
      } catch (e) {
        setLoading(false);
        setError(e.response.data);
        throw e.response.data;
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
}

import { useState, useEffect } from 'react';

interface UseApiOptions<T> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  initialData?: T;
  dependencies?: any[];
  skip?: boolean;
}

export function useApi<T>({
  url,
  method = 'GET',
  body,
  initialData,
  dependencies = [],
  skip = false
}: UseApiOptions<T>) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(!skip);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (skip) {
      setIsLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        };
        
        if (body && (method === 'POST' || method === 'PUT')) {
          options.body = JSON.stringify(body);
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(`Error fetching data from ${url}:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [...dependencies, url, method, skip]);
  
  return { data, isLoading, error, setData };
}

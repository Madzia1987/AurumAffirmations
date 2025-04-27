import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response): Promise<Response | undefined> {
  if (!res.ok) {
    try {
      // Klonujemy odpowiedź, aby nie zużyć oryginalnego body
      const clonedRes = res.clone();
      const data = await clonedRes.json();
      if (data && data.message) {
        throw new Error(data.message);
      }
    } catch (e) {
      // Jeśli JSON parsing się nie powiedzie, użyj tekstu
      try {
        const clonedRes = res.clone();
        const text = await clonedRes.text() || res.statusText;
        throw new Error(`${res.status}: ${text}`);
      } catch (textError) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
    }
    // Jeśli nie złapaliśmy wyjątku do tej pory, rzuć ogólny błąd
    throw new Error(`${res.status}: ${res.statusText}`);
  }
  return res;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  // Sprawdź, czy odpowiedź jest poprawna (nie rzuci wyjątku)
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    
    try {
      // Klonujemy odpowiedź przed przetworzeniem JSON
      const clonedRes = res.clone();
      return await clonedRes.json();
    } catch (error) {
      console.error("Error parsing JSON in getQueryFn:", error);
      throw new Error("Problem z przetwarzaniem odpowiedzi z serwera");
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

import { useCallback, useEffect, useState } from "react";

const useSupabaseHelpers = <Data>(
  promise: PromiseLike<{ data: Data[] | null }>,
) => {
  const [data, setData] = useState<Data[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const handleRequest = useCallback(async () => {
    try {
      const { data } = await promise;
  
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleRequest();
  }, []);

  return {
    data,
    isLoading,
    error,
  }
}

export default useSupabaseHelpers;

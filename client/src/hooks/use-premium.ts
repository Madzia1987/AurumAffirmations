import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { useToast } from './use-toast';

interface PremiumStatusResponse {
  isPremium: boolean;
}

export const usePremium = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery<PremiumStatusResponse>({
    queryKey: ['/api/check-premium'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const refetchPremiumStatus = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ['/api/check-premium'] });
      const result = await refetch();
      
      if (result.data && result.data.isPremium) {
        toast({
          title: "Premium aktywowano",
          description: "Ciesz się pełnym dostępem do premium treści Aurum Affirmations!",
        });
      }
      
      return result.data?.isPremium || false;
    } catch (err) {
      console.error('Error refetching premium status:', err);
      return false;
    }
  };

  return {
    isPremium: data?.isPremium || false,
    isLoading,
    error,
    refetchPremiumStatus,
  };
};
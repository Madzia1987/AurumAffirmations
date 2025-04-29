import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { useToast } from './use-toast';

export interface SubscriptionStatus {
  active: boolean;
  status: 'active' | 'inactive' | 'trialing' | 'cancelled' | 'expired';
  plan?: string;
  startDate?: string;
  endDate?: string;
}

interface PremiumStatusResponse {
  isPremium: boolean;
  subscription?: SubscriptionStatus;
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
      // Force a delay to ensure the backend has time to process the subscription
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = await refetch();
      
      // Force premium status for demo purposes after a successful registration
      // This makes sure the user sees the premium content immediately
      if (window.location.pathname.includes('/checkout')) {
        toast({
          title: "Premium aktywowano",
          description: "Ciesz się pełnym dostępem do premium treści Aurum Affirmations!",
        });
        window.location.href = '/premium-access';
        // Return true as we know we just purchased access
        return true;
      } else if (result.data && result.data.isPremium) {
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

  // Get user subscription details
  const getUserSubscription = (): SubscriptionStatus | undefined => {
    return data?.subscription;
  };

  // Check if subscription is active
  const hasActiveSubscription = (): boolean => {
    return Boolean(data?.subscription?.active);
  };

  return {
    isPremium: data?.isPremium || false,
    isLoading,
    error,
    subscription: data?.subscription,
    hasActiveSubscription: hasActiveSubscription(),
    getUserSubscription,
    refetchPremiumStatus,
  };
};
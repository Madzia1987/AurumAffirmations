import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { useToast } from './use-toast';
import { useState, useEffect } from 'react';

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
  const [isPremiumOverride, setIsPremiumOverride] = useState<boolean>(
    // Check if we have localstorage override
    localStorage.getItem('premium_override') === 'true'
  );

  // Set premium override in localStorage if coming from checkout success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout_success') === 'true') {
      localStorage.setItem('premium_override', 'true');
      setIsPremiumOverride(true);
      // Clear URL parameter
      window.history.replaceState({}, document.title, window.location.pathname);
      
      toast({
        title: "Premium aktywowano",
        description: "Ciesz się pełnym dostępem do premium treści Aurum Affirmations!",
      });
    }
  }, [toast]);

  const { data, isLoading, error, refetch } = useQuery<PremiumStatusResponse>({
    queryKey: ['/api/check-premium'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const refetchPremiumStatus = async () => {
    try {
      // Set premium override immediately to ensure UI responds correctly
      localStorage.setItem('premium_override', 'true');
      setIsPremiumOverride(true);
      
      // Also invalidate the query
      await queryClient.invalidateQueries({ queryKey: ['/api/check-premium'] });
      await refetch();
      
      if (window.location.pathname.includes('/checkout')) {
        toast({
          title: "Premium aktywowano",
          description: "Ciesz się pełnym dostępem do premium treści Aurum Affirmations!",
        });
        
        // Add checkout_success parameter to make it persist through reloads
        window.location.href = '/premium-access?checkout_success=true';
        return true;
      }
      
      return true;
    } catch (err) {
      console.error('Error refetching premium status:', err);
      return isPremiumOverride;
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
    isPremium: data?.isPremium || isPremiumOverride || false,
    isLoading,
    error,
    subscription: data?.subscription,
    hasActiveSubscription: hasActiveSubscription() || isPremiumOverride,
    getUserSubscription,
    refetchPremiumStatus,
  };
};
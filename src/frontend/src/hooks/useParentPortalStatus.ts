import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

interface ParentPortalStatus {
  nannyCamUrl?: string;
  nap?: {
    status: string;
    time?: string;
  };
  snack?: {
    status: string;
    time?: string;
  };
  play?: {
    status: string;
    time?: string;
  };
}

export function useParentPortalStatus() {
  const { actor, isFetching } = useActor();

  return useQuery<ParentPortalStatus>({
    queryKey: ['parentPortalStatus'],
    queryFn: async () => {
      // Placeholder data until backend implements status tracking
      return {
        nannyCamUrl: undefined,
        nap: {
          status: 'Sleeping peacefully',
          time: '2:30 PM',
        },
        snack: {
          status: 'Apple slices enjoyed',
          time: '3:45 PM',
        },
        play: {
          status: 'Building blocks',
          time: 'Now',
        },
      };
    },
    enabled: !!actor && !isFetching,
  });
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Request } from '../backend';

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestedTime, details }: { requestedTime: bigint; details: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createBookingRequest(requestedTime, details);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useListBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<Request[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

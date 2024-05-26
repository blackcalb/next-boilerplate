import { useQuery } from '@tanstack/react-query';

export default function useGetAccountMovements(
  accountId: string,
  period: number,
) {
  return useQuery({
    queryKey: ['account-movements', accountId, period],
    queryFn: async () => {
      const response = await fetch(
        `/api/money-track/accounts/${accountId}/movements?period=${period}`,
      );

      if (!response.ok) {
        throw new Error('An error occurred while fetching account movements');
      }

      return response.json();
    },
  });
}

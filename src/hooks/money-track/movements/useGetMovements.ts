import { useQuery } from '@tanstack/react-query';

interface AccountMovementResponse {
  _id: string;
  date: string;
  name: string;
  type: string;
  categoryId: string;
  userId: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  bankAccountId: string;
  category: { name: string; _id: string };
  bankAccount: { name: string; _id: string };
}

export default function useGetAccountMovements(type: string, period: number) {
  return useQuery<AccountMovementResponse[]>({
    queryKey: ['account-movements', type, period],
    queryFn: async () => {
      const response = await fetch(
        `/api/money-track/movements/${type}?period=${period}`,
      );

      if (!response.ok) {
        throw new Error('An error occurred while fetching account movements');
      }

      return response.json();
    },
  });
}

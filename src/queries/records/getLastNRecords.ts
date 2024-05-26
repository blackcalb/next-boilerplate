import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import type { CategoryType } from '@/models/money-track/Categories';
import Movement from '@/models/money-track/Movemets';

export async function getLastNMovements(type: CategoryType, n: number = 10) {
  await dbConnect();

  const userId = await getUserId();

  return Movement.find(
    {
      type,
      userId,
    },
    null,
    {
      sort: { date: -1 },
      limit: n,
      lean: true,
    },
  );
}

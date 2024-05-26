import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import Category from '@/models/money-track/Categories';

export default async function getCategoriesByType(type: string) {
  await dbConnect();

  const userId = await getUserId();

  return Category.find(
    {
      type,
      userId,
    },
    undefined,
    { lean: true },
  );
}

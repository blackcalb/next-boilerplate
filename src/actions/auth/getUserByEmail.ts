import dbConnect from '@/lib/mongoose';
import User from '@/models/auth/Users';

export async function getUserByEmail(email: string) {
  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) {
    return undefined;
  }

  return user;
}

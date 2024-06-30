import type { NextRequest } from 'next/server';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import User from '@/models/auth/Users';

export async function POST(req: NextRequest) {
  const userId = await getUserId();

  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const body = await req.json();

  const { module, value } = body;

  if (!module || value === undefined || value === null) {
    return new Response(JSON.stringify({ message: 'Invalid body' }), {
      status: 400,
    });
  }

  await dbConnect();
  await User.findByIdAndUpdate(userId, {
    options: {
      [module]: value,
    },
  });

  return new Response(JSON.stringify({ message: 'Preferences updated' }));
}

/* eslint-disable no-param-reassign */
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth, { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { z } from 'zod';

import { getUserByEmail } from '@/actions/auth/getUserByEmail';
import clientPromise from '@/lib/mongodb';
import Account from '@/models/auth/Accounts';

import { authConfig } from './auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await getUserByEmail(email);
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHub,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(4) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const userCredentials = await Account.findOne({
            userId: user.id,
            type: 'credentials',
          });

          if (!userCredentials || userCredentials.password !== password) {
            return null;
          }

          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub ?? '';
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
});

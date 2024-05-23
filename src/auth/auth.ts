/* eslint-disable no-param-reassign */
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { z } from 'zod';

import { getUserByEmail } from '@/actions/auth/getUserByEmail';

import { authConfig } from './auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await getUserByEmail(email);
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

const prisma = new PrismaClient();

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(4) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const {
            email,
            // password
          } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

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

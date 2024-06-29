import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('hola mundo');
      const isLoggedIn = !!auth?.user;
      const isOnMoneyTrack = nextUrl.pathname.startsWith('/money-track');
      if (isOnMoneyTrack) {
        if (isLoggedIn) return true;
        return false;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

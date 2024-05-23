import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnMoneyTrack = nextUrl.pathname.startsWith('/money-track');
      if (isOnMoneyTrack) {
        if (isLoggedIn) return true;
        return false;
      }
      if (isLoggedIn) {
        return Response.redirect(new URL('/money-track/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

'use server';

import { AuthError } from 'next-auth';

import { signIn } from './auth';

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
    return undefined;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function authenticateGithubAction() {
  return signIn('github');
}

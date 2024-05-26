'use server';

import { AuthError } from 'next-auth';
import type { ZodFormattedError } from 'zod';

import dbConnect from '@/lib/mongoose';
import Account from '@/models/auth/Accounts';
import User from '@/models/auth/Users';
import { SignUpUserSchema } from '@/schemas/money-track/account';

import { signIn } from './auth';

export async function authenticateCredentialAction(
  _: string | undefined,
  formData: FormData,
) {
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

type SignUpState =
  | {
      error: ZodFormattedError<
        {
          name: string;
          email: string;
          password: string;
          rePassword: string;
        },
        string
      >;
    }
  | {
      status: string;
    }
  | undefined;

export async function signUpAction(_: SignUpState, formData: FormData) {
  dbConnect();

  const userData = {
    email: formData.get('email') as string,
    name: formData.get('name') as string,
  };

  // password: formData.get('password') as string,
  const password = formData.get('password') as string;

  const isValid = SignUpUserSchema.safeParse({
    ...userData,
    password,
    rePassword: formData.get('rePassword') as string,
  });

  if (isValid.error) {
    return { error: isValid.error.format() };
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  const newUser = await User.create(userData);
  await Account.create({
    userId: newUser._id.toString(),
    type: 'credentials',
    password,
  });

  await signIn('credentials', {
    email: userData.email,
    password,
    redirect: false,
    redirectTo: '/',
  });
  return { status: 'success' };
}

export async function authenticateGithubAction() {
  return signIn('github');
}

'use server';

import Prisma from '@prisma/client';
import { AuthError } from 'next-auth';
import type { ZodFormattedError } from 'zod';

import { SignUpSchema } from '@/schemas/money-track/account';

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
      data: {
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  | undefined;

export async function signUpAction(_: SignUpState, formData: FormData) {
  const prisma = new Prisma.PrismaClient();

  const data = {
    email: formData.get('email') as string,
    name: formData.get('name') as string,
    password: formData.get('password') as string,
  };

  const isValid = SignUpSchema.safeParse({
    ...data,
    rePassword: formData.get('rePassword') as string,
  });

  if (isValid.error) {
    return { error: isValid.error.format() };
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { password, ...newUser } = await prisma.user.create({
    data,
  });

  await signIn('credentials', {
    email: data.email,
    password,
    redirect: false,
    redirectTo: '/',
  });
  return { data: newUser };
}

export async function authenticateGithubAction() {
  return signIn('github');
}

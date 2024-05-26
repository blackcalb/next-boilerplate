/* eslint-disable no-underscore-dangle */

'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { signUpAction } from '@/auth/actions';
import FormButton from '@/components/buttons/FormButton';
import Input from '@/components/inputs/input';

export function SignUpCredentialForm() {
  const router = useRouter();

  const [state, dispatch] = useFormState(signUpAction, undefined);

  useEffect(() => {
    if (state?.status === 'success') {
      router.push('/');
    }
  }, [router, state?.status]);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex flex-col justify-stretch gap-2">
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          required
          errors={state?.error?.email?._errors}
        />
        <Input
          label="Name"
          type="text"
          name="name"
          id="name"
          required
          errors={state?.error?.name?._errors}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          required
          errors={state?.error?.password?._errors}
        />
        <Input
          label="Repeat Password"
          type="password"
          name="rePassword"
          id="rePassword"
          required
          errors={state?.error?.rePassword?._errors}
        />
        <FormButton
          className="mt-4 self-center px-4 py-2"
          color="primary"
          kind="contained"
        >
          Create Account
        </FormButton>
      </div>
    </form>
  );
}

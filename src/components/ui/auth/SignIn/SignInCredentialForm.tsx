'use client';

import React from 'react';
import { useFormState } from 'react-dom';

import { authenticateCredentialAction } from '@/auth/actions';
import FormButton from '@/components/buttons/FormButton';
import Input from '@/components/inputs/input';

export function SignInCredentialForm() {
  const [errorMessage, dispatch] = useFormState(
    authenticateCredentialAction,
    undefined,
  );
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex flex-col justify-stretch gap-2">
        <Input label="Email" type="email" name="email" id="email" />
        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          helper={
            <div className="text-right text-sm text-slate-300">
              Forgot your password?
            </div>
          }
        />
        <FormButton
          className="mt-4 self-center px-4 py-2"
          color="primary"
          kind="contained"
        >
          Sign In
        </FormButton>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </form>
  );
}

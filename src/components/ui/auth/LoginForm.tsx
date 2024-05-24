'use client';

import React from 'react';
import { useFormState } from 'react-dom';

import {
  authenticateCredentialAction,
  authenticateGithubAction,
} from '@/auth/actions';
import FormButton from '@/components/buttons/FormButton';

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(
    authenticateCredentialAction,
    undefined,
  );
  return (
    <div>
      <form action={dispatch} className="space-y-3">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          defaultValue="test@test.com"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          defaultValue="1234"
        />
        <FormButton>Sign In</FormButton>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>

      <form action={authenticateGithubAction} className="space-y-3">
        <FormButton>Sign In with github</FormButton>
      </form>
    </div>
  );
};

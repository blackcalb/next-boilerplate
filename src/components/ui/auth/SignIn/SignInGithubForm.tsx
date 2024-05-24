'use client';

import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { authenticateGithubAction } from '@/auth/actions';
import FormButton from '@/components/buttons/FormButton';

export function SignInGithubForm() {
  return (
    <form action={authenticateGithubAction} className="space-y-3">
      <FormButton
        className="p-2"
        iconEnd={<FontAwesomeIcon icon={faGithub} size="3x" />}
      />
    </form>
  );
}

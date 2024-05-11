'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

import BaseButton from '../BaseButton';

export const FormButton = () => {
  const { pending } = useFormStatus();
  return <BaseButton label="Submit" type="submit" disabled={pending} />;
};

export default FormButton;

'use server';

import { redirect } from 'next/navigation';

import Prisma from '@/lib/prisma';

export default async function createNewComponent(formData: FormData) {
  const rawFormData = {
    name: formData.get('name')?.toString() ?? '',
    description: formData.get('description')?.toString() ?? '',
  };

  await Prisma.components.create({
    data: {
      name: rawFormData.name,
      description: rawFormData.description,
      latestVersion: {
        identifier: 'draft',
      },
      versions: [
        {
          identifier: 'draft',
        },
      ],
    },
  });

  redirect('/components');
}

'use server';

import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import z from 'zod';

import getUserId from '@/actions/auth/getUserId';
import dbConnect from '@/lib/mongoose';
import BankAccount from '@/models/money-track/BankAcounts';
import Budget from '@/models/money-track/Budgets';
import Movement from '@/models/money-track/Movemets';

const UpdateMovementSchema = z.object({
  name: z.string().min(1).max(255),
  date: z.date(),
  amount: z.number().min(0.01),
  bankAccountId: z.string().length(24),
  categoryId: z.string().length(24),
});

export default async function updateMovement(_: any, formData: FormData) {
  await dbConnect();
  const userId = await getUserId();

  const newData = {
    id: formData.get('movementId') as string,
    name: formData.get('name') as string,
    date: new Date(formData.get('date') as string),
    amount: Number(formData.get('amount') as string),
    bankAccountId: formData.get('bankAccount') as string,
    categoryId: formData.get('category') as string,
  };

  const path = formData.get('path') as string;

  const isValid = UpdateMovementSchema.safeParse(newData);

  if (isValid.error) {
    return {
      errors: isValid.error.errors,
    };
  }

  const movement = await Movement.findById(newData.id);

  if (!movement) {
    return {
      error: 'Movement not found',
    };
  }

  if (movement.userId.toString() !== userId) {
    return {
      error: 'not authorized',
    };
  }

  // update movement
  await Movement.findByIdAndUpdate(newData.id, {
    name: newData.name,
    date: newData.date,
    amount: -newData.amount,
    bankAccountId: newData.bankAccountId,
    categoryId: newData.categoryId,
  });

  if (movement.bankAccountId.toString() !== newData.bankAccountId) {
    await BankAccount.findByIdAndUpdate(movement.bankAccountId, {
      $inc: { balance: -movement.amount },
    });
    await BankAccount.findByIdAndUpdate(newData.bankAccountId, {
      $inc: { balance: -newData.amount },
    });
  } else if (movement.amount !== -newData.amount) {
    const diff = -movement.amount - newData.amount;
    await BankAccount.findByIdAndUpdate(newData.bankAccountId, {
      $inc: { balance: diff },
    });
  }

  if (movement.categoryId?.toString() !== newData.categoryId) {
    await Budget.updateMany(
      {
        userId: new ObjectId(userId),
        categoryIds: movement.categoryId,
        from: { $lte: movement.date },
        to: { $gte: movement.date },
      },
      {
        $inc: { amount_spent: movement.amount },
      },
    );

    await Budget.updateMany(
      {
        userId: new ObjectId(userId),
        categoryIds: newData.categoryId,
        from: { $lte: newData.date },
        to: { $gte: newData.date },
      },
      {
        $inc: { amount_spent: newData.amount },
      },
    );
  } else if (movement.amount !== -newData.amount) {
    const diff = movement.amount + newData.amount;
    await Budget.updateMany(
      {
        userId: new ObjectId(userId),
        categoryIds: movement.categoryId,
        from: { $lte: movement.date },
        to: { $gte: movement.date },
      },
      {
        $inc: { amount_spent: diff },
      },
    );
  }

  if (path) {
    revalidatePath(path);
  }
  return {
    sttus: 'success',
  };
}

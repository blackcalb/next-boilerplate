import type { ObjectId } from 'mongoose';

import dbConnect from '@/lib/mongoose';
import type { CategoryType } from '@/models/money-track/Categories';
import Movement from '@/models/money-track/Movemets';

import { updateBalanceAccount } from '../bankAccounts/updateBalance';
import updateBudgetUsedAmount from '../budgets/updateBudgets';

interface ICreateMovement {
  bankAccountId: string | ObjectId;
  date: Date;
  name: string;
  amount: number;
  currency: string;
  type: CategoryType;
  userId: string | ObjectId;
  categoryId?: string | ObjectId;
}

type ICreateMovementOptions = {
  updateAccountBalance?: boolean;
  updateBudgets?: boolean;
};

export default async function createMovement(
  movement: ICreateMovement,
  options?: ICreateMovementOptions,
) {
  await dbConnect();

  await Movement.create(movement);

  const actions = [];

  if (options?.updateAccountBalance) {
    actions.push(updateBalanceAccount(movement.bankAccountId, movement.amount));
  }
  if (options?.updateBudgets && movement.categoryId) {
    actions.push(
      updateBudgetUsedAmount(
        movement.categoryId,
        movement.type,
        -movement.amount,
        movement.date,
      ),
    );
  }

  await Promise.all(actions);
}

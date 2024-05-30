import getAccounts from '@/actions/money-track/accounts/getAccounts';
import getCategories from '@/actions/money-track/categories/getCategories';
import { CategoryType } from '@/models/money-track/Categories';
import mapDocumentToClient from '@/utils/mapDocumentToClient';

import { AddNewItemForm } from './AddNewItemForm';

export async function AddNewItem() {
  const [accounts, expenseCategories] = await Promise.all([
    getAccounts(),
    getCategories(CategoryType.Expense),
  ]);

  return (
    <AddNewItemForm
      bankAccounts={accounts.map(mapDocumentToClient)}
      expenseCategories={expenseCategories.map(mapDocumentToClient)}
    />
  );
}

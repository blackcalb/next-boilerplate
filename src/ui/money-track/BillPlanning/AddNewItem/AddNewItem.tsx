import getBankAccountsOptions from '@/actions/money-track/accounts/getBankAccountsOptions';
import getCategoriesOptions from '@/actions/money-track/categories/getCategoriesOptions';
import { CategoryType } from '@/models/money-track/Categories';

import { AddNewItemForm } from './AddNewItemForm';

export async function AddNewItem() {
  const [bankAccountsOptions, categoryOptions] = await Promise.all([
    getBankAccountsOptions(),
    getCategoriesOptions(CategoryType.Expense),
  ]);

  return (
    <AddNewItemForm
      bankAccountsOptions={bankAccountsOptions}
      categoryOptions={categoryOptions}
    />
  );
}

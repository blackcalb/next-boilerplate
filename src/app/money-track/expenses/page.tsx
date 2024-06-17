import getBankAccountsOptions from '@/actions/money-track/accounts/getBankAccountsOptions';
import getCategoriesOptions from '@/actions/money-track/categories/getCategoriesOptions';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';
import { CategoryType } from '@/models/money-track/Categories';
import { MovementList } from '@/ui/money-track/Movements/MovementList';

export default async function ExpensesPage() {
  const categoriesOptions = await getCategoriesOptions(CategoryType.Expense);
  const bankAccountOptions = await getBankAccountsOptions();

  return (
    <ContentWrapper>
      <Typography>Expenses</Typography>

      <MovementList
        type={CategoryType.Expense}
        categoriesOptions={categoriesOptions}
        bankAccountOptions={bankAccountOptions}
      />
    </ContentWrapper>
  );
}

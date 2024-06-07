import getAccounts from '@/actions/money-track/accounts/getAccounts';
import CreateNewRecord from '@/components/forms/CreateNewRecord';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';
import { CategoryType } from '@/models/money-track/Categories';
import getCategoriesByType from '@/queries/categories/getCategoriesByType';
import type { Option } from '@/types/moneyTrack';

export default async function AddExpensePage() {
  const [categories, banks] = await Promise.all([
    getCategoriesByType('income'),
    getAccounts(),
  ]);

  const bankAccountOptions: Option[] = banks.map((bankAccount) => ({
    value: bankAccount._id.toString(),
    label: bankAccount.name,
  }));

  const categoriesOptions = categories.map((category) => ({
    value: category._id.toString(),
    label: category.name,
  }));

  return (
    <ContentWrapper>
      <Typography className="mb-10 text-center" variant="h1">
        Create a new Outcome
      </Typography>

      <div className="mx-auto w-full md:w-1/2">
        <CreateNewRecord
          type={CategoryType.Expense}
          categoriesOptions={categoriesOptions}
          bankAccountOptions={bankAccountOptions}
        />
      </div>
    </ContentWrapper>
  );
}

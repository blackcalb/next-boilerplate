import getAccounts from '@/actions/money-track/accounts/getAccounts';
import CreateNewRecord from '@/components/forms/CreateNewRecord';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';
import { CategoryType } from '@/models/money-track/Categories';
import getCategoriesByType from '@/queries/categories/getCategoriesByType';

export default async function AddIncomePage() {
  const [categories, banks] = await Promise.all([
    getCategoriesByType('income'),
    getAccounts(),
  ]);

  const bankAccountOptions = banks.map((bankAccount) => ({
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
        Create a new Income
      </Typography>

      <div className="mx-auto w-full md:w-1/2">
        <CreateNewRecord
          type={CategoryType.Income}
          categoriesOptions={categoriesOptions}
          bankAccountOptions={bankAccountOptions}
        />
      </div>
    </ContentWrapper>
  );
}

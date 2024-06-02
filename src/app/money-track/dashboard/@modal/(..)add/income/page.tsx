import getAccounts from '@/actions/money-track/accounts/getAccounts';
import CreateNewRecord from '@/components/forms/CreateNewRecord';
import Modal from '@/components/modal';
import Typography from '@/components/Typography';
import { CategoryType } from '@/models/money-track/Categories';
import getCategoriesByType from '@/queries/categories/getCategoriesByType';

export default async function AddIncomePage() {
  const categories = await getCategoriesByType('income');
  const banks = await getAccounts();

  return (
    <Modal
      title={<Typography variant="h2">Add new Income</Typography>}
      className="mx-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <CreateNewRecord
        categories={categories}
        type={CategoryType.Income}
        bankAccounts={banks}
      />
    </Modal>
  );
}

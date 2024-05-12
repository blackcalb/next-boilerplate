import CreateNewRecord from '@/components/forms/CreateNewRecord';
import Modal from '@/components/modal';
import Text from '@/components/Text';
import getBanks from '@/queries/accounts/getBanks';
import getCategoriesByType from '@/queries/categories/getCategoriesByType';
import { RecordType } from '@/types/moneyTrack';

export default async function AddIncomePage() {
  const categories = await getCategoriesByType('income');
  const banks = await getBanks();

  return (
    <Modal title={<Text variant="h2">Add new Income</Text>}>
      <CreateNewRecord
        categories={categories}
        type={RecordType.income}
        bankAccounts={banks}
      />
    </Modal>
  );
}

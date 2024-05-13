import CreateNewBudget from '@/components/forms/CreateNewBudget';
import Modal from '@/components/modal';
import Text from '@/components/Text';
import getCategoriesByType from '@/queries/categories/getCategoriesByType';

export default async function AddAccountPage() {
  const categories = await getCategoriesByType('expense');

  return (
    <Modal title={<Text variant="h2">Add new Budget</Text>}>
      <CreateNewBudget categories={categories} />
    </Modal>
  );
}

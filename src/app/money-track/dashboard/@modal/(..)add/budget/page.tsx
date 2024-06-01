import CreateNewBudget from '@/components/forms/CreateNewBudget';
import Modal from '@/components/modal';
import Typography from '@/components/Typography';
import getCategoriesByType from '@/queries/categories/getCategoriesByType';

export default async function AddAccountPage() {
  const categories = await getCategoriesByType('expense');

  return (
    <Modal title={<Typography variant="h2">Add new Budget</Typography>}>
      <CreateNewBudget categories={categories} />
    </Modal>
  );
}

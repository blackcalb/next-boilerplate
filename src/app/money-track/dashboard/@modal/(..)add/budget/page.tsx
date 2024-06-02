import CreateNewBudget from '@/components/forms/CreateNewBudget';
import Modal from '@/components/modal';
import Typography from '@/components/Typography';
import getCategoriesByType from '@/queries/categories/getCategoriesByType';

export default async function AddAccountPage() {
  const categories = await getCategoriesByType('expense');

  return (
    <Modal
      title={<Typography variant="h2">Add new Budget</Typography>}
      className="mx-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <CreateNewBudget categories={categories} />
    </Modal>
  );
}

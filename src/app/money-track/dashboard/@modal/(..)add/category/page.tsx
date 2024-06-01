import CreateNewCategory from '@/components/forms/CreateNewCategory';
import Modal from '@/components/modal';
import Typography from '@/components/Typography';

export default function AddCategoryPage() {
  return (
    <Modal
      className="m-4 w-full max-w-[30rem] sm:w-3/4 lg:w-1/2 xl:w-1/3"
      title={<Typography className="text-xl">New Category</Typography>}
    >
      <CreateNewCategory />
    </Modal>
  );
}

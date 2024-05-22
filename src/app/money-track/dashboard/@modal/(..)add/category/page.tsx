import CreateNewCategory from '@/components/forms/CreateNewCategory';
import Modal from '@/components/modal';
import Text from '@/components/Text';

export default function AddCategoryPage() {
  return (
    <Modal title={<Text variant="h2">Add new Category</Text>}>
      <CreateNewCategory />
    </Modal>
  );
}

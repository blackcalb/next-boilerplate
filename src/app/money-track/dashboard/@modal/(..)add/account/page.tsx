import CreateNewAccount from '@/components/forms/CreateNewAccount';
import Modal from '@/components/modal';
import Text from '@/components/Text';

export default function AddAccountPage() {
  return (
    <Modal title={<Text variant="h2">Add new Account</Text>}>
      <CreateNewAccount />
    </Modal>
  );
}

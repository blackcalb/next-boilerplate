import CreateNewAccount from '@/components/forms/CreateNewAccount';
import Modal from '@/components/modal';
import Text from '@/components/Text';

export default function AddAccountPage() {
  return (
    <Modal
      title={<Text className="text-xl uppercase">New Account</Text>}
      className="m-4 w-full max-w-[30rem] sm:w-3/4 lg:w-1/2 xl:w-1/3"
    >
      <CreateNewAccount />
    </Modal>
  );
}

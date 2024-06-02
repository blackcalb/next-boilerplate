import CreateNewAccount from '@/components/forms/CreateNewAccount';
import Modal from '@/components/modal';
import Typography from '@/components/Typography';

export default function AddAccountPage() {
  return (
    <Modal
      title={<Typography className="text-xl uppercase">New Account</Typography>}
      className="mx-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <CreateNewAccount />
    </Modal>
  );
}

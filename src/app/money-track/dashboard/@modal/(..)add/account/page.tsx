import CreateNewAccount from '@/components/forms/CreateNewAccount';
import Modal from '@/components/modal';
import Typography from '@/components/Typography';

export default function AddAccountPage() {
  return (
    <Modal
      title={<Typography className="text-xl uppercase">New Account</Typography>}
      className="m-4 w-full max-w-screen-md "
    >
      <CreateNewAccount />
    </Modal>
  );
}

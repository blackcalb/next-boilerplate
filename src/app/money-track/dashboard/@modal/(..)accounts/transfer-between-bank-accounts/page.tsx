import getAccounts from '@/actions/money-track/accounts/getAccounts';
import TransferBetweenAccounts from '@/components/forms/TransferBetweenAccounts';
import Modal from '@/components/modal';
import Typography from '@/components/Typography';

export default async function AddAccountPage() {
  const accounts = await getAccounts();

  return (
    <Modal
      title={
        <Typography className="text-xl uppercase">
          Transfer between accounts
        </Typography>
      }
      className="m-4 w-full max-w-[30rem] sm:w-3/4 lg:w-1/2 xl:w-1/3"
    >
      <TransferBetweenAccounts accounts={accounts} />
    </Modal>
  );
}

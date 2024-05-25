import TransferBetweenAccounts from '@/components/forms/TransferBetweenAccounts';
import Modal from '@/components/modal';
import Text from '@/components/Text';
import getAccounts from '@/queries/accounts/getBanks';

export default async function AddAccountPage() {
  const accounts = await getAccounts();

  return (
    <Modal
      title={
        <Text className="text-xl uppercase">Transfer between accounts</Text>
      }
      className="m-4 w-full max-w-[30rem] sm:w-3/4 lg:w-1/2 xl:w-1/3"
    >
      <TransferBetweenAccounts accounts={accounts} />
    </Modal>
  );
}

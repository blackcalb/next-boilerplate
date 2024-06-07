import getAccounts from './getAccounts';

export default async function getBankAccountsOptions() {
  const accounts = await getAccounts();
  return accounts.map((account) => ({
    value: account._id.toString(),
    label: account.name,
  }));
}

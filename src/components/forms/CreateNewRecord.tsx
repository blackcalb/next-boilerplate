import { createNewRecord } from '@/actions/money-track/add/record';
import FormButton from '@/components/buttons/FormButton';
import type { RecordType } from '@/types/moneyTrack';

export default async function CreateNewRecord({
  bankAccounts,
  categories,
  type,
}: {
  bankAccounts: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  type: RecordType;
}) {
  return (
    <form className="flex flex-col" action={createNewRecord}>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="redirect" value="/money-track" />
      <label htmlFor="subject">
        Subject
        <input type="text" id="subject" name="subject" />
      </label>
      <label htmlFor="amount">
        amount
        <input type="text" id="amount" name="amount" />
      </label>
      <label htmlFor="category">
        Category
        <select name="category" id="category">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="account">
        <select name="account" id="account">
          {bankAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="date">
        Date
        <input type="date" id="date" name="date" />
      </label>
      <FormButton>Crear</FormButton>
    </form>
  );
}

import { deleteBillTrackItem } from '@/actions/money-track/bilTrackItems/deleteBillTrackItem';

export function DeleteButton({ id }: Readonly<{ id: string }>) {
  return (
    <button
      type="button"
      onClick={async () => {
        await deleteBillTrackItem(id);
      }}
    >
      delete
    </button>
  );
}

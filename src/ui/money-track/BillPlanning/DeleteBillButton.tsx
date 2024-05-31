import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteBillTrackItem } from '@/actions/money-track/bilTrackItems/deleteBillTrackItem';
import FormButton from '@/components/buttons/FormButton';

export function DeleteBillButton({ id }: Readonly<{ id: string }>) {
  return (
    <form action={deleteBillTrackItem}>
      <input type="hidden" name="id" value={id} />
      <FormButton aria-label={`Delete Bill - ${id}`} color="dark">
        <FontAwesomeIcon icon={faTrash} size="xl" />
      </FormButton>
    </form>
  );
}

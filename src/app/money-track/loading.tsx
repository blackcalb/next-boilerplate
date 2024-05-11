import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center py-6">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
    </div>
  );
}

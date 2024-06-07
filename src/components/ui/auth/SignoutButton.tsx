import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SignOut from '@/actions/auth/sign-out';
import FormButtonIcon from '@/components/buttons/FormButtonIcon';

interface SignoutButtonProps {
  className?: string;
}

export default function SignoutButton({
  className,
}: Readonly<SignoutButtonProps>) {
  return (
    <form action={SignOut} className={className}>
      {/* <FormButton>Sign out</FormButton>
       */}
      <FormButtonIcon
        icon={<FontAwesomeIcon icon={faSignOutAlt} size="2x" />}
      />
    </form>
  );
}

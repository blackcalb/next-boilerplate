import SignOut from '@/actions/auth/sign-out';
import FormButton from '@/components/buttons/FormButton';

export default function SignoutButton() {
  return (
    <form action={SignOut}>
      <FormButton>Sign out</FormButton>
    </form>
  );
}

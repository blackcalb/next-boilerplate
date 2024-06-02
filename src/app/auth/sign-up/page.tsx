import Link from 'next/link';

import Card from '@/components/surface/card';
import Typography from '@/components/Typography';
import { SignUpCredentialForm } from '@/components/ui/auth/SignUp/SignUpCredentialForm';

export default function SignInPage() {
  return (
    <div className="flex size-full items-center justify-center p-4">
      <Card
        header="Sign Up"
        className="w-full max-w-[30rem] sm:w-3/4 lg:w-1/2 xl:w-1/3"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 ">
            <SignUpCredentialForm />
            <Typography>
              Already have an Account?{' '}
              <Link href="/auth/sign-in">Sign in here</Link>
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
}

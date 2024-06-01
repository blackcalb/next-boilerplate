import Link from 'next/link';

import Divider from '@/components/divider';
import Card from '@/components/surface/card';
import Typography from '@/components/Typography';
import { SignInCredentialForm } from '@/components/ui/auth/SignIn/SignInCredentialForm';
import { SignInGithubForm } from '@/components/ui/auth/SignIn/SignInGithubForm';

export default function SignInPage() {
  return (
    <div className="flex size-full items-center justify-center">
      <Card
        title="Sign In"
        className="w-full max-w-[30rem] sm:w-3/4 lg:w-1/2 xl:w-1/3"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 ">
            <SignInCredentialForm />
            <Typography>
              create an account <Link href="/auth/sign-up">here</Link>
            </Typography>
          </div>
          <Divider className="self-stretch" />
          <div>
            <Typography className="mb-4">
              Join with your fav social media accounts:
            </Typography>
            <div className="flex w-full justify-center">
              <SignInGithubForm />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

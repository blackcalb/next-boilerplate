import Link from 'next/link';

import Divider from '@/components/divider';
import Card from '@/components/surface/card';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';
import { SignInCredentialForm } from '@/components/ui/auth/SignIn/SignInCredentialForm';
import { SignInGithubForm } from '@/components/ui/auth/SignIn/SignInGithubForm';

export default function SignInPage() {
  return (
    <ContentWrapper>
      <Card header="Sign In" doNotMinimize>
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
    </ContentWrapper>
  );
}

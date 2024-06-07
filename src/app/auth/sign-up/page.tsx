import Link from 'next/link';

import Card from '@/components/surface/card';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';
import { SignUpCredentialForm } from '@/components/ui/auth/SignUp/SignUpCredentialForm';

export default function SignInPage() {
  return (
    <ContentWrapper>
      <Card header="Sign Up" doNotMinimize>
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
    </ContentWrapper>
  );
}

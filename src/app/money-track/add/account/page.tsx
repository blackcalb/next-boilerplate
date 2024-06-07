import CreateNewBankAccount from '@/components/forms/CreateNewBankAccount';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';

export default async function AddNewBankAccountPage() {
  return (
    <ContentWrapper>
      <Typography className="mb-10 text-center" variant="h1">
        Create a Account
      </Typography>

      <div className="mx-auto w-full md:w-1/2">
        <CreateNewBankAccount />
      </div>
    </ContentWrapper>
  );
}

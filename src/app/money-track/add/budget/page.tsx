import CreateNewBudget from '@/components/forms/CreateNewBudget';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';
import getCategoriesByType from '@/queries/categories/getCategoriesByType';

export default async function AddNewBudgetPage() {
  const categories = await getCategoriesByType('income');

  const categoriesOptions = categories.map((category) => ({
    value: category._id.toString(),
    label: category.name,
  }));

  return (
    <ContentWrapper>
      <Typography className="mb-10 text-center" variant="h1">
        Create a budget
      </Typography>

      <div className="mx-auto w-full md:w-1/2">
        <CreateNewBudget categoriesOptions={categoriesOptions} />
      </div>
    </ContentWrapper>
  );
}

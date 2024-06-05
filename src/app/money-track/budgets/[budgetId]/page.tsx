import { notFound } from 'next/navigation';

import getBudget from '@/actions/money-track/budgets/getBudget';
import getCategories from '@/actions/money-track/categories/getCategories';
import ContentWrapper from '@/components/surface/content-wrapper';
import Typography from '@/components/Typography';
import { CategoryType } from '@/models/money-track/Categories';
import BudgetUpdateCategories from '@/ui/money-track/Budget/BudgetUpdateCategories';

export default async function BudgetDetailPage({
  params,
}: Readonly<{
  params: { budgetId: string };
}>) {
  const budget = await getBudget(params.budgetId);
  const categories = await getCategories(CategoryType.Expense);

  if (!budget) {
    return notFound();
  }

  const percentageUsed = budget.amount_spent / budget.budget;

  const defaultCategories = budget.categoryIds.map((id) => {
    const category = categories.find(
      (cat) => cat._id.toString() === id.toString(),
    );

    return category?._id.toString() ?? '';
  });

  const optionsCatgories = categories.map((category) => ({
    value: category._id.toString(),
    label: category.name,
  }));

  return (
    <ContentWrapper>
      <Typography className="mx-auto text-2xl">{budget.name}</Typography>
      <Typography className="mx-auto text-lg">
        {Intl.NumberFormat('en-EU', {
          style: 'percent',
          maximumFractionDigits: 2,
        }).format(percentageUsed)}
      </Typography>

      <Typography> Add/Remove Categories</Typography>

      <BudgetUpdateCategories
        budgetId={params.budgetId}
        initialValues={defaultCategories}
        options={optionsCatgories}
      />
    </ContentWrapper>
  );
}

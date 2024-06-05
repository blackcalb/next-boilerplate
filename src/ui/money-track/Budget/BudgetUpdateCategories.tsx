'use client';

import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormState } from 'react-dom';

import { updateBudgetCategories } from '@/actions/money-track/budgets/updateBudgetCategories';
import FormButtonIcon from '@/components/buttons/FormButtonIcon';
import Checkbox from '@/components/inputs/checkbox';
import Select from '@/components/inputs/select';

export default function BudgetUpdateCategories({
  budgetId,
  initialValues,
  options,
}: Readonly<{
  budgetId: string;
  initialValues: string[];
  options: { value: string; label: string }[];
}>) {
  const [state, formAction] = useFormState(updateBudgetCategories, null);

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="path"
        value={`/money-track/budgets/${budgetId}}`}
      />
      <input type="hidden" name="budgetId" value={budgetId} />
      <Select
        name="category"
        label="Category"
        required
        options={options}
        defaultValue={initialValues}
        multiple
        errors={state?.errors?.categories?._errors}
      />
      <Checkbox
        name="addPreviousCreatedRecordsFromAddedCategories"
        label="Add Previous Created Records?"
      />
      <Checkbox
        name="removeRecordsOfEliminatedCategories"
        label="Delete Records of Eliminated Categories?"
      />
      <FormButtonIcon icon={<FontAwesomeIcon icon={faSave} />} />
    </form>
  );
}

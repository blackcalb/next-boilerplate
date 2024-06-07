import { type CategoryType } from '@/models/money-track/Categories';

import getCategories from './getCategories';

export default async function getCategoriesOptions(type: CategoryType) {
  const categories = await getCategories(type);

  return categories.map((category) => ({
    value: category._id.toString(),
    label: category.name,
  }));
}

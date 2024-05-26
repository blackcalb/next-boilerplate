import mongoose, {
  type Document,
  type FlattenMaps,
  type ObjectId,
  Schema,
} from 'mongoose';

export enum CategoryType {
  Expense = 'expense',
  Income = 'income',
  Transfer = 'transfer',
  Deposit = 'deposit',
}

interface ICategory extends Document {
  name: string;
  type: CategoryType;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type ICategoryFlatDocument = FlattenMaps<ICategory> &
  Required<{
    _id: FlattenMaps<unknown>;
  }>;

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: CategoryType,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Category =
  (mongoose.models.Category as mongoose.Model<ICategory>) ??
  mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

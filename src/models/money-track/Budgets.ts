import { type FlattenMaps, type ObjectId, Schema } from 'mongoose';
import mongoose from 'mongoose';

interface IBudget extends Document {
  name: string;
  budget: number;
  amount_spent: number;
  userId: ObjectId;
  categoryIds: ObjectId[];
  from: Date;
  to: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IBudgetFlatDocument = FlattenMaps<IBudget> &
  Required<{
    _id: FlattenMaps<unknown>;
  }>;

const BudgetSchema = new Schema<IBudget>({
  name: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  amount_spent: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  categoryIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
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

const Budget =
  (mongoose.models.Budget as mongoose.Model<IBudget>) ??
  mongoose.model<IBudget>('Budget', BudgetSchema);

export default Budget;

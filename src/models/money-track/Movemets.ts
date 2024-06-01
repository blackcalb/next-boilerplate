import mongoose, {
  type Document,
  type FlattenMaps,
  type ObjectId,
  Schema,
} from 'mongoose';

import { CategoryType } from './Categories';

interface IMovement extends Document {
  bankAccountId: ObjectId;
  date: Date;
  name: string;
  type: CategoryType;
  categoryId?: ObjectId;
  userId: ObjectId;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IMovementFlatDocument = FlattenMaps<IMovement> &
  Required<{
    _id: FlattenMaps<unknown>;
  }>;

const MovementSchema = new Schema<IMovement>({
  bankAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: CategoryType,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
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

const Movement =
  (mongoose.models.Movement as mongoose.Model<IMovement>) ??
  mongoose.model<IMovement>('Movement', MovementSchema);

export default Movement;

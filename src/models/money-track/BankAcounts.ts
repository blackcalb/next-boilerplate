import mongoose, {
  type Document,
  type FlattenMaps,
  type ObjectId,
  Schema,
} from 'mongoose';

export interface IBankAccount extends Document {
  name: string;
  description?: string;
  balance: number;
  currency: string;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBankAccountClient
  extends Omit<IBankAccount, 'userId' | 'createdAt' | 'updatedAt'> {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type IBankAccountFlatDocument = FlattenMaps<IBankAccount> &
  Required<{
    _id: FlattenMaps<unknown>;
  }>;

const BankAccountSchema = new Schema<IBankAccount>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  balance: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
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

const BankAccount =
  (mongoose.models.BankAccount as mongoose.Model<IBankAccount>) ??
  mongoose.model<IBankAccount>('BankAccount', BankAccountSchema);

export default BankAccount;

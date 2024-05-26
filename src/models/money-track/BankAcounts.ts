import mongoose, {
  type Document,
  type FlattenMaps,
  type ObjectId,
  Schema,
} from 'mongoose';

interface IBankAccount extends Document {
  name: string;
  balance: number;
  currency: string;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
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

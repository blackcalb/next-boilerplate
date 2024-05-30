import { type FlattenMaps, type ObjectId, Schema } from 'mongoose';
import mongoose from 'mongoose';

interface IAccount extends Document {
  userId: ObjectId;
  type: string;
  password?: string;
  provider?: string;
  providerAccountId?: string;
  token_type?: string;
  scope?: string;
  access_token?: string;
}

export interface IClientAccount extends Omit<IAccount, 'userId'> {
  userId: string;
  _id: string;
}

export type IAccounttFlatDocument = FlattenMaps<IAccount> &
  Required<{
    _id: FlattenMaps<unknown>;
  }>;

const AccountSchema = new Schema<IAccount>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  provider: {
    type: String,
  },
  providerAccountId: {
    type: String,
  },
  token_type: {
    type: String,
  },
  scope: {
    type: String,
  },
  access_token: {
    type: String,
  },
});

const Account =
  (mongoose.models.Account as mongoose.Model<IAccount>) ??
  mongoose.model<IAccount>('Account', AccountSchema);

export default Account;

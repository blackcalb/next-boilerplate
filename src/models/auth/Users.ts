import mongoose, { type FlattenMaps, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified: boolean;
  options?: {
    'money-track'?: {
      dashboard?: {
        income?: boolean;
        expense?: boolean;
        budgets?: boolean;
        bankAccounts?: boolean;
        bills?: boolean;
        billsNextMonth?: boolean;
      };
    };
  };
}

export type IUserFlatDocument = FlattenMaps<IUser> &
  Required<{
    _id: FlattenMaps<unknown>;
  }>;

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  options: {
    type: {
      'money-track': {
        type: {
          dashboard: {
            type: {
              income: {
                type: Boolean,
                default: false,
              },
              expense: {
                type: Boolean,
                default: false,
              },
              budgets: {
                type: Boolean,
                default: false,
              },
              bankAccounts: {
                type: Boolean,
                default: false,
              },
              bills: {
                type: Boolean,
                default: false,
              },
              billsNextMonth: {
                type: Boolean,
                default: false,
              },
            },
          },
        },
      },
    },
  },
});

const User =
  (mongoose.models.User as mongoose.Model<IUser>) ??
  mongoose.model<IUser>('User', UserSchema);

export default User;

import {
  type Document,
  type FlattenMaps,
  type ObjectId,
  Schema,
} from 'mongoose';
import mongoose from 'mongoose';

export enum BillTrackStatus {
  Pending = 'pending',
  Paid = 'paid',
  Deleted = 'deleted',
}

export interface IBillTrack extends Document {
  name: string;
  expectedAmount: number;
  status: BillTrackStatus;
  finalAmount?: number;
  currency: string;
  date: Date;
  userId: ObjectId;
  bankAccountId: ObjectId;
  categoryId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBillTrackClient
  extends Omit<
    IBillTrack,
    | 'userId'
    | 'bankAccountId'
    | 'categoryId'
    | 'date'
    | 'createdAt'
    | 'updatedAt'
  > {
  _id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
}

export type IBillTrackFlatDocument = FlattenMaps<IBillTrack> &
  Required<{
    _id: FlattenMaps<unknown>;
  }>;

const BillTrackSchema = new Schema<IBillTrack>({
  name: {
    type: String,
    required: true,
  },
  expectedAmount: {
    type: Number,
    required: true,
  },
  finalAmount: {
    type: Number,
  },
  currency: {
    type: String,
    default: 'EUR',
  },
  status: {
    type: String,
    enum: Object.values(BillTrackStatus),
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bankAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  categoryId: {
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

const BillTrack =
  (mongoose.models?.BillTrack as mongoose.Model<IBillTrack>) ??
  mongoose.model<IBillTrack>('BillTrack', BillTrackSchema);

export default BillTrack;

/* eslint-disable @typescript-eslint/naming-convention */
import type mongoose from 'mongoose';
import { type Document } from 'mongoose';

export default function mapDocumentToClient<T extends Document>(document: T) {
  const _id = (document._id as mongoose.Schema.Types.ObjectId).toString();
  const properties = JSON.parse(JSON.stringify(document));

  return { ...properties, _id };
}

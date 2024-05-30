/* eslint-disable @typescript-eslint/naming-convention */
import type { ObjectId } from 'mongoose';

export default function mapDocumentToSelectOption<
  T extends { _id: ObjectId | string; name: string },
>(document: T) {
  return { label: document.name, value: document._id.toString() };
}

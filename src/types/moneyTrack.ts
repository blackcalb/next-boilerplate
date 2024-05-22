export enum RecordType {
  income = 'income',
  expense = 'expense',
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

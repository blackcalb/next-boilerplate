import Card from '@/components/surface/card';

export default function BudgetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Card title="Accounts">{children}</Card>;
}
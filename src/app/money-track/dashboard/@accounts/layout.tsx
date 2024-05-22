import Card from '@/components/surface/card';

export default function BudgetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Card
      title="Accounts"
      className="flex flex-col text-amber-600 dark:text-amber-400"
    >
      {children}
    </Card>
  );
}

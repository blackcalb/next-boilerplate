import Card from '@/components/surface/card';

export default function BudgetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Card title="Budgets" className="text-blue-600 dark:text-blue-400">
      {children}
    </Card>
  );
}

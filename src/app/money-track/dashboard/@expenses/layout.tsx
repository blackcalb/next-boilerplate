import Card from '@/components/surface/card';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Card title="Latest Expenses" className="text-red-600 dark:text-red-400">
      {children}
    </Card>
  );
}

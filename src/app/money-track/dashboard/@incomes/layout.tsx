import Card from '@/components/surface/card';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Card
      title="Latest Incoming"
      className="text-green-600 dark:text-green-400"
    >
      {children}
    </Card>
  );
}

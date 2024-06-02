import Card from '@/components/surface/card';
import Typography from '@/components/Typography';

export default function BudgetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Card
      header={
        <div className="flex w-full justify-between">
          <Typography className="text-xl font-bold">
            Bills next month
          </Typography>
        </div>
      }
      className="flex flex-col text-amber-600 dark:text-amber-400"
    >
      {children}
    </Card>
  );
}

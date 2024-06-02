import Typography from '@/components/Typography';
import { CategoryType } from '@/models/money-track/Categories';
import { getLastNMovements } from '@/queries/records/getLastNRecords';
import MovementItem from '@/ui/money-track/Movements/MovementItem';

export default async function IncomesPage() {
  const movemets = await getLastNMovements(CategoryType.Income, 5);

  return (
    <div className="flex flex-col items-center gap-2">
      {movemets.length === 0 && (
        <div className="col-span-4 self-stretch text-center">
          <Typography variant="h5">No Incomes yet</Typography>
        </div>
      )}
      {movemets.map((movement) => (
        <MovementItem movement={movement} key={movement._id.toString()} />
      ))}
    </div>
  );
}

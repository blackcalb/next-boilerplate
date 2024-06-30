import getUserPreferences from '@/actions/auth/getUserPreferences';
import Card from '@/components/surface/card';
import Typography from '@/components/Typography';
import ResumenMonthPage from '@/ui/money-track/BillPlanning/ResumenMonthPage';

export default async function billTrackPlanningNextMonth() {
  const getPreferences = await getUserPreferences('money-track.dashboard');

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
      initialOpen={!!getPreferences?.billsNextMonth}
      savePreference="money-track.dashboard.billsNextMonth"
    >
      <ResumenMonthPage month={1} />
    </Card>
  );
}

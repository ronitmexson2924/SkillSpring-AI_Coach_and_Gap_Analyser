import ActivityCalendar from 'react-activity-calendar';
import Card from '../ui/Card';

export default function StreakTracker({ data }) {
  return (
    <Card className="p-6">
      <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Study Streak</p>
      <h3 className="mt-3 font-display text-3xl text-white">Daily consistency heatmap</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Track momentum like a GitHub contribution graph, with brighter blocks representing more
        focused work on that day.
      </p>

      <div className="mt-8 overflow-x-auto">
        <ActivityCalendar
          data={data}
          colorScheme="dark"
          theme={{
            dark: ['#16161F', '#1b3b37', '#146c68', '#2DD4BF', '#7C3AED'],
            light: ['#16161F', '#1b3b37', '#146c68', '#2DD4BF', '#7C3AED'],
          }}
          showWeekdayLabels
          hideColorLegend={false}
          blockSize={13}
          blockMargin={5}
          fontSize={12}
        />
      </div>
    </Card>
  );
}


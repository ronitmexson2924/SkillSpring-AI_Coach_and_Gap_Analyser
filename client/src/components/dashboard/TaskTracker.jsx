import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function TaskTracker({ tasks, onToggleTask }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Task Tracker</p>
          <h3 className="mt-3 font-display text-3xl text-white">Closest milestones</h3>
        </div>
        <Badge tone="slate">{tasks.length} tasks in focus</Badge>
      </div>

      <div className="mt-6 space-y-4">
        {tasks.map((task) => (
          <label
            key={task.id}
            className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/5 p-4"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(event) => onToggleTask(task.id, event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-[#2DD4BF]"
            />
            <div>
              <p className="text-sm font-medium text-white">{task.title}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-brand-muted">
                Week {task.weekNumber} • {task.completed ? 'Completed' : 'Up next'}
              </p>
            </div>
          </label>
        ))}
      </div>
    </Card>
  );
}


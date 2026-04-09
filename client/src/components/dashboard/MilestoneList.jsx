import Card from '../ui/Card';

export default function MilestoneList({ milestones }) {
  return (
    <Card className="p-6">
      <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Milestones</p>
      <h3 className="mt-3 font-display text-3xl text-white">Completed vs pending tasks</h3>

      <div className="mt-6 space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="flex items-start justify-between gap-4 rounded-[24px] border border-white/10 bg-white/5 px-4 py-4"
          >
            <div>
              <p className="text-sm font-medium text-white">{milestone.title}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-brand-muted">
                Week {milestone.weekNumber} • {milestone.goal}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.22em] ${
                milestone.completed
                  ? 'bg-brand-teal/10 text-brand-teal'
                  : 'bg-brand-violet/10 text-violet-200'
              }`}
            >
              {milestone.completed ? 'Done' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}


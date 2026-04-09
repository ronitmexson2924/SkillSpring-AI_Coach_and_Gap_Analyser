import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

function ResourceCard({ resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="group rounded-[24px] border border-white/10 bg-white/5 p-4 transition hover:border-brand-teal/50 hover:bg-white/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">{resource.title}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-brand-muted">
            {resource.platform} • {resource.type} • {resource.durationMinutes} mins
          </p>
        </div>
        <ExternalLink className="h-4 w-4 text-brand-muted transition group-hover:text-brand-teal" />
      </div>
    </a>
  );
}

function GenerateRoadmapButton({ onGenerate, isGenerating }) {
  return (
    <Button onClick={onGenerate} className="min-w-[220px]" disabled={isGenerating}>
      <Sparkles className="h-5 w-5" />
      {isGenerating ? 'Generating roadmap...' : 'Generate roadmap'}
    </Button>
  );
}

function RoadmapTimeline({ roadmap, onToggleTask }) {
  if (!roadmap?.weeks?.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-muted">No roadmap yet</p>
        <h3 className="mt-4 font-display text-3xl text-white">Let AI turn your gaps into a plan</h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          Generate a structured week-by-week path with goals, tasks, and resources tailored to your
          current skill map and target role.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {roadmap.weeks.map((week) => (
        <Card key={week.id} className="relative overflow-hidden p-6 md:p-8">
          <div className="absolute left-6 top-6 hidden h-[calc(100%-48px)] w-px bg-gradient-to-b from-brand-teal/60 to-brand-violet/30 md:block" />
          <div className="grid gap-8 md:grid-cols-[0.18fr_0.82fr]">
            <div className="relative z-10 flex items-start md:justify-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-teal/40 bg-brand-teal/10 font-display text-lg text-brand-teal">
                {week.weekNumber}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-brand-muted">
                    Week {week.weekNumber}
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-white">{week.goal}</h3>
                </div>
                <Badge tone="indigo">{week.estimatedHours} hrs planned</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {week.tasks.map((task) => (
                  <label
                    key={task.id}
                    className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-black/20 p-4"
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
                        {task.completed
                          ? `Completed ${new Date(task.completedAt).toLocaleDateString()}`
                          : 'Pending'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {week.resources.map((resource) => (
                  <ResourceCard key={`${week.id}-${resource.title}`} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function LearningRoadmap({
  roadmap,
  onGenerate,
  isGenerating,
  narration,
  onToggleTask,
  studyHours,
  roadmapWeeks,
  onStudyHoursChange,
  onWeeksChange,
}) {
  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">AI Roadmap</p>
            <h2 className="mt-4 font-display text-4xl text-white">Generate the next six weeks</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Tune the weekly study time, choose how many weeks to plan, and stream a roadmap that
              turns your most important gaps into concrete learning milestones.
            </p>
          </div>

          <GenerateRoadmapButton onGenerate={onGenerate} isGenerating={isGenerating} />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-200" htmlFor="study-hours">
                Hours per week
              </label>
              <span className="text-sm text-brand-teal">{studyHours}h</span>
            </div>
            <input
              id="study-hours"
              type="range"
              min="2"
              max="20"
              value={studyHours}
              onChange={(event) => onStudyHoursChange(Number(event.target.value))}
              className="mt-4 w-full accent-[#2DD4BF]"
            />
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-200" htmlFor="roadmap-weeks">
                Timeline length
              </label>
              <span className="text-sm text-brand-violet">{roadmapWeeks} weeks</span>
            </div>
            <input
              id="roadmap-weeks"
              type="range"
              min="4"
              max="12"
              value={roadmapWeeks}
              onChange={(event) => onWeeksChange(Number(event.target.value))}
              className="mt-4 w-full accent-[#7C3AED]"
            />
          </div>
        </div>

        {narration ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-[28px] border border-brand-indigo/30 bg-brand-indigo/10 p-5 text-sm leading-7 text-indigo-100"
          >
            {narration}
          </motion.div>
        ) : null}
      </Card>

      <RoadmapTimeline roadmap={roadmap} onToggleTask={onToggleTask} />
    </div>
  );
}


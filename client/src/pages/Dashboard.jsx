import { startTransition, useDeferredValue, useMemo, useState } from 'react';
import {
  Bell,
  Bot,
  ChevronLeft,
  ChevronRight,
  Compass,
  LayoutDashboard,
  MoonStar,
  Settings,
  Sparkles,
  Target,
  Trophy,
  Upload,
} from 'lucide-react';
import { shallow } from 'zustand/shallow';
import { useUser } from '../context/UserContext';
import { useSkillData } from '../hooks/useSkillData';
import { useSkillStore } from '../store/skillStore';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressCard from '../components/dashboard/ProgressCard';
import SkillRadarChart from '../components/dashboard/SkillRadarChart';
import SkillTagCloud from '../components/dashboard/SkillTagCloud';
import AddSkillModal from '../components/dashboard/AddSkillModal';
import GapAnalysisPanel from '../components/dashboard/GapAnalysisPanel';
import LearningRoadmap from '../components/dashboard/LearningRoadmap';
import TaskTracker from '../components/dashboard/TaskTracker';
import AICoachChat from '../components/dashboard/AICoachChat';
import WeeklyProgressChart from '../components/dashboard/WeeklyProgressChart';
import StreakTracker from '../components/dashboard/StreakTracker';
import BadgeShowcase from '../components/dashboard/BadgeShowcase';
import MilestoneList from '../components/dashboard/MilestoneList';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'gap', label: 'Gap Analysis', icon: Target },
  { id: 'roadmap', label: 'Roadmap', icon: Compass },
  { id: 'coach', label: 'AI Coach', icon: Bot },
  { id: 'progress', label: 'Progress', icon: Trophy },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const themeStyles = {
  nebula:
    'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.16),transparent_24%),radial-gradient(circle_at_80%_14%,rgba(45,212,191,0.12),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(79,70,229,0.2),transparent_32%)]',
  tide:
    'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_25%_5%,rgba(45,212,191,0.16),transparent_24%),radial-gradient(circle_at_78%_12%,rgba(59,130,246,0.15),transparent_24%),radial-gradient(circle_at_55%_100%,rgba(14,165,233,0.18),transparent_32%)]',
};

function Sidebar({ activePanel, isOpen, onSelect, onToggle }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 hidden border-r border-white/10 bg-brand-surface/90 backdrop-blur-xl md:flex md:flex-col ${
        isOpen ? 'w-72' : 'w-24'
      }`}
    >
      <div className="flex items-center justify-between px-5 py-5">
        <div className={`transition ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-display text-2xl text-white">SkillSpring</p>
          <p className="text-xs uppercase tracking-[0.26em] text-brand-muted">Growth cockpit</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-full border border-white/10 p-2 text-brand-muted transition hover:border-white/20 hover:text-white"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                activePanel === item.id
                  ? 'bg-brand-teal/10 text-brand-teal'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className={`${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 pb-5">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-muted">Local Dev</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Auth is bypassed. Everything you do here is scoped to the mock user context.
          </p>
        </div>
      </div>
    </aside>
  );
}

function NotificationTray({ notifications, onDismiss }) {
  if (!notifications.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="pointer-events-auto w-full max-w-sm rounded-[24px] border border-white/10 bg-brand-surface/95 p-4 shadow-xl backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">{notification.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{notification.body}</p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(notification.id)}
              className="text-xs uppercase tracking-[0.24em] text-brand-muted transition hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel({ studyHours, roadmapWeeks, onStudyHoursChange, onWeeksChange, targetRole }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="p-6">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Planner Settings</p>
        <h3 className="mt-3 font-display text-3xl text-white">Roadmap preferences</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Current target role: {targetRole}. These controls shape how aggressively the roadmap
          should plan your weeks in local development.
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-200">Hours per week</span>
              <span className="text-sm text-brand-teal">{studyHours} hours</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              value={studyHours}
              onChange={(event) => onStudyHoursChange(Number(event.target.value))}
              className="mt-4 w-full accent-[#2DD4BF]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-200">Weeks per roadmap</span>
              <span className="text-sm text-brand-violet">{roadmapWeeks} weeks</span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              value={roadmapWeeks}
              onChange={(event) => onWeeksChange(Number(event.target.value))}
              className="mt-4 w-full accent-[#7C3AED]"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Workflow Notes</p>
        <div className="mt-4 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
            Resume parsing and GitHub import are wired for the backend, but the client also falls
            back to local mock data so the UI remains usable even before the server is running.
          </div>
          <div className="rounded-[24px] border border-brand-indigo/20 bg-brand-indigo/10 p-4 text-sm leading-7 text-indigo-100">
            Roadmap and AI coach streaming are designed around server-sent events. In local dev, the
            store gracefully degrades to simulated streaming if the API is unavailable.
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Dashboard() {
  useSkillData();

  const { user } = useUser();
  const [themeMode, setThemeMode] = useState('nebula');

  const {
    activePanel,
    isSidebarOpen,
    isBooting,
    isAddSkillOpen,
    isGeneratingRoadmap,
    isChatting,
    isImporting,
    targetRole,
    roleOptions,
    skills,
    gapMatrix,
    readinessScore,
    radarData,
    roadmap,
    urgentTasks,
    weeklyTrend,
    activityData,
    badges,
    milestones,
    summary,
    notifications,
    chatMessages,
    suggestedQuestions,
    roadmapNarration,
    studyHours,
    roadmapWeeks,
    setActivePanel,
    toggleSidebar,
    openAddSkill,
    closeAddSkill,
    addSkill,
    updateSkill,
    deleteSkill,
    adjustCategoryScore,
    importResume,
    importGithubProfile,
    setTargetRole,
    generateRoadmap,
    toggleRoadmapTask,
    setStudyHours,
    setRoadmapWeeks,
    sendCoachMessage,
    dismissNotification,
  } = useSkillStore(
    (state) => ({
      activePanel: state.activePanel,
      isSidebarOpen: state.isSidebarOpen,
      isBooting: state.isBooting,
      isAddSkillOpen: state.isAddSkillOpen,
      isGeneratingRoadmap: state.isGeneratingRoadmap,
      isChatting: state.isChatting,
      isImporting: state.isImporting,
      targetRole: state.targetRole,
      roleOptions: state.roleOptions,
      skills: state.skills,
      gapMatrix: state.gapMatrix,
      readinessScore: state.readinessScore,
      radarData: state.radarData,
      roadmap: state.roadmap,
      urgentTasks: state.urgentTasks,
      weeklyTrend: state.weeklyTrend,
      activityData: state.activityData,
      badges: state.badges,
      milestones: state.milestones,
      summary: state.summary,
      notifications: state.notifications,
      chatMessages: state.chatMessages,
      suggestedQuestions: state.suggestedQuestions,
      roadmapNarration: state.roadmapNarration,
      studyHours: state.studyHours,
      roadmapWeeks: state.roadmapWeeks,
      setActivePanel: state.setActivePanel,
      toggleSidebar: state.toggleSidebar,
      openAddSkill: state.openAddSkill,
      closeAddSkill: state.closeAddSkill,
      addSkill: state.addSkill,
      updateSkill: state.updateSkill,
      deleteSkill: state.deleteSkill,
      adjustCategoryScore: state.adjustCategoryScore,
      importResume: state.importResume,
      importGithubProfile: state.importGithubProfile,
      setTargetRole: state.setTargetRole,
      generateRoadmap: state.generateRoadmap,
      toggleRoadmapTask: state.toggleRoadmapTask,
      setStudyHours: state.setStudyHours,
      setRoadmapWeeks: state.setRoadmapWeeks,
      sendCoachMessage: state.sendCoachMessage,
      dismissNotification: state.dismissNotification,
    }),
    shallow
  );

  const deferredPanel = useDeferredValue(activePanel);

  const activePanelTitle = useMemo(
    () => navItems.find((item) => item.id === deferredPanel)?.label ?? 'Overview',
    [deferredPanel]
  );

  if (isBooting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg px-6">
        <div className="glass-card w-full max-w-xl rounded-[32px] p-8 text-center">
          <div className="mx-auto h-14 w-14 animate-pulse rounded-full bg-gradient-to-r from-brand-teal to-brand-violet" />
          <p className="mt-5 text-sm uppercase tracking-[0.3em] text-brand-muted">
            Loading dashboard
          </p>
          <h1 className="mt-4 font-display text-4xl text-white">Preparing your growth cockpit.</h1>
        </div>
      </div>
    );
  }

  const renderPanel = () => {
    if (deferredPanel === 'overview') {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <ProgressCard
              label="Skills tracked"
              value={summary.skillsTracked}
              helper="Across technical, soft, and domain dimensions."
              tone="teal"
            />
            <ProgressCard
              label="Gaps identified"
              value={summary.gapsIdentified}
              helper="Priority gaps between your current map and the selected role."
              tone="violet"
            />
            <ProgressCard
              label="Study streak"
              value={`${summary.streakDays}d`}
              helper="Consistency score derived from roadmap task activity."
              tone="indigo"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.62fr_0.38fr]">
            <SkillRadarChart data={radarData} onAdjustAxis={adjustCategoryScore} />
            <TaskTracker tasks={urgentTasks} onToggleTask={toggleRoadmapTask} />
          </div>

          <Card className="p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Skill Cloud</p>
                <h3 className="mt-3 font-display text-3xl text-white">Visible strengths and gaps</h3>
              </div>
              <Button onClick={openAddSkill}>Add skill</Button>
            </div>
            <div className="mt-6">
              <SkillTagCloud skills={skills} />
            </div>
          </Card>
        </div>
      );
    }

    if (deferredPanel === 'skills') {
      return (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[0.68fr_0.32fr]">
            <SkillRadarChart data={radarData} onAdjustAxis={adjustCategoryScore} />

            <Card className="p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Input Methods</p>
              <h3 className="mt-3 font-display text-3xl text-white">Keep your map current</h3>
              <div className="mt-6 space-y-4">
                <Button onClick={openAddSkill} className="w-full justify-center">
                  Add Skill Manually
                </Button>
                <label className="block">
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(event) => {
                      const [file] = event.target.files ?? [];
                      if (file) {
                        importResume(file);
                      }
                    }}
                  />
                  <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-violet/60 hover:bg-white/10">
                    <Upload className="h-4 w-4" />
                    {isImporting ? 'Importing resume...' : 'Import Resume PDF'}
                  </span>
                </label>
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={() => importGithubProfile('alex-dev')}
                >
                  Import GitHub Profile
                </Button>
              </div>
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                Imported skills are tagged by source so you can distinguish manual confidence from
                inferred evidence.
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Tagged Skills</p>
                <h3 className="mt-3 font-display text-3xl text-white">All tracked capabilities</h3>
              </div>
              <Badge tone="slate">{skills.length} tracked</Badge>
            </div>
            <div className="mt-6">
              <SkillTagCloud skills={skills} />
            </div>
            <div className="mt-6 grid gap-4">
              {skills.slice(0, 6).map((skill) => (
                <div
                  key={skill.id}
                  className="grid gap-4 rounded-[24px] border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_180px_180px]"
                >
                  <div>
                    <p className="font-semibold text-white">{skill.name}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-brand-muted">
                      {skill.category} • {skill.source}
                    </p>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.proficiency}
                    onChange={(event) =>
                      updateSkill(skill.id, { proficiency: Number(event.target.value) })
                    }
                    className="w-full accent-[#2DD4BF]"
                    aria-label={`${skill.name} proficiency`}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-brand-teal">{skill.proficiency}%</span>
                    <Button variant="secondary" size="sm" onClick={() => deleteSkill(skill.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    if (deferredPanel === 'gap') {
      return (
        <GapAnalysisPanel
          targetRole={targetRole}
          roleOptions={roleOptions}
          onSelectRole={setTargetRole}
          gapMatrix={gapMatrix}
          readinessScore={readinessScore}
        />
      );
    }

    if (deferredPanel === 'roadmap') {
      return (
        <div className="space-y-6">
          <LearningRoadmap
            roadmap={roadmap}
            onGenerate={generateRoadmap}
            isGenerating={isGeneratingRoadmap}
            narration={roadmapNarration}
            onToggleTask={toggleRoadmapTask}
            studyHours={studyHours}
            roadmapWeeks={roadmapWeeks}
            onStudyHoursChange={setStudyHours}
            onWeeksChange={setRoadmapWeeks}
          />
        </div>
      );
    }

    if (deferredPanel === 'coach') {
      return (
        <AICoachChat
          messages={chatMessages}
          onSend={sendCoachMessage}
          isChatting={isChatting}
          suggestedQuestions={suggestedQuestions}
          targetRole={targetRole}
        />
      );
    }

    if (deferredPanel === 'progress') {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <ProgressCard
              label="Tasks completed"
              value={`${summary.tasksCompleted}/${summary.tasksTotal || 1}`}
              helper="Roadmap actions closed so far."
              tone="teal"
            />
            <ProgressCard
              label="Weekly minutes"
              value={summary.weeklyStudyMinutes}
              helper="Approximate study time currently planned."
              tone="violet"
            />
            <ProgressCard
              label="Readiness"
              value={`${summary.readinessScore}%`}
              helper="Weighted score across the active target role."
              tone="indigo"
            />
          </div>
          <WeeklyProgressChart data={weeklyTrend} />
          <div className="grid gap-6 xl:grid-cols-[0.5fr_0.5fr]">
            <StreakTracker data={activityData} />
            <MilestoneList milestones={milestones} />
          </div>
          <BadgeShowcase badges={badges} />
        </div>
      );
    }

    return (
      <SettingsPanel
        studyHours={studyHours}
        roadmapWeeks={roadmapWeeks}
        onStudyHoursChange={setStudyHours}
        onWeeksChange={setRoadmapWeeks}
        targetRole={targetRole}
      />
    );
  };

  return (
    <div className={`relative min-h-screen overflow-x-hidden bg-brand-bg ${themeStyles[themeMode]}`}>
      <div className="pointer-events-none absolute inset-0 opacity-90" />
      <NotificationTray notifications={notifications} onDismiss={dismissNotification} />

      <Sidebar
        activePanel={activePanel}
        isOpen={isSidebarOpen}
        onSelect={(panelId) => startTransition(() => setActivePanel(panelId))}
        onToggle={toggleSidebar}
      />

      <div className={`${isSidebarOpen ? 'md:pl-72' : 'md:pl-24'} relative z-10 min-h-screen transition-all`}>
        <header className="sticky top-0 z-20 border-b border-white/10 bg-brand-bg/70 px-4 py-4 backdrop-blur-xl md:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">{activePanelTitle}</p>
              <h1 className="mt-2 font-display text-3xl text-white md:text-4xl">
                Welcome back, {user.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setThemeMode((mode) => (mode === 'nebula' ? 'tide' : 'nebula'))}
              >
                <MoonStar className="h-4 w-4" />
                {themeMode === 'nebula' ? 'Switch palette' : 'Restore palette'}
              </Button>
              <div className="relative rounded-full border border-white/10 bg-white/5 p-3 text-slate-200">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-violet text-[10px] font-semibold text-white">
                  {notifications.length}
                </span>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                {user.name.split(' ').map((part) => part[0]).join('')}
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 md:px-8 md:py-10">
          <div className="scrollbar-thin mb-6 flex gap-3 overflow-x-auto pb-2 md:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => startTransition(() => setActivePanel(item.id))}
                  className={`inline-flex min-w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                    activePanel === item.id
                      ? 'border-brand-teal/40 bg-brand-teal/10 text-brand-teal'
                      : 'border-white/10 bg-white/5 text-slate-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mb-8 grid gap-4 xl:grid-cols-[0.68fr_0.32fr]">
            <Card className="p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Target Alignment</p>
                  <h2 className="mt-3 font-display text-4xl text-white">{targetRole}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                    Your dashboard is tracking current strengths, visible gaps, and roadmap progress
                    toward the role you want next.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge tone="teal">{summary.readinessScore}% ready</Badge>
                  <Badge tone="slate">{summary.gapsIdentified} gaps active</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-brand-teal">Quick actions</p>
              <div className="mt-4 grid gap-3">
                <Button onClick={openAddSkill}>Add a skill</Button>
                <Button variant="secondary" onClick={() => startTransition(() => setActivePanel('roadmap'))}>
                  Generate roadmap
                </Button>
                <Button variant="secondary" onClick={() => startTransition(() => setActivePanel('coach'))}>
                  Ask AI coach
                </Button>
              </div>
            </Card>
          </div>

          {renderPanel()}

          {deferredPanel === 'overview' ? (
            <div className="mt-8">
              <GapAnalysisPanel
                targetRole={targetRole}
                roleOptions={roleOptions}
                onSelectRole={setTargetRole}
                gapMatrix={gapMatrix}
                readinessScore={readinessScore}
              />
            </div>
          ) : null}
        </main>
      </div>

      <AddSkillModal open={isAddSkillOpen} onClose={closeAddSkill} onSubmit={addSkill} />
    </div>
  );
}

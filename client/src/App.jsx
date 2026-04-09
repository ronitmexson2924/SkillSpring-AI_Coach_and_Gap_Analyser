import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const Dashboard = lazy(() => import('./pages/Dashboard'));

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-bg px-6">
      <div className="glass-card w-full max-w-md rounded-[28px] p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-gradient-to-r from-brand-teal to-brand-violet" />
        <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Loading SkillSpring</p>
        <h1 className="mt-4 font-display text-3xl text-white">Preparing your growth cockpit.</h1>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}

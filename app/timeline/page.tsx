import { Timeline } from '@/components/dashboard/Timeline';

export default function TimelinePage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Master Timeline</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Cross-team milestones and critical tasks — 12 weeks to event day
        </p>
      </div>
      <Timeline />
    </div>
  );
}

'use client';
import { useState } from 'react';
import { FileSpreadsheet, Upload, CheckCircle2, AlertCircle, Download, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const SAMPLE_DATA = [
  { session: 'Opening Keynote: India\'s 6G Vision', speaker: 'Minister of Electronics & IT', track: 'Main Stage', day: 'Day 1', time: '10:00', duration: '45 min', status: 'Confirmed', tier: 'Govt' },
  { session: 'Panel: Spectrum Allocation & Policy', speaker: 'Multiple Panelists', track: 'Track 1', day: 'Day 1', time: '11:30', duration: '60 min', status: 'Confirmed', tier: 'Platinum' },
  { session: 'AI in Telecom Infrastructure', speaker: 'Vikram Nair, CTO TechCorp', track: 'Track 2', day: 'Day 1', time: '14:00', duration: '30 min', status: 'Confirmed', tier: 'Gold' },
  { session: '5G Enterprise Use Cases', speaker: 'TBC', track: 'Track 1', day: 'Day 2', time: '10:00', duration: '45 min', status: 'Pending', tier: 'Platinum' },
  { session: 'Startup Showcase: Deep Tech', speaker: 'Multiple Startups', track: 'Aspire Zone', day: 'Day 2', time: '14:00', duration: '90 min', status: 'Confirmed', tier: 'Aspire' },
  { session: 'Valedictory & Awards', speaker: 'Senior Minister', track: 'Main Stage', day: 'Day 3', time: '17:00', duration: '60 min', status: 'TBC', tier: 'Govt' },
];

type ImportState = 'idle' | 'mapping' | 'preview' | 'importing' | 'done';

export default function SheetsImportPage() {
  const [state, setState] = useState<ImportState>('idle');
  const [progress, setProgress] = useState(0);
  const [sheetsUrl, setSheetsUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  function handleImport() {
    if (!sheetsUrl.trim()) {
      setUrlError('Please paste a Google Sheets URL');
      return;
    }
    setUrlError('');
    setState('mapping');
  }

  function handleRunImport() {
    setState('importing');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20;
      setProgress(Math.min(100, p));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setState('done'), 300);
      }
    }, 200);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-slate-900">Google Sheets Import</h1>
        </div>
        <p className="text-sm text-slate-500">
          For Conference Management — import speaker and session data from your existing Google Sheets agenda
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <strong>Integration point:</strong> This page demonstrates the Google Sheets sync hook for Conference Management.
          In production, connect via the Google Sheets API using a service account. Data maps to the session agenda
          in the Conference Management department workspace.
        </div>
      </div>

      {/* Step 1: URL input */}
      {state === 'idle' && (
        <div className="bg-white border border-slate-100 rounded-xl p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Step 1: Connect your Sheet</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Google Sheets URL</label>
              <input
                type="text"
                value={sheetsUrl}
                onChange={(e) => setSheetsUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className={cn(
                  'w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                  urlError ? 'border-red-300' : 'border-slate-200'
                )}
              />
              {urlError && <p className="text-xs text-red-500 mt-1">{urlError}</p>}
              <p className="text-xs text-slate-400 mt-1">
                Make sure the sheet is shared with "Anyone with link can view"
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Sheet tab name</label>
              <input
                type="text"
                defaultValue="Session Agenda"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleImport}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Connect & Preview
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Column mapping */}
      {state === 'mapping' && (
        <div className="bg-white border border-slate-100 rounded-xl p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Step 2: Column Mapping</h2>
          <p className="text-sm text-slate-500 mb-4">Map your sheet columns to the system fields</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase">
                  <th className="text-left py-2 pr-4">Sheet Column</th>
                  <th className="text-left py-2">Maps To</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  ['Session Title', 'Task Title'],
                  ['Speaker Name', 'Assignee (Speaker)'],
                  ['Track', 'Tag: Track'],
                  ['Day', 'Tag: Event Day'],
                  ['Time', 'Custom Field: Time Slot'],
                  ['Duration', 'Custom Field: Duration'],
                  ['Status', 'Task Status'],
                  ['Tier', 'Tag: Partner Tier'],
                ].map(([col, field]) => (
                  <tr key={col}>
                    <td className="py-2.5 pr-4 font-mono text-xs text-slate-500 bg-slate-50 px-2 rounded">{col}</td>
                    <td className="py-2.5">
                      <select className="text-sm border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>{field}</option>
                        <option>— Ignore —</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setState('preview')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Preview Import
          </button>
        </div>
      )}

      {/* Step 3: Preview */}
      {state === 'preview' && (
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-800">Step 3: Preview ({SAMPLE_DATA.length} sessions)</h2>
            <p className="text-sm text-slate-500 mt-0.5">Review the data before importing</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wide">
                  {['Session', 'Speaker', 'Track', 'Day', 'Time', 'Status', 'Tier'].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {SAMPLE_DATA.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-slate-700 max-w-xs">{row.session}</td>
                    <td className="px-4 py-2.5 text-slate-500">{row.speaker}</td>
                    <td className="px-4 py-2.5 text-slate-500">{row.track}</td>
                    <td className="px-4 py-2.5 text-slate-500">{row.day}</td>
                    <td className="px-4 py-2.5 text-slate-500">{row.time}</td>
                    <td className="px-4 py-2.5">
                      <span className={cn(
                        'px-1.5 py-0.5 rounded-full',
                        row.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        row.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-500'
                      )}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-500">{row.tier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3">
            <button
              onClick={handleRunImport}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import {SAMPLE_DATA.length} Sessions
            </button>
            <button
              onClick={() => setState('mapping')}
              className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Importing */}
      {state === 'importing' && (
        <div className="bg-white border border-slate-100 rounded-xl p-8 flex flex-col items-center gap-4">
          <div className="text-sm font-medium text-slate-700">Importing sessions…</div>
          <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-slate-400">{Math.round(progress)}%</div>
        </div>
      )}

      {/* Done */}
      {state === 'done' && (
        <div className="bg-white border border-emerald-100 rounded-xl p-8 flex flex-col items-center gap-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          <div className="text-lg font-semibold text-slate-800">Import Complete</div>
          <div className="text-sm text-slate-500 text-center max-w-sm">
            {SAMPLE_DATA.length} sessions imported into the Conference Management workspace.
            Tasks have been created with speaker assignments, tags, and time slots.
          </div>
          <div className="flex gap-3 mt-2">
            <a
              href="/department/conference"
              className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              View Conference Board
            </a>
            <button
              onClick={() => { setState('idle'); setSheetsUrl(''); setProgress(0); }}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
            >
              Import Another Sheet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

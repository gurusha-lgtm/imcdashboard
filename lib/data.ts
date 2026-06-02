export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'not_started' | 'in_progress' | 'blocked' | 'review' | 'done';
export type Department =
  | 'sales_marketing'
  | 'programs'
  | 'marketing_design'
  | 'govt_relations'
  | 'finance_ops';

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  department: Department;
  status: Status;
  priority: Priority;
  assignees: string[];
  dueDate: string;
  createdAt: string;
  tags: string[];
  subtasks: Subtask[];
  comments: Comment[];
  dependencies: string[];
  milestone?: boolean;
  notes?: string;
  blocked_reason?: string;
}

export interface DepartmentInfo {
  id: Department;
  name: string;
  color: string;
  lead: string;
  members: string[];
  description: string;
  icon: string;
}

// IMC 2025: October 7–10, 2026, IICC Yashobhoomi, New Delhi
const EVENT_DATE = '2026-10-07';

function weeksBeforeEvent(weeks: number): string {
  const eventDate = new Date(EVENT_DATE);
  const d = new Date(eventDate);
  d.setDate(d.getDate() - weeks * 7);
  return d.toISOString().split('T')[0];
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'sales_marketing',
    name: 'Sales & Marketing',
    color: '#2563eb',
    lead: 'Pradeep Prakash',
    members: ['Pradeep Prakash', 'Parul Singh', 'Lovesh Bhatia', 'Samit Shukla'],
    description: 'Partnerships, sponsorships, pre-sales and business development',
    icon: 'TrendingUp',
  },
  {
    id: 'programs',
    name: 'Programs',
    color: '#7c3aed',
    lead: 'Garima Sharma',
    members: ['Garima Sharma', 'Gurusha Sethi', 'Priyanka Sondhi'],
    description: 'Conference programming, session management, design and social media',
    icon: 'Mic',
  },
  {
    id: 'marketing_design',
    name: 'Marketing & Design',
    color: '#db2777',
    lead: 'Vipin Kumar',
    members: ['Vipin Kumar'],
    description: 'Creative direction, brand identity, visual design',
    icon: 'Megaphone',
  },
  {
    id: 'govt_relations',
    name: 'Government Relations',
    color: '#059669',
    lead: 'Sudhakaran',
    members: ['Sudhakaran'],
    description: 'Ministry coordination, government delegations, policy liaison',
    icon: 'Landmark',
  },
  {
    id: 'finance_ops',
    name: 'Finance & HR Operations',
    color: '#dc2626',
    lead: 'Neeraj Singh',
    members: ['Neeraj Singh'],
    description: 'Finance, HR, vendor payments, operational support',
    icon: 'Settings',
  },
];

export const TASKS: Task[] = [
  // ============ SALES & MARKETING ============
  {
    id: 'SM001',
    title: 'Platinum Partner Confirmations',
    description: 'Confirm all Platinum tier sponsors, collect signed agreements and advance payments',
    department: 'sales_marketing',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Pradeep Prakash', 'Parul Singh'],
    dueDate: weeksBeforeEvent(10),
    createdAt: weeksBeforeEvent(12),
    tags: ['platinum', 'partnerships'],
    milestone: true,
    subtasks: [
      { id: 'SM001-1', title: 'Send contracts to confirmed Platinum partners', done: true },
      { id: 'SM001-2', title: 'Collect signed agreements (8/12)', done: true },
      { id: 'SM001-3', title: 'Follow up with remaining 4 partners', done: false },
      { id: 'SM001-4', title: 'Update CRM with final status', done: false },
    ],
    comments: [
      { id: 'c1', author: 'Pradeep Prakash', text: 'Reliance and Airtel confirmed. 4 still pending.', timestamp: weeksBeforeEvent(11) },
      { id: 'c2', author: 'Parul Singh', text: 'Following up with Samsung and Nokia this week.', timestamp: weeksBeforeEvent(11) },
    ],
    dependencies: [],
    notes: 'Retainer clients from IMC 2024 auto-confirmed. New Platinum additions pending legal review.',
  },
  {
    id: 'SM002',
    title: 'Gold Partner Outreach Campaign',
    description: 'Email and call campaign for 40 Gold tier prospects',
    department: 'sales_marketing',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Samit Shukla', 'Lovesh Bhatia'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['gold', 'outreach'],
    subtasks: [
      { id: 'SM002-1', title: 'Segment prospect list', done: true },
      { id: 'SM002-2', title: 'Draft email sequence', done: true },
      { id: 'SM002-3', title: 'Wave 1 sent (20 contacts)', done: true },
      { id: 'SM002-4', title: 'Wave 2 sent (20 contacts)', done: false },
      { id: 'SM002-5', title: 'Schedule follow-up calls', done: false },
    ],
    comments: [],
    dependencies: [],
  },
  {
    id: 'SM003',
    title: 'Sponsorship Deck Refresh',
    description: 'Update sponsorship deck with IMC 2025 theme, new packages, and 2024 event stats',
    department: 'sales_marketing',
    status: 'review',
    priority: 'high',
    assignees: ['Lovesh Bhatia'],
    dueDate: weeksBeforeEvent(11),
    createdAt: weeksBeforeEvent(12),
    tags: ['deck', 'collateral'],
    subtasks: [
      { id: 'SM003-1', title: 'Gather IMC 2024 metrics', done: true },
      { id: 'SM003-2', title: 'Update package pricing', done: true },
      { id: 'SM003-3', title: 'Design review with Vipin', done: false },
    ],
    comments: [
      { id: 'c3', author: 'Lovesh Bhatia', text: 'Draft done. Sent to Vipin for design review.', timestamp: weeksBeforeEvent(11) },
    ],
    dependencies: ['MD001'],
  },
  {
    id: 'SM004',
    title: 'Retainer Client Renewals',
    description: 'Process renewal contracts for returning sponsors from IMC 2024',
    department: 'sales_marketing',
    status: 'done',
    priority: 'critical',
    assignees: ['Parul Singh'],
    dueDate: weeksBeforeEvent(12),
    createdAt: weeksBeforeEvent(12),
    tags: ['renewals', 'retainer'],
    subtasks: [],
    comments: [],
    dependencies: [],
  },
  {
    id: 'SM005',
    title: 'Partnership Tier Benefits Sign-off',
    description: 'Lock in deliverables for each sponsorship tier — sessions, branding, booth allocation',
    department: 'sales_marketing',
    status: 'done',
    priority: 'critical',
    assignees: ['Pradeep Prakash', 'Garima Sharma'],
    dueDate: weeksBeforeEvent(12),
    createdAt: weeksBeforeEvent(12),
    tags: ['tiers', 'benefits'],
    subtasks: [],
    comments: [],
    dependencies: [],
    notes: 'Aligned with Programs team on session allocation per tier.',
  },
  {
    id: 'SM006',
    title: 'Silver & Associate Partner Closures',
    description: 'Close remaining Silver and Associate sponsorship slots',
    department: 'sales_marketing',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Samit Shukla'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['silver', 'associate'],
    subtasks: [],
    comments: [],
    dependencies: ['SM002'],
  },
  {
    id: 'SM007',
    title: 'On-Site Branding Handover to Ops',
    description: 'Hand over final partner logo assets and branding requirements to operations team',
    department: 'sales_marketing',
    status: 'not_started',
    priority: 'high',
    assignees: ['Parul Singh', 'Vipin Kumar'],
    dueDate: weeksBeforeEvent(4),
    createdAt: weeksBeforeEvent(12),
    tags: ['branding', 'handover'],
    subtasks: [],
    comments: [],
    dependencies: ['SM001', 'MD001'],
  },

  // ============ PROGRAMS ============
  {
    id: 'PR001',
    title: 'Keynote Speaker Confirmations',
    description: 'Confirm keynote speakers for main stage across all 4 event days (Oct 7–10)',
    department: 'programs',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Garima Sharma', 'Gurusha Sethi'],
    dueDate: weeksBeforeEvent(9),
    createdAt: weeksBeforeEvent(12),
    tags: ['keynote', 'speakers'],
    milestone: true,
    subtasks: [
      { id: 'PR001-1', title: 'Day 1 keynote confirmed (DoT Minister)', done: true },
      { id: 'PR001-2', title: 'Day 2 keynote confirmed (Industry CEO)', done: true },
      { id: 'PR001-3', title: 'Day 3 keynote — awaiting PMO', done: false },
      { id: 'PR001-4', title: 'Day 4 valedictory speaker', done: false },
      { id: 'PR001-5', title: 'Send speaker briefs and logistics info', done: false },
    ],
    comments: [
      { id: 'c4', author: 'Garima Sharma', text: 'DoT minister confirmed Day 1. PMO response pending for Day 3.', timestamp: weeksBeforeEvent(10) },
    ],
    dependencies: ['GR001'],
    notes: 'Day 3 keynote contingent on Government Relations confirming ministerial availability.',
  },
  {
    id: 'PR002',
    title: 'Session Agenda — Track 1 (5G & Connectivity)',
    description: 'Build complete 4-day agenda for Track 1 sessions at Yashobhoomi',
    department: 'programs',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Gurusha Sethi'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['agenda', 'track1', '5G'],
    subtasks: [
      { id: 'PR002-1', title: 'Map partner sessions to track', done: true },
      { id: 'PR002-2', title: 'Fill non-partner slots with industry speakers', done: false },
      { id: 'PR002-3', title: 'Confirm panel moderators', done: false },
    ],
    comments: [],
    dependencies: ['SM001', 'SM005'],
  },
  {
    id: 'PR003',
    title: 'Session Agenda — Track 2 (AI & Deep Tech)',
    description: 'Build 4-day agenda for Track 2',
    department: 'programs',
    status: 'not_started',
    priority: 'high',
    assignees: ['Gurusha Sethi'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['agenda', 'track2', 'AI'],
    subtasks: [],
    comments: [],
    dependencies: ['PR002'],
  },
  {
    id: 'PR004',
    title: 'Social Media Content Calendar',
    description: 'Plan and schedule all pre-event social posts — speaker reveals, countdowns, partner announcements',
    department: 'programs',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Priyanka Sondhi'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['social media', 'content'],
    subtasks: [
      { id: 'PR004-1', title: 'Save-the-date posts published', done: true },
      { id: 'PR004-2', title: 'Speaker reveal series planned', done: true },
      { id: 'PR004-3', title: 'Partner announcement posts scheduled', done: false },
      { id: 'PR004-4', title: 'Countdown posts (4 weeks out)', done: false },
    ],
    comments: [
      { id: 'c5', author: 'Priyanka Sondhi', text: 'Save the date went live. Engagement is strong — 2.4x last year.', timestamp: weeksBeforeEvent(10) },
    ],
    dependencies: ['MD001'],
  },
  {
    id: 'PR005',
    title: 'Design Assets for Event Collateral',
    description: 'Create all design assets — digital banners, emailers, social creatives, stage backdrops',
    department: 'programs',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Priyanka Sondhi', 'Vipin Kumar'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['design', 'collateral', 'digital'],
    subtasks: [
      { id: 'PR005-1', title: 'Digital banner set (website + social)', done: true },
      { id: 'PR005-2', title: 'Email template designs', done: true },
      { id: 'PR005-3', title: 'Stage backdrop and AV screens', done: false },
      { id: 'PR005-4', title: 'Badge and registration desk design', done: false },
    ],
    comments: [],
    dependencies: ['MD001'],
  },
  {
    id: 'PR006',
    title: 'Speaker Travel & Accommodation',
    description: 'Coordinate flights, hotel stays, and on-site logistics for all confirmed speakers at Yashobhoomi',
    department: 'programs',
    status: 'not_started',
    priority: 'high',
    assignees: ['Gurusha Sethi'],
    dueDate: weeksBeforeEvent(4),
    createdAt: weeksBeforeEvent(12),
    tags: ['speakers', 'logistics', 'travel'],
    subtasks: [],
    comments: [],
    dependencies: ['PR001'],
  },
  {
    id: 'PR007',
    title: 'Stage Scripts & Runsheets (All 4 Days)',
    description: 'Prepare MC scripts and minute-by-minute runsheets for Oct 7–10',
    department: 'programs',
    status: 'not_started',
    priority: 'high',
    assignees: ['Garima Sharma', 'Gurusha Sethi'],
    dueDate: weeksBeforeEvent(2),
    createdAt: weeksBeforeEvent(12),
    tags: ['runsheet', 'scripts'],
    subtasks: [],
    comments: [],
    dependencies: ['PR001', 'PR002', 'PR003'],
  },
  {
    id: 'PR008',
    title: 'Awards Programme — Categories & Jury',
    description: 'Finalise award categories, select jury panel, and plan ceremony runsheet',
    department: 'programs',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Garima Sharma'],
    dueDate: weeksBeforeEvent(5),
    createdAt: weeksBeforeEvent(12),
    tags: ['awards', 'ceremony'],
    subtasks: [],
    comments: [],
    dependencies: ['GR001'],
  },

  // ============ MARKETING & DESIGN ============
  {
    id: 'MD001',
    title: 'IMC 2025 Brand Identity',
    description: 'Finalise visual identity, theme, colour palette and design language for IMC 2025',
    department: 'marketing_design',
    status: 'done',
    priority: 'critical',
    assignees: ['Vipin Kumar'],
    dueDate: weeksBeforeEvent(12),
    createdAt: weeksBeforeEvent(12),
    tags: ['branding', 'design', 'theme'],
    milestone: true,
    subtasks: [],
    comments: [],
    dependencies: [],
  },
  {
    id: 'MD002',
    title: 'Event Website — Go Live',
    description: 'Launch IMC 2025 website with agenda, speakers, and delegate registration',
    department: 'marketing_design',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Vipin Kumar'],
    dueDate: weeksBeforeEvent(9),
    createdAt: weeksBeforeEvent(12),
    tags: ['website', 'digital'],
    milestone: true,
    subtasks: [
      { id: 'MD002-1', title: 'Home page design and copy', done: true },
      { id: 'MD002-2', title: 'Agenda page (placeholder)', done: true },
      { id: 'MD002-3', title: 'Registration integration', done: false },
      { id: 'MD002-4', title: 'Speaker profiles page', done: false },
      { id: 'MD002-5', title: 'QA and go-live', done: false },
    ],
    comments: [],
    dependencies: ['MD001'],
  },
  {
    id: 'MD003',
    title: 'Physical Collateral — Print Brief to Agency',
    description: 'Brief design agency on banners, signage, badges, brochures for Yashobhoomi',
    department: 'marketing_design',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Vipin Kumar'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['print', 'agency', 'signage'],
    subtasks: [
      { id: 'MD003-1', title: 'Collateral inventory list', done: true },
      { id: 'MD003-2', title: 'Agency brief submitted', done: true },
      { id: 'MD003-3', title: 'First proofs review', done: false },
      { id: 'MD003-4', title: 'Final approval and send to print', done: false },
    ],
    comments: [],
    dependencies: ['MD001'],
  },
  {
    id: 'MD004',
    title: 'Partner Logo Wall & Co-branded Assets',
    description: 'Collect all sponsor logos and produce co-branded assets per tier',
    department: 'marketing_design',
    status: 'in_progress',
    priority: 'medium',
    assignees: ['Vipin Kumar'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['partners', 'logos', 'branding'],
    subtasks: [],
    comments: [],
    dependencies: ['SM001'],
  },
  {
    id: 'MD005',
    title: 'AV & Stage Design Brief',
    description: 'Brief production agency on main stage aesthetics, LED screens, and AV at Yashobhoomi',
    department: 'marketing_design',
    status: 'not_started',
    priority: 'high',
    assignees: ['Vipin Kumar'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['AV', 'stage', 'production'],
    subtasks: [],
    comments: [],
    dependencies: ['MD001'],
  },

  // ============ GOVERNMENT RELATIONS ============
  {
    id: 'GR001',
    title: 'MeitY Minister — Inauguration Confirmation',
    description: 'Confirm Minister of Electronics & IT for Day 1 inauguration at Yashobhoomi',
    department: 'govt_relations',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Sudhakaran'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['MeitY', 'inauguration', 'ministerial'],
    milestone: true,
    subtasks: [
      { id: 'GR001-1', title: 'Initial approach letter sent', done: true },
      { id: 'GR001-2', title: 'Ministry secretariat meeting done', done: true },
      { id: 'GR001-3', title: 'Formal confirmation received', done: false },
      { id: 'GR001-4', title: 'Protocol and logistics briefing', done: false },
    ],
    comments: [
      { id: 'c6', author: 'Sudhakaran', text: 'Secretary confirmed minister is available Oct 8. Awaiting official letter.', timestamp: weeksBeforeEvent(9) },
    ],
    dependencies: [],
    notes: 'Also pursuing PMO participation for Day 4 valedictory. P. Ramakrishna to send personal letter.',
  },
  {
    id: 'GR002',
    title: 'DoT Policy Announcement Coordination',
    description: 'Coordinate with Department of Telecom for potential 6G/spectrum policy announcement at IMC 2025',
    department: 'govt_relations',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Sudhakaran'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['DoT', 'policy', '6G'],
    subtasks: [],
    comments: [],
    dependencies: ['GR001'],
    notes: 'Highly sensitive — coordinate messaging with Programs team before any public communication.',
  },
  {
    id: 'GR003',
    title: 'State Government Delegations',
    description: 'Coordinate with 5 state IT Ministers / CMs to attend IMC 2025',
    department: 'govt_relations',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Sudhakaran'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['state', 'delegations'],
    subtasks: [],
    comments: [],
    dependencies: [],
  },
  {
    id: 'GR004',
    title: 'VIP Security & Protocol — CISF Briefing',
    description: 'Coordinate VIP security arrangements with CISF and Delhi Police for Yashobhoomi',
    department: 'govt_relations',
    status: 'not_started',
    priority: 'high',
    assignees: ['Sudhakaran'],
    dueDate: weeksBeforeEvent(3),
    createdAt: weeksBeforeEvent(12),
    tags: ['security', 'VIP', 'CISF'],
    subtasks: [],
    comments: [],
    dependencies: ['GR001', 'GR003'],
  },
  {
    id: 'GR005',
    title: 'Official Ministerial Invitation Letters',
    description: 'Draft and despatch formal invitation letters to all confirmed government attendees',
    department: 'govt_relations',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Sudhakaran'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['invitations', 'protocol'],
    subtasks: [],
    comments: [],
    dependencies: ['GR001'],
  },
  {
    id: 'GR006',
    title: 'International Delegations — Embassy Coordination',
    description: 'Coordinate with embassies and trade bodies for international government delegations',
    department: 'govt_relations',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Sudhakaran'],
    dueDate: weeksBeforeEvent(5),
    createdAt: weeksBeforeEvent(12),
    tags: ['international', 'delegations', 'embassy'],
    subtasks: [],
    dependencies: ['GR001'],
    comments: [],
  },

  // ============ FINANCE & HR OPERATIONS ============
  {
    id: 'FO001',
    title: 'Vendor Contracts — AV, Fabrication, Power',
    description: 'Finalise and sign contracts with all core build vendors at Yashobhoomi',
    department: 'finance_ops',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['vendors', 'contracts'],
    milestone: true,
    subtasks: [
      { id: 'FO001-1', title: 'AV vendor finalised', done: true },
      { id: 'FO001-2', title: 'Fabrication/carpentry vendor', done: true },
      { id: 'FO001-3', title: 'Power & electrical vendor', done: false },
      { id: 'FO001-4', title: 'Catering vendor shortlist', done: false },
    ],
    comments: [],
    dependencies: [],
  },
  {
    id: 'FO002',
    title: 'Sponsor Invoice & Payment Tracking',
    description: 'Track advance payments, milestone invoices, and outstanding balances from all sponsors',
    department: 'finance_ops',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(4),
    createdAt: weeksBeforeEvent(12),
    tags: ['invoicing', 'payments', 'finance'],
    subtasks: [],
    comments: [],
    dependencies: ['SM001'],
  },
  {
    id: 'FO003',
    title: 'Event Budget vs Actuals Review',
    description: 'Monthly budget reconciliation — flag overruns, reforecast where needed',
    department: 'finance_ops',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(2),
    createdAt: weeksBeforeEvent(12),
    tags: ['budget', 'finance'],
    subtasks: [],
    comments: [
      { id: 'c7', author: 'Neeraj Singh', text: 'Production costs 12% over forecast. Raised with Pradeep.', timestamp: weeksBeforeEvent(8) },
    ],
    dependencies: [],
  },
  {
    id: 'FO004',
    title: 'Venue Layout & Floor Plan (Yashobhoomi)',
    description: 'Finalise IICC Yashobhoomi hall allocations, floor plans, zone definitions',
    department: 'finance_ops',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['venue', 'Yashobhoomi', 'floor-plan'],
    milestone: true,
    subtasks: [
      { id: 'FO004-1', title: 'Hall allocations confirmed with IICC', done: true },
      { id: 'FO004-2', title: 'Exhibition zone layout', done: true },
      { id: 'FO004-3', title: 'Conference hall layout', done: false },
      { id: 'FO004-4', title: 'Entry/exit and emergency routes', done: false },
    ],
    comments: [],
    dependencies: [],
  },
  {
    id: 'FO005',
    title: 'Delegate Registration System',
    description: 'Configure badge printing, QR scanning, and check-in kiosk system',
    department: 'finance_ops',
    status: 'not_started',
    priority: 'high',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(4),
    createdAt: weeksBeforeEvent(12),
    tags: ['registration', 'badges', 'tech'],
    subtasks: [],
    comments: [],
    dependencies: ['MD002', 'FO004'],
  },
  {
    id: 'FO006',
    title: 'On-Site Staff & Volunteer Briefing',
    description: 'Brief 150+ on-site staff and volunteers on roles, zones, and escalation',
    department: 'finance_ops',
    status: 'not_started',
    priority: 'high',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(1),
    createdAt: weeksBeforeEvent(12),
    tags: ['staff', 'volunteers', 'briefing'],
    subtasks: [],
    comments: [],
    dependencies: ['FO004', 'FO001'],
  },
  {
    id: 'FO007',
    title: 'Post-Event Vendor Settlement',
    description: 'Process all vendor final invoices and payments within 30 days post-event',
    department: 'finance_ops',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Neeraj Singh'],
    dueDate: '2025-11-10',
    createdAt: weeksBeforeEvent(12),
    tags: ['finance', 'vendors', 'post-event'],
    subtasks: [],
    comments: [],
    dependencies: ['FO001', 'FO002'],
  },
];

export function getTaskById(id: string): Task | undefined {
  return TASKS.find((t) => t.id === id);
}

export function getTasksByDepartment(dept: Department): Task[] {
  return TASKS.filter((t) => t.department === dept);
}

export function getDepartmentStats(dept: Department) {
  const tasks = getTasksByDepartment(dept);
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const blocked = tasks.filter((t) => t.status === 'blocked').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const overdue = tasks.filter(
    (t) => t.status !== 'done' && new Date(t.dueDate) < new Date()
  ).length;

  let health: 'on-track' | 'at-risk' | 'blocked';
  if (blocked > 0 || overdue > 1) health = 'blocked';
  else if (overdue > 0 || (total > 0 && done / total < 0.3 && inProgress < 2)) health = 'at-risk';
  else health = 'on-track';

  return { total, done, blocked, inProgress, overdue, health, progress: total ? Math.round((done / total) * 100) : 0 };
}

export function getMilestones(): Task[] {
  return TASKS.filter((t) => t.milestone);
}

export function getUpcomingDeadlines(days = 14): Task[] {
  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + days);
  return TASKS.filter(
    (t) => t.status !== 'done' && new Date(t.dueDate) >= now && new Date(t.dueDate) <= future
  ).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}

export function getBlockedTasks(): Task[] {
  return TASKS.filter((t) => t.status === 'blocked');
}

export function getRecentActivity(limit = 10): Task[] {
  return [...TASKS]
    .filter((t) => t.comments.length > 0)
    .sort(
      (a, b) =>
        new Date(b.comments[b.comments.length - 1].timestamp).getTime() -
        new Date(a.comments[a.comments.length - 1].timestamp).getTime()
    )
    .slice(0, limit);
}

export function EVENT_DATE_VALUE() {
  return EVENT_DATE;
}

export function EVENT_END_DATE() {
  return '2026-10-10';
}

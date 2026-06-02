export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'not_started' | 'in_progress' | 'blocked' | 'review' | 'done';
export type Department =
  | 'sales'
  | 'conference'
  | 'marketing'
  | 'pr'
  | 'govt'
  | 'operations'
  | 'aspire';

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
  dependencies: string[]; // task IDs this task depends on
  milestone?: boolean;
  notes?: string;
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

// Event date: 12 weeks from a base date
const EVENT_DATE = '2026-10-15';

// Compute a date relative to event (negative = before event)
function weeksBeforeEvent(weeks: number): string {
  const eventDate = new Date(EVENT_DATE);
  const d = new Date(eventDate);
  d.setDate(d.getDate() - weeks * 7);
  return d.toISOString().split('T')[0];
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'sales',
    name: 'Sales',
    color: '#2563eb',
    lead: 'Arjun Mehta',
    members: ['Arjun Mehta', 'Priya Sharma', 'Ravi Kumar', 'Neha Singh'],
    description: 'Lead pipeline, partnership closures, retainer clients',
    icon: 'TrendingUp',
  },
  {
    id: 'conference',
    name: 'Conference Management',
    color: '#7c3aed',
    lead: 'Sunita Patel',
    members: ['Sunita Patel', 'Amit Verma', 'Deepika Rao', 'Kiran Joshi'],
    description: 'Session planning, speaker coordination, agenda management',
    icon: 'Mic',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    color: '#db2777',
    lead: 'Rahul Gupta',
    members: ['Rahul Gupta', 'Ananya Krishnan', 'Siddharth Roy', 'Pooja Nair'],
    description: 'Digital collaterals, physical materials, design agency coordination',
    icon: 'Megaphone',
  },
  {
    id: 'pr',
    name: 'PR & Communications',
    color: '#d97706',
    lead: 'Meera Iyer',
    members: ['Meera Iyer', 'Vikram Shah', 'Tanvi Desai'],
    description: 'Media relations, press coverage, announcements',
    icon: 'Newspaper',
  },
  {
    id: 'govt',
    name: 'Government Liaising',
    color: '#059669',
    lead: 'Anil Srivastava',
    members: ['Anil Srivastava', 'Rekha Pandey', 'Suresh Nambiar', 'Lakshmi Menon'],
    description: 'Multi-stakeholder coordination with ministries and regulatory bodies',
    icon: 'Landmark',
  },
  {
    id: 'operations',
    name: 'Operations',
    color: '#dc2626',
    lead: 'Vishal Thakur',
    members: ['Vishal Thakur', 'Manish Dubey', 'Geeta Pillai', 'Rohit Yadav', 'Swati Mishra'],
    description: 'On-ground execution: venue, logistics, vendor management',
    icon: 'Settings',
  },
  {
    id: 'aspire',
    name: 'Aspire (Startup Program)',
    color: '#0891b2',
    lead: 'Divya Kapoor',
    members: ['Divya Kapoor', 'Nikhil Bansal', 'Shreya Jain', 'Abhishek Tiwari'],
    description: 'Startup pod sales, program coordination, startup onboarding',
    icon: 'Rocket',
  },
];

export const TASKS: Task[] = [
  // ============ SALES ============
  {
    id: 'S001',
    title: 'Finalize Platinum Partner List',
    description: 'Confirm all Platinum tier partners and collect signed agreements',
    department: 'sales',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Arjun Mehta', 'Priya Sharma'],
    dueDate: weeksBeforeEvent(10),
    createdAt: weeksBeforeEvent(12),
    tags: ['partnerships', 'platinum'],
    milestone: true,
    subtasks: [
      { id: 'S001-1', title: 'Send contracts to confirmed partners', done: true },
      { id: 'S001-2', title: 'Collect signed agreements from 8/12 partners', done: true },
      { id: 'S001-3', title: 'Chase remaining 4 partners', done: false },
      { id: 'S001-4', title: 'Update CRM with final status', done: false },
    ],
    comments: [
      { id: 'c1', author: 'Arjun Mehta', text: 'TechCorp signed today. 4 remaining.', timestamp: weeksBeforeEvent(11) },
      { id: 'c2', author: 'Priya Sharma', text: 'Following up with Reliance and Tata this week.', timestamp: weeksBeforeEvent(11) },
    ],
    dependencies: [],
    notes: 'Retainer clients from last year auto-confirmed. New additions pending legal review.',
  },
  {
    id: 'S002',
    title: 'Gold Partner Outreach Campaign',
    description: 'Email + call campaign for 40 Gold tier prospects',
    department: 'sales',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Ravi Kumar', 'Neha Singh'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['outreach', 'gold'],
    subtasks: [
      { id: 'S002-1', title: 'Segment prospect list', done: true },
      { id: 'S002-2', title: 'Draft email sequence', done: true },
      { id: 'S002-3', title: 'Send wave 1 (20 contacts)', done: true },
      { id: 'S002-4', title: 'Send wave 2 (20 contacts)', done: false },
      { id: 'S002-5', title: 'Schedule follow-up calls', done: false },
    ],
    comments: [],
    dependencies: [],
  },
  {
    id: 'S003',
    title: 'Sponsorship Deck Update',
    description: 'Refresh deck with 2026 event stats, new packages, and audience data',
    department: 'sales',
    status: 'review',
    priority: 'high',
    assignees: ['Arjun Mehta'],
    dueDate: weeksBeforeEvent(11),
    createdAt: weeksBeforeEvent(12),
    tags: ['collateral', 'deck'],
    subtasks: [
      { id: 'S003-1', title: 'Gather 2025 event metrics', done: true },
      { id: 'S003-2', title: 'Update package pricing', done: true },
      { id: 'S003-3', title: 'Design review with Marketing', done: false },
    ],
    comments: [
      { id: 'c3', author: 'Arjun Mehta', text: 'Sent to Rahul for design review.', timestamp: weeksBeforeEvent(11) },
    ],
    dependencies: ['M001'],
  },
  {
    id: 'S004',
    title: 'Retainer Client Renewals',
    description: 'Process renewal contracts for 18 retainer clients from 2025',
    department: 'sales',
    status: 'done',
    priority: 'critical',
    assignees: ['Priya Sharma'],
    dueDate: weeksBeforeEvent(12),
    createdAt: weeksBeforeEvent(12),
    tags: ['renewals', 'retainer'],
    subtasks: [],
    comments: [],
    dependencies: [],
  },
  {
    id: 'S005',
    title: 'Partnership Tier Benefits Finalisation',
    description: 'Lock in what each tier gets — sessions, branding, booth, etc.',
    department: 'sales',
    status: 'done',
    priority: 'critical',
    assignees: ['Arjun Mehta', 'Sunita Patel'],
    dueDate: weeksBeforeEvent(12),
    createdAt: weeksBeforeEvent(12),
    tags: ['tiers', 'benefits'],
    subtasks: [],
    comments: [],
    dependencies: [],
    notes: 'Aligned with Conference Management on session allocation.',
  },
  {
    id: 'S006',
    title: 'Silver & Associate Partner Closures',
    description: 'Close out remaining Silver tier and Associate partner spots',
    department: 'sales',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Neha Singh'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['silver', 'associate'],
    subtasks: [],
    comments: [],
    dependencies: ['S002'],
  },
  {
    id: 'S007',
    title: 'Post-Event Upsell Proposals',
    description: 'Prepare post-IMC proposals for upgrade to next year',
    department: 'sales',
    status: 'not_started',
    priority: 'low',
    assignees: ['Ravi Kumar'],
    dueDate: weeksBeforeEvent(1),
    createdAt: weeksBeforeEvent(12),
    tags: ['upsell', 'post-event'],
    subtasks: [],
    comments: [],
    dependencies: ['S001'],
  },

  // ============ CONFERENCE MANAGEMENT ============
  {
    id: 'C001',
    title: 'Speaker Invitation — Keynote Speakers',
    description: 'Confirm 6 keynote speakers for main stage across 3 event days',
    department: 'conference',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Sunita Patel', 'Deepika Rao'],
    dueDate: weeksBeforeEvent(9),
    createdAt: weeksBeforeEvent(12),
    tags: ['keynote', 'speakers'],
    milestone: true,
    subtasks: [
      { id: 'C001-1', title: 'Confirm Day 1 keynote (Minister)', done: true },
      { id: 'C001-2', title: 'Confirm Day 2 keynote (Industry CEO)', done: true },
      { id: 'C001-3', title: 'Confirm Day 3 keynote', done: false },
      { id: 'C001-4', title: 'Send speaker briefs and logistics info', done: false },
    ],
    comments: [
      { id: 'c4', author: 'Sunita Patel', text: 'DoT minister confirmed for Day 1. Awaiting PMO for Day 3.', timestamp: weeksBeforeEvent(10) },
    ],
    dependencies: ['G001'],
    notes: 'Day 3 keynote is contingent on Government Liaison confirming ministerial availability.',
  },
  {
    id: 'C002',
    title: 'Session Agenda — Track 1 (5G & Connectivity)',
    description: 'Build out full 3-day agenda for Track 1 sessions',
    department: 'conference',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Amit Verma'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['agenda', 'track1', '5G'],
    subtasks: [
      { id: 'C002-1', title: 'Map partner sessions to track', done: true },
      { id: 'C002-2', title: 'Fill non-partner slots with industry speakers', done: false },
      { id: 'C002-3', title: 'Confirm panel moderators', done: false },
    ],
    comments: [],
    dependencies: ['S001', 'S005'],
  },
  {
    id: 'C003',
    title: 'Session Agenda — Track 2 (AI & Deep Tech)',
    description: 'Build out 3-day agenda for Track 2',
    department: 'conference',
    status: 'not_started',
    priority: 'high',
    assignees: ['Kiran Joshi'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['agenda', 'track2', 'AI'],
    subtasks: [],
    comments: [],
    dependencies: ['C002'],
  },
  {
    id: 'C004',
    title: 'Google Sheets Agenda Import & Sync',
    description: 'Import current speaker/session data from Sheets and keep in sync',
    department: 'conference',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Amit Verma', 'Deepika Rao'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['sheets', 'integration', 'data'],
    subtasks: [
      { id: 'C004-1', title: 'Export current master sheet', done: false },
      { id: 'C004-2', title: 'Map columns to system schema', done: false },
      { id: 'C004-3', title: 'Run import and validate', done: false },
    ],
    comments: [],
    dependencies: [],
  },
  {
    id: 'C005',
    title: 'Speaker Travel & Accommodation Coordination',
    description: 'Coordinate flights, hotels, and on-site logistics for all confirmed speakers',
    department: 'conference',
    status: 'not_started',
    priority: 'high',
    assignees: ['Deepika Rao'],
    dueDate: weeksBeforeEvent(4),
    createdAt: weeksBeforeEvent(12),
    tags: ['speakers', 'logistics', 'travel'],
    subtasks: [],
    comments: [],
    dependencies: ['C001', 'O002'],
  },
  {
    id: 'C006',
    title: 'Awards & Recognition Programme',
    description: 'Finalise award categories, jury, and ceremony runsheet',
    department: 'conference',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Sunita Patel'],
    dueDate: weeksBeforeEvent(5),
    createdAt: weeksBeforeEvent(12),
    tags: ['awards', 'ceremony'],
    subtasks: [],
    comments: [],
    dependencies: ['G001'],
  },
  {
    id: 'C007',
    title: 'Stage Scripts & Runsheets',
    description: 'Prepare MC scripts and minute-by-minute runsheets for all 3 days',
    department: 'conference',
    status: 'not_started',
    priority: 'high',
    assignees: ['Kiran Joshi', 'Sunita Patel'],
    dueDate: weeksBeforeEvent(2),
    createdAt: weeksBeforeEvent(12),
    tags: ['runsheet', 'scripts'],
    subtasks: [],
    comments: [],
    dependencies: ['C002', 'C003', 'C001'],
  },

  // ============ MARKETING ============
  {
    id: 'M001',
    title: 'Brand Identity Refresh for IMC 2026',
    description: 'Update visual identity, colour palette, and design language for 2026',
    department: 'marketing',
    status: 'done',
    priority: 'critical',
    assignees: ['Rahul Gupta', 'Ananya Krishnan'],
    dueDate: weeksBeforeEvent(12),
    createdAt: weeksBeforeEvent(12),
    tags: ['branding', 'design'],
    milestone: true,
    subtasks: [],
    comments: [],
    dependencies: [],
  },
  {
    id: 'M002',
    title: 'Event Website Launch',
    description: 'Go live with IMC 2026 website including agenda, speakers, registration',
    department: 'marketing',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Siddharth Roy', 'Ananya Krishnan'],
    dueDate: weeksBeforeEvent(9),
    createdAt: weeksBeforeEvent(12),
    tags: ['website', 'digital'],
    milestone: true,
    subtasks: [
      { id: 'M002-1', title: 'Home page design and copy', done: true },
      { id: 'M002-2', title: 'Agenda page (placeholder)', done: true },
      { id: 'M002-3', title: 'Registration integration', done: false },
      { id: 'M002-4', title: 'Speaker profiles page', done: false },
      { id: 'M002-5', title: 'QA and go-live', done: false },
    ],
    comments: [
      { id: 'c5', author: 'Siddharth Roy', text: 'Registration form integrated. Testing in staging.', timestamp: weeksBeforeEvent(10) },
    ],
    dependencies: ['M001'],
  },
  {
    id: 'M003',
    title: 'Social Media Campaign — Phase 1 (Save the Date)',
    description: 'Pre-event buzz: save the date, speaker reveals, countdown',
    department: 'marketing',
    status: 'done',
    priority: 'high',
    assignees: ['Ananya Krishnan'],
    dueDate: weeksBeforeEvent(10),
    createdAt: weeksBeforeEvent(12),
    tags: ['social', 'campaign'],
    subtasks: [],
    comments: [],
    dependencies: ['M001'],
  },
  {
    id: 'M004',
    title: 'Physical Collateral Production Brief',
    description: 'Brief design agency on all physical collateral: banners, badges, signage, brochures',
    department: 'marketing',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Rahul Gupta', 'Pooja Nair'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['print', 'agency', 'collateral'],
    subtasks: [
      { id: 'M004-1', title: 'Collateral inventory list finalised', done: true },
      { id: 'M004-2', title: 'Agency brief submitted', done: true },
      { id: 'M004-3', title: 'First proofs review', done: false },
      { id: 'M004-4', title: 'Final approval and send to print', done: false },
    ],
    comments: [],
    dependencies: ['M001', 'O001'],
  },
  {
    id: 'M005',
    title: 'Social Media Campaign — Phase 2 (Speakers & Agenda)',
    description: 'Speaker spotlight posts, agenda reveals, partner announcements',
    department: 'marketing',
    status: 'not_started',
    priority: 'high',
    assignees: ['Ananya Krishnan', 'Pooja Nair'],
    dueDate: weeksBeforeEvent(5),
    createdAt: weeksBeforeEvent(12),
    tags: ['social', 'campaign'],
    subtasks: [],
    comments: [],
    dependencies: ['C001', 'M002'],
  },
  {
    id: 'M006',
    title: 'Email Marketing — Delegate Acquisition',
    description: '4-wave email campaign to drive registrations',
    department: 'marketing',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Siddharth Roy'],
    dueDate: weeksBeforeEvent(3),
    createdAt: weeksBeforeEvent(12),
    tags: ['email', 'registrations'],
    subtasks: [
      { id: 'M006-1', title: 'Wave 1 sent (save the date)', done: true },
      { id: 'M006-2', title: 'Wave 2 sent (agenda reveal)', done: false },
      { id: 'M006-3', title: 'Wave 3 (early bird deadline)', done: false },
      { id: 'M006-4', title: 'Wave 4 (last chance)', done: false },
    ],
    comments: [],
    dependencies: ['M002'],
  },
  {
    id: 'M007',
    title: 'Partner Logo Wall & Branding Assets',
    description: 'Collect partner logos and create co-branded assets for all tiers',
    department: 'marketing',
    status: 'in_progress',
    priority: 'medium',
    assignees: ['Pooja Nair'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['partners', 'branding'],
    subtasks: [],
    comments: [],
    dependencies: ['S001'],
  },
  {
    id: 'M008',
    title: 'On-Ground AV & Stage Design Brief',
    description: 'Brief production agency on stage aesthetics, LED screens, and AV setup',
    department: 'marketing',
    status: 'not_started',
    priority: 'high',
    assignees: ['Rahul Gupta', 'Vishal Thakur'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['AV', 'stage', 'production'],
    subtasks: [],
    comments: [],
    dependencies: ['M001', 'O001'],
  },

  // ============ PR ============
  {
    id: 'P001',
    title: 'Media Partner Agreements',
    description: 'Finalise agreements with print, digital, and TV media partners',
    department: 'pr',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Meera Iyer', 'Vikram Shah'],
    dueDate: weeksBeforeEvent(9),
    createdAt: weeksBeforeEvent(12),
    tags: ['media', 'partnerships'],
    subtasks: [
      { id: 'P001-1', title: 'ET/HT media partner confirmed', done: true },
      { id: 'P001-2', title: 'NDTV/DD media partner', done: false },
      { id: 'P001-3', title: 'Digital media partners (3)', done: false },
    ],
    comments: [],
    dependencies: [],
  },
  {
    id: 'P002',
    title: 'Pre-Event Press Release — Event Announcement',
    description: 'Official press release announcing IMC 2026 dates, theme, and keynotes',
    department: 'pr',
    status: 'done',
    priority: 'high',
    assignees: ['Meera Iyer'],
    dueDate: weeksBeforeEvent(11),
    createdAt: weeksBeforeEvent(12),
    tags: ['press', 'release'],
    subtasks: [],
    comments: [],
    dependencies: [],
  },
  {
    id: 'P003',
    title: 'Speaker & Partner Announcement Press Releases',
    description: 'Series of targeted press releases as key speakers and partners confirmed',
    department: 'pr',
    status: 'in_progress',
    priority: 'medium',
    assignees: ['Vikram Shah', 'Tanvi Desai'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['press', 'release', 'speakers'],
    subtasks: [],
    comments: [],
    dependencies: ['C001', 'S001'],
  },
  {
    id: 'P004',
    title: 'Media Accreditation Process',
    description: 'Set up journalist accreditation portal and manage 200+ media applications',
    department: 'pr',
    status: 'not_started',
    priority: 'high',
    assignees: ['Tanvi Desai'],
    dueDate: weeksBeforeEvent(4),
    createdAt: weeksBeforeEvent(12),
    tags: ['accreditation', 'media'],
    subtasks: [],
    comments: [],
    dependencies: ['O002'],
  },
  {
    id: 'P005',
    title: 'Government Communication Plan',
    description: 'Coordinate messaging strategy with Government Liaison for ministerial statements',
    department: 'pr',
    status: 'blocked',
    priority: 'critical',
    assignees: ['Meera Iyer', 'Anil Srivastava'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['govt', 'comms'],
    subtasks: [],
    comments: [
      { id: 'c6', author: 'Meera Iyer', text: 'Blocked on Ministry approval of key announcement. Anil to escalate.', timestamp: weeksBeforeEvent(8) },
    ],
    dependencies: ['G002'],
    notes: 'Ministry of Electronics needs to sign off on communications before we can announce.',
  },
  {
    id: 'P006',
    title: 'On-Site Press Centre Setup',
    description: 'Coordinate press centre, briefing room, and media lounge with Operations',
    department: 'pr',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Vikram Shah'],
    dueDate: weeksBeforeEvent(2),
    createdAt: weeksBeforeEvent(12),
    tags: ['press', 'on-site', 'logistics'],
    subtasks: [],
    comments: [],
    dependencies: ['O003'],
  },

  // ============ GOVERNMENT LIAISING ============
  {
    id: 'G001',
    title: 'Ministry of Electronics — Inaugural Confirmation',
    description: 'Confirm MeitY Minister for inauguration and Day 1 keynote',
    department: 'govt',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Anil Srivastava', 'Lakshmi Menon'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['MeitY', 'inauguration', 'ministerial'],
    milestone: true,
    subtasks: [
      { id: 'G001-1', title: 'Initial approach letter sent', done: true },
      { id: 'G001-2', title: 'Ministry secretariat meeting', done: true },
      { id: 'G001-3', title: 'Formal confirmation received', done: false },
      { id: 'G001-4', title: 'Protocol and logistics briefing', done: false },
    ],
    comments: [
      { id: 'c7', author: 'Anil Srivastava', text: 'Secretary confirmed minister is available. Waiting for official letter.', timestamp: weeksBeforeEvent(9) },
    ],
    dependencies: [],
    notes: 'Also exploring PMO participation for Day 3 valedictory.',
  },
  {
    id: 'G002',
    title: 'DoT Policy Announcement Coordination',
    description: 'Coordinate with Department of Telecom for potential policy announcements at IMC',
    department: 'govt',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Anil Srivastava'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['DoT', 'policy', 'announcement'],
    subtasks: [],
    comments: [],
    dependencies: ['G001'],
  },
  {
    id: 'G003',
    title: 'State Government Delegations',
    description: 'Coordinate with 5 state CMs / IT Ministers to attend IMC',
    department: 'govt',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Rekha Pandey', 'Suresh Nambiar'],
    dueDate: weeksBeforeEvent(6),
    createdAt: weeksBeforeEvent(12),
    tags: ['state', 'delegations'],
    subtasks: [],
    comments: [],
    dependencies: [],
  },
  {
    id: 'G004',
    title: 'International Delegation Coordination',
    description: 'Coordinate with embassies and trade bodies for international delegations',
    department: 'govt',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Lakshmi Menon'],
    dueDate: weeksBeforeEvent(5),
    createdAt: weeksBeforeEvent(12),
    tags: ['international', 'delegations'],
    subtasks: [],
    comments: [],
    dependencies: ['G001'],
  },
  {
    id: 'G005',
    title: 'Security & Protocol Briefing with CISF/Police',
    description: 'Coordinate security arrangements for VIP delegates with CISF and Delhi Police',
    department: 'govt',
    status: 'not_started',
    priority: 'high',
    assignees: ['Anil Srivastava', 'Vishal Thakur'],
    dueDate: weeksBeforeEvent(3),
    createdAt: weeksBeforeEvent(12),
    tags: ['security', 'VIP', 'protocol'],
    subtasks: [],
    comments: [],
    dependencies: ['G001', 'G003', 'O001'],
  },
  {
    id: 'G006',
    title: 'Official Invitations — Ministerial Letters',
    description: 'Draft and despatch official letters from IMC to all confirmed govt attendees',
    department: 'govt',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Rekha Pandey'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['invitations', 'protocol'],
    subtasks: [],
    comments: [],
    dependencies: ['G001', 'G003'],
  },

  // ============ OPERATIONS ============
  {
    id: 'O001',
    title: 'Venue Layout & Floor Plan Finalisation',
    description: 'Finalise Pragati Maidan hall allocations, floor plans, and zone definitions',
    department: 'operations',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Vishal Thakur', 'Manish Dubey'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['venue', 'layout', 'floor-plan'],
    milestone: true,
    subtasks: [
      { id: 'O001-1', title: 'Hall allocations confirmed with ITPO', done: true },
      { id: 'O001-2', title: 'Exhibition zone layout', done: true },
      { id: 'O001-3', title: 'Conference hall layout', done: false },
      { id: 'O001-4', title: 'Entry/exit and emergency routes', done: false },
      { id: 'O001-5', title: 'Signage plan', done: false },
    ],
    comments: [],
    dependencies: [],
  },
  {
    id: 'O002',
    title: 'Accommodation — Hotel Inventory Block',
    description: 'Block hotel rooms for speakers, VIPs, and delegates near Pragati Maidan',
    department: 'operations',
    status: 'done',
    priority: 'high',
    assignees: ['Geeta Pillai'],
    dueDate: weeksBeforeEvent(10),
    createdAt: weeksBeforeEvent(12),
    tags: ['accommodation', 'hotels'],
    subtasks: [],
    comments: [],
    dependencies: [],
  },
  {
    id: 'O003',
    title: 'Vendor Contracts — AV, Carpentry, Power',
    description: 'Finalise and sign contracts with all core build vendors',
    department: 'operations',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Vishal Thakur', 'Rohit Yadav'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['vendors', 'contracts'],
    milestone: true,
    subtasks: [
      { id: 'O003-1', title: 'AV vendor finalised', done: true },
      { id: 'O003-2', title: 'Carpentry/fabrication vendor', done: true },
      { id: 'O003-3', title: 'Power & electrical vendor', done: false },
      { id: 'O003-4', title: 'Catering vendor shortlist', done: false },
    ],
    comments: [],
    dependencies: ['O001'],
  },
  {
    id: 'O004',
    title: 'Delegate Registration System Setup',
    description: 'Configure badge printing, QR scanning, and check-in kiosk systems',
    department: 'operations',
    status: 'not_started',
    priority: 'high',
    assignees: ['Swati Mishra', 'Manish Dubey'],
    dueDate: weeksBeforeEvent(4),
    createdAt: weeksBeforeEvent(12),
    tags: ['registration', 'badges', 'tech'],
    subtasks: [],
    comments: [],
    dependencies: ['M002', 'O001'],
  },
  {
    id: 'O005',
    title: 'Logistics & Freight — Exhibition Materials',
    description: 'Coordinate inbound and outbound freight for all exhibitor materials',
    department: 'operations',
    status: 'not_started',
    priority: 'high',
    assignees: ['Rohit Yadav'],
    dueDate: weeksBeforeEvent(3),
    createdAt: weeksBeforeEvent(12),
    tags: ['logistics', 'freight', 'exhibition'],
    subtasks: [],
    comments: [],
    dependencies: ['O001', 'O003'],
  },
  {
    id: 'O006',
    title: 'On-Site Team Briefing & Volunteer Onboarding',
    description: 'Brief 150+ on-site staff and volunteers on roles, zones, and escalation paths',
    department: 'operations',
    status: 'not_started',
    priority: 'high',
    assignees: ['Vishal Thakur', 'Swati Mishra'],
    dueDate: weeksBeforeEvent(1),
    createdAt: weeksBeforeEvent(12),
    tags: ['team', 'volunteers', 'briefing'],
    subtasks: [],
    comments: [],
    dependencies: ['O001', 'O003', 'O004'],
  },
  {
    id: 'O007',
    title: 'Day-of Command Centre Setup',
    description: 'Set up central operations command centre with all team leads on walkie-talkies',
    department: 'operations',
    status: 'not_started',
    priority: 'critical',
    assignees: ['Vishal Thakur'],
    dueDate: weeksBeforeEvent(0),
    createdAt: weeksBeforeEvent(12),
    tags: ['event-day', 'command'],
    subtasks: [],
    comments: [],
    dependencies: ['O006', 'G005'],
  },

  // ============ ASPIRE ============
  {
    id: 'A001',
    title: 'Aspire Startup Pod Sales — Wave 1',
    description: 'Sell 80 startup pods to early-stage companies across tech verticals',
    department: 'aspire',
    status: 'in_progress',
    priority: 'critical',
    assignees: ['Divya Kapoor', 'Nikhil Bansal'],
    dueDate: weeksBeforeEvent(8),
    createdAt: weeksBeforeEvent(12),
    tags: ['pods', 'sales', 'startups'],
    milestone: true,
    subtasks: [
      { id: 'A001-1', title: 'Application portal live', done: true },
      { id: 'A001-2', title: '40 pods sold (Wave 1)', done: true },
      { id: 'A001-3', title: 'Outreach to startup ecosystem partners', done: true },
      { id: 'A001-4', title: 'Second 40 pods — Wave 2 push', done: false },
    ],
    comments: [
      { id: 'c8', author: 'Divya Kapoor', text: '47 pods sold so far. Wave 2 outreach underway via NASSCOM and DPIIT.', timestamp: weeksBeforeEvent(9) },
    ],
    dependencies: ['O001'],
  },
  {
    id: 'A002',
    title: 'Startup Selection & Jury Process',
    description: 'Run jury shortlisting for 200+ applications to select 80 pods',
    department: 'aspire',
    status: 'in_progress',
    priority: 'high',
    assignees: ['Shreya Jain', 'Divya Kapoor'],
    dueDate: weeksBeforeEvent(7),
    createdAt: weeksBeforeEvent(12),
    tags: ['selection', 'jury', 'applications'],
    subtasks: [],
    comments: [],
    dependencies: ['A001'],
  },
  {
    id: 'A003',
    title: 'Aspire Zone Layout & Pod Assignment',
    description: 'Assign startup pods within Aspire Zone and share layouts with Operations',
    department: 'aspire',
    status: 'not_started',
    priority: 'high',
    assignees: ['Nikhil Bansal'],
    dueDate: weeksBeforeEvent(5),
    createdAt: weeksBeforeEvent(12),
    tags: ['zone', 'layout', 'pods'],
    subtasks: [],
    comments: [],
    dependencies: ['A002', 'O001'],
  },
  {
    id: 'A004',
    title: 'Startup Onboarding Pack & Portal',
    description: 'Send onboarding documentation, logistics guide, and FAQ to selected startups',
    department: 'aspire',
    status: 'not_started',
    priority: 'high',
    assignees: ['Abhishek Tiwari', 'Shreya Jain'],
    dueDate: weeksBeforeEvent(4),
    createdAt: weeksBeforeEvent(12),
    tags: ['onboarding', 'startups'],
    subtasks: [],
    comments: [],
    dependencies: ['A002', 'A003'],
  },
  {
    id: 'A005',
    title: 'Aspire Pitch Competition — Format & Judges',
    description: 'Finalise pitch competition format, judging panel, and prizes',
    department: 'aspire',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Divya Kapoor'],
    dueDate: weeksBeforeEvent(5),
    createdAt: weeksBeforeEvent(12),
    tags: ['pitch', 'competition', 'judges'],
    subtasks: [],
    comments: [],
    dependencies: ['A002'],
  },
  {
    id: 'A006',
    title: 'Investor Networking Session — Coordination',
    description: 'Organise curated investor-startup matching session during event',
    department: 'aspire',
    status: 'not_started',
    priority: 'medium',
    assignees: ['Nikhil Bansal'],
    dueDate: weeksBeforeEvent(3),
    createdAt: weeksBeforeEvent(12),
    tags: ['investors', 'networking'],
    subtasks: [],
    comments: [],
    dependencies: ['A002', 'C002'],
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

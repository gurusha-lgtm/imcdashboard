export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'not_started' | 'in_progress' | 'blocked' | 'review' | 'done';
export type Department =
  | 'sales'
  | 'conference'
  | 'marketing'
  | 'pr'
  | 'govt_liaison'
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

export interface TeamMember {
  name: string;
  whatsapp: string;
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
  team: TeamMember[];
  description: string;
  icon: string;
}

const EVENT_DATE = '2026-10-07';

function weeksBeforeEvent(weeks: number): string {
  const d = new Date(EVENT_DATE);
  d.setDate(d.getDate() - weeks * 7);
  return d.toISOString().split('T')[0];
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'sales',
    name: 'Sales',
    color: '#2563eb',
    lead: 'Pradeep Prakash',
    members: ['Pradeep Prakash', 'Parul Singh', 'Samit Shukla', 'Lovesh Bhatia', 'Rohit Mehra'],
    team: [
      { name: 'Pradeep Prakash', whatsapp: '+919810001001' },
      { name: 'Parul Singh', whatsapp: '+919810001002' },
      { name: 'Samit Shukla', whatsapp: '+919810001003' },
      { name: 'Lovesh Bhatia', whatsapp: '+919810001004' },
      { name: 'Rohit Mehra', whatsapp: '+919810001005' },
    ],
    description: 'Partnership pipeline, retainer clients, CRM follow-ups',
    icon: 'TrendingUp',
  },
  {
    id: 'conference',
    name: 'Conference Management',
    color: '#7c3aed',
    lead: 'Garima Sharma',
    members: ['Garima Sharma', 'Gurusha Sethi', 'Priyanka Sondhi', 'Ankit Joshi', 'Neha Kapoor'],
    team: [
      { name: 'Garima Sharma', whatsapp: '+919810002001' },
      { name: 'Gurusha Sethi', whatsapp: '+919810002002' },
      { name: 'Priyanka Sondhi', whatsapp: '+919810002003' },
      { name: 'Ankit Joshi', whatsapp: '+919810002004' },
      { name: 'Neha Kapoor', whatsapp: '+919810002005' },
    ],
    description: 'Session planning, speaker coordination, agenda management',
    icon: 'Mic',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    color: '#db2777',
    lead: 'Vipin Kumar',
    members: ['Vipin Kumar', 'Deepika Rao', 'Karan Mehta', 'Sneha Pillai'],
    team: [
      { name: 'Vipin Kumar', whatsapp: '+919810003001' },
      { name: 'Deepika Rao', whatsapp: '+919810003002' },
      { name: 'Karan Mehta', whatsapp: '+919810003003' },
      { name: 'Sneha Pillai', whatsapp: '+919810003004' },
    ],
    description: 'Digital collaterals, physical print, design agency, email campaigns',
    icon: 'Megaphone',
  },
  {
    id: 'pr',
    name: 'PR',
    color: '#0891b2',
    lead: 'Preeti Agarwal',
    members: ['Preeti Agarwal', 'Rahul Srivastava', 'Tanya Khanna', 'Manish Dubey'],
    team: [
      { name: 'Preeti Agarwal', whatsapp: '+919810004001' },
      { name: 'Rahul Srivastava', whatsapp: '+919810004002' },
      { name: 'Tanya Khanna', whatsapp: '+919810004003' },
      { name: 'Manish Dubey', whatsapp: '+919810004004' },
    ],
    description: 'Media relations, press coverage, announcements',
    icon: 'Newspaper',
  },
  {
    id: 'govt_liaison',
    name: 'Government Liaison',
    color: '#059669',
    lead: 'Sudhakaran',
    members: ['Sudhakaran', 'Ritika Nair', 'Vikram Bose', 'Ananya Krishnan'],
    team: [
      { name: 'Sudhakaran', whatsapp: '+919810005001' },
      { name: 'Ritika Nair', whatsapp: '+919810005002' },
      { name: 'Vikram Bose', whatsapp: '+919810005003' },
      { name: 'Ananya Krishnan', whatsapp: '+919810005004' },
    ],
    description: 'Ministry coordination, VIP protocol, government approvals',
    icon: 'Landmark',
  },
  {
    id: 'operations',
    name: 'Operations',
    color: '#dc2626',
    lead: 'Neeraj Singh',
    members: ['Neeraj Singh', 'Rahul Verma', 'Pooja Tiwari', 'Sanjay Bhatt', 'Divya Malhotra'],
    team: [
      { name: 'Neeraj Singh', whatsapp: '+919810006001' },
      { name: 'Rahul Verma', whatsapp: '+919810006002' },
      { name: 'Pooja Tiwari', whatsapp: '+919810006003' },
      { name: 'Sanjay Bhatt', whatsapp: '+919810006004' },
      { name: 'Divya Malhotra', whatsapp: '+919810006005' },
    ],
    description: 'Venue layout, vendor management, on-ground logistics',
    icon: 'Settings',
  },
  {
    id: 'aspire',
    name: 'Aspire',
    color: '#d97706',
    lead: 'Shreya Bansal',
    members: ['Shreya Bansal', 'Kabir Sethi', 'Prachi Goyal', 'Nikhil Agarwal', 'Riya Sharma'],
    team: [
      { name: 'Shreya Bansal', whatsapp: '+919810007001' },
      { name: 'Kabir Sethi', whatsapp: '+919810007002' },
      { name: 'Prachi Goyal', whatsapp: '+919810007003' },
      { name: 'Nikhil Agarwal', whatsapp: '+919810007004' },
      { name: 'Riya Sharma', whatsapp: '+919810007005' },
    ],
    description: 'Startup pod sales, program coordination, startup onboarding',
    icon: 'Rocket',
  },
];

export const TASKS: Task[] = [
  // ======== SALES ========
  {
    id: 'SA001',
    title: 'Retainer Client Renewal Contracts',
    description: 'Process renewal agreements for returning sponsors from IMC 2025',
    department: 'sales', status: 'done', priority: 'critical',
    assignees: ['Parul Singh'],
    dueDate: weeksBeforeEvent(16), createdAt: weeksBeforeEvent(18),
    tags: ['retainer', 'contracts'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'SA002',
    title: 'Platinum Partner Confirmations',
    description: 'Confirm all Platinum tier sponsors, collect signed agreements and advance payments',
    department: 'sales', status: 'in_progress', priority: 'critical',
    assignees: ['Pradeep Prakash', 'Parul Singh'],
    dueDate: weeksBeforeEvent(10), createdAt: weeksBeforeEvent(18),
    tags: ['platinum', 'partnerships'], milestone: true,
    subtasks: [
      { id: 'SA002-1', title: 'Send contracts to confirmed Platinum partners', done: true },
      { id: 'SA002-2', title: 'Collect signed agreements (8/12)', done: true },
      { id: 'SA002-3', title: 'Follow up with remaining 4 partners', done: false },
      { id: 'SA002-4', title: 'Update CRM with final status', done: false },
    ],
    comments: [
      { id: 'c1', author: 'Pradeep Prakash', text: 'Reliance and Airtel confirmed. 4 still pending.', timestamp: weeksBeforeEvent(13) },
      { id: 'c2', author: 'Parul Singh', text: 'Following up with Samsung and Nokia this week.', timestamp: weeksBeforeEvent(12) },
    ],
    dependencies: [],
    notes: 'Retainer clients from IMC 2025 auto-confirmed. New Platinum additions pending legal review.',
  },
  {
    id: 'SA003',
    title: 'Sponsorship Deck Refresh',
    description: 'Update sponsorship deck with IMC 2026 theme, new packages, and 2025 event stats',
    department: 'sales', status: 'review', priority: 'high',
    assignees: ['Lovesh Bhatia'],
    dueDate: weeksBeforeEvent(11), createdAt: weeksBeforeEvent(18),
    tags: ['deck', 'collateral'],
    subtasks: [
      { id: 'SA003-1', title: 'Gather IMC 2025 event metrics', done: true },
      { id: 'SA003-2', title: 'Update package pricing and tiers', done: true },
      { id: 'SA003-3', title: 'Design review with Vipin Kumar', done: false },
    ],
    comments: [
      { id: 'c3', author: 'Lovesh Bhatia', text: 'Draft done. Sent to Vipin for design review.', timestamp: weeksBeforeEvent(12) },
    ],
    dependencies: ['MK001'],
  },
  {
    id: 'SA004',
    title: 'Partnership Tier Benefits Sign-off',
    description: 'Lock in deliverables for each sponsorship tier — sessions, branding, booth allocation',
    department: 'sales', status: 'done', priority: 'critical',
    assignees: ['Pradeep Prakash'],
    dueDate: weeksBeforeEvent(16), createdAt: weeksBeforeEvent(18),
    tags: ['tiers', 'benefits'], subtasks: [], comments: [], dependencies: [],
    notes: 'Aligned with Conference team on session allocation per tier.',
  },
  {
    id: 'SA005',
    title: 'Gold Partner Outreach — Wave 2',
    description: 'Second wave of email and call outreach to 20 remaining Gold tier prospects',
    department: 'sales', status: 'in_progress', priority: 'high',
    assignees: ['Samit Shukla', 'Lovesh Bhatia'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['gold', 'outreach'],
    subtasks: [
      { id: 'SA005-1', title: 'Wave 1 sent — 20 contacts', done: true },
      { id: 'SA005-2', title: 'Wave 2 calls scheduled', done: true },
      { id: 'SA005-3', title: 'Follow-up emails to hot leads', done: false },
      { id: 'SA005-4', title: 'CRM updated with outcomes', done: false },
    ],
    comments: [],
    dependencies: [],
  },
  {
    id: 'SA006',
    title: 'CRM Pipeline Cleanup and Deal Tagging',
    description: 'Clean up HubSpot pipeline, tag deals by tier and stage, remove dead leads',
    department: 'sales', status: 'in_progress', priority: 'medium',
    assignees: ['Rohit Mehra'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['CRM', 'pipeline'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'SA007',
    title: 'Platinum Partner Advance Payment Collection',
    description: 'Collect first tranche payments from confirmed Platinum partners per contract terms',
    department: 'sales', status: 'in_progress', priority: 'critical',
    assignees: ['Parul Singh'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['payments', 'platinum'],
    subtasks: [
      { id: 'SA007-1', title: 'Issue advance invoices', done: true },
      { id: 'SA007-2', title: 'Follow up with accounts teams', done: true },
      { id: 'SA007-3', title: 'Confirm 8/12 payments received', done: false },
    ],
    comments: [
      { id: 'c4', author: 'Parul Singh', text: '6 of 12 payments received. Chasing 6 more.', timestamp: weeksBeforeEvent(11) },
    ],
    dependencies: ['SA002'],
  },
  {
    id: 'SA008',
    title: 'Silver and Associate Partner Closures',
    description: 'Close remaining Silver and Associate sponsorship slots before cutoff',
    department: 'sales', status: 'not_started', priority: 'medium',
    assignees: ['Samit Shukla'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['silver', 'associate'], subtasks: [], comments: [], dependencies: ['SA005'],
  },
  {
    id: 'SA009',
    title: 'Partner Lounge Allocation Per Tier',
    description: 'Assign lounge zones, meeting rooms, and networking areas to sponsors by tier',
    department: 'sales', status: 'not_started', priority: 'high',
    assignees: ['Pradeep Prakash'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['partners', 'venue'], subtasks: [], comments: [], dependencies: ['SA004', 'OP001'],
  },
  {
    id: 'SA010',
    title: 'On-Site Branding Handover to Ops',
    description: 'Hand over final partner logo assets and branding specs to Operations team',
    department: 'sales', status: 'not_started', priority: 'high',
    assignees: ['Parul Singh'],
    dueDate: weeksBeforeEvent(4), createdAt: weeksBeforeEvent(18),
    tags: ['branding', 'handover'], subtasks: [], comments: [], dependencies: ['SA002', 'MK001'],
  },
  {
    id: 'SA011',
    title: 'Partner Welcome Kit Design Brief',
    description: 'Brief Marketing on design for partner welcome kits, badges, and onboarding materials',
    department: 'sales', status: 'not_started', priority: 'medium',
    assignees: ['Lovesh Bhatia'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['welcome kit', 'collateral'], subtasks: [], comments: [], dependencies: ['SA004'],
  },
  {
    id: 'SA012',
    title: 'Sponsor Hospitality and Gifts Planning',
    description: 'Plan VIP hospitality, speaker gifts, and partner appreciation tokens for Oct 7–10',
    department: 'sales', status: 'not_started', priority: 'medium',
    assignees: ['Rohit Mehra'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['hospitality', 'gifts'], subtasks: [], comments: [], dependencies: [],
  },

  // ======== CONFERENCE MANAGEMENT ========
  {
    id: 'CM001',
    title: 'Keynote Speaker Confirmations — All 4 Days',
    description: 'Confirm keynote speakers for main stage across all 4 event days (Oct 7–10)',
    department: 'conference', status: 'in_progress', priority: 'critical',
    assignees: ['Garima Sharma', 'Gurusha Sethi'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['keynote', 'speakers'], milestone: true,
    subtasks: [
      { id: 'CM001-1', title: 'Day 1 keynote confirmed (DoT Minister)', done: true },
      { id: 'CM001-2', title: 'Day 2 keynote confirmed (Industry CEO)', done: true },
      { id: 'CM001-3', title: 'Day 3 keynote — awaiting PMO confirmation', done: false },
      { id: 'CM001-4', title: 'Day 4 valedictory speaker locked', done: false },
      { id: 'CM001-5', title: 'Speaker briefs and logistics info sent', done: false },
    ],
    comments: [
      { id: 'c5', author: 'Garima Sharma', text: 'DoT minister confirmed Day 1. PMO response still pending for Day 3.', timestamp: weeksBeforeEvent(11) },
    ],
    dependencies: ['GL001'],
    notes: 'Day 3 keynote contingent on Government Liaison confirming ministerial availability.',
  },
  {
    id: 'CM002',
    title: 'Track 1 Agenda — 5G & Connectivity',
    description: 'Build complete 4-day session agenda for Track 1',
    department: 'conference', status: 'in_progress', priority: 'high',
    assignees: ['Gurusha Sethi'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['agenda', '5G', 'track1'],
    subtasks: [
      { id: 'CM002-1', title: 'Map partner sessions to Track 1', done: true },
      { id: 'CM002-2', title: 'Fill remaining slots with industry speakers', done: false },
      { id: 'CM002-3', title: 'Confirm panel moderators', done: false },
    ],
    comments: [], dependencies: ['SA002', 'SA004'],
  },
  {
    id: 'CM003',
    title: 'Track 2 Agenda — AI & Deep Tech',
    description: 'Build 4-day session agenda for Track 2',
    department: 'conference', status: 'not_started', priority: 'high',
    assignees: ['Gurusha Sethi'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['agenda', 'AI', 'track2'], subtasks: [], comments: [], dependencies: ['CM002'],
  },
  {
    id: 'CM004',
    title: 'Track 3 Agenda — Cybersecurity & Cloud',
    description: 'Build 4-day session agenda for Track 3',
    department: 'conference', status: 'not_started', priority: 'medium',
    assignees: ['Ankit Joshi'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['agenda', 'cybersecurity', 'track3'], subtasks: [], comments: [], dependencies: ['CM002'],
  },
  {
    id: 'CM005',
    title: 'Speaker Confirmation Round 2 — Follow-ups',
    description: 'Follow up with all speakers who haven\'t confirmed yet — CEOs, startup founders, regulators',
    department: 'conference', status: 'in_progress', priority: 'critical',
    assignees: ['Garima Sharma'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['speakers', 'follow-up'],
    subtasks: [
      { id: 'CM005-1', title: 'Send reminder emails to 15 pending speakers', done: true },
      { id: 'CM005-2', title: 'Personal calls to top 5 priority speakers', done: false },
      { id: 'CM005-3', title: 'Update speaker tracker', done: false },
    ],
    comments: [
      { id: 'c6', author: 'Garima Sharma', text: '8 of 15 responded positively. Still chasing 7.', timestamp: weeksBeforeEvent(10) },
    ],
    dependencies: [],
  },
  {
    id: 'CM006',
    title: 'Speaker AV & Tech Requirements Collection',
    description: 'Collect slide format, mic preference, screen layout, and AV requirements from all speakers',
    department: 'conference', status: 'not_started', priority: 'high',
    assignees: ['Ankit Joshi'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['speakers', 'AV', 'tech'], subtasks: [], comments: [], dependencies: ['CM001'],
  },
  {
    id: 'CM007',
    title: 'Session Moderator Assignments',
    description: 'Assign moderators to every panel and fireside chat across all 3 tracks',
    department: 'conference', status: 'not_started', priority: 'high',
    assignees: ['Neha Kapoor'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['moderators', 'sessions'], subtasks: [], comments: [], dependencies: ['CM002', 'CM003'],
  },
  {
    id: 'CM008',
    title: 'Speaker Travel & Accommodation',
    description: 'Coordinate flights, hotel stays, and on-site logistics for all confirmed speakers',
    department: 'conference', status: 'not_started', priority: 'high',
    assignees: ['Gurusha Sethi'],
    dueDate: weeksBeforeEvent(4), createdAt: weeksBeforeEvent(18),
    tags: ['speakers', 'travel', 'logistics'], subtasks: [], comments: [], dependencies: ['CM001'],
  },
  {
    id: 'CM009',
    title: 'Stage Scripts & Runsheets — All 4 Days',
    description: 'Prepare MC scripts and minute-by-minute runsheets for Oct 7–10',
    department: 'conference', status: 'not_started', priority: 'high',
    assignees: ['Garima Sharma', 'Gurusha Sethi'],
    dueDate: weeksBeforeEvent(2), createdAt: weeksBeforeEvent(18),
    tags: ['runsheet', 'scripts'], subtasks: [], comments: [], dependencies: ['CM001', 'CM002', 'CM003'],
  },
  {
    id: 'CM010',
    title: 'Awards Programme — Categories & Jury',
    description: 'Finalise award categories, select jury panel, and plan ceremony runsheet',
    department: 'conference', status: 'not_started', priority: 'medium',
    assignees: ['Garima Sharma'],
    dueDate: weeksBeforeEvent(5), createdAt: weeksBeforeEvent(18),
    tags: ['awards', 'ceremony'], subtasks: [], comments: [], dependencies: ['GL001'],
  },
  {
    id: 'CM011',
    title: 'Pre-Event Speaker Briefing Notes',
    description: 'Send briefing documents to all speakers covering logistics, theme, audience, and session context',
    department: 'conference', status: 'not_started', priority: 'medium',
    assignees: ['Neha Kapoor'],
    dueDate: weeksBeforeEvent(3), createdAt: weeksBeforeEvent(18),
    tags: ['speakers', 'briefing'], subtasks: [], comments: [], dependencies: ['CM001'],
  },
  {
    id: 'CM012',
    title: 'Session Recording & Livestream Plan',
    description: 'Plan which sessions are recorded, which are livestreamed, and brief production vendor',
    department: 'conference', status: 'not_started', priority: 'medium',
    assignees: ['Ankit Joshi'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['livestream', 'recording'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'CM013',
    title: 'Delegate Networking Session Design',
    description: 'Design and schedule structured networking sessions for delegates between tracks',
    department: 'conference', status: 'not_started', priority: 'medium',
    assignees: ['Priyanka Sondhi'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['networking', 'delegates'], subtasks: [], comments: [], dependencies: [],
  },

  // ======== MARKETING ========
  {
    id: 'MK001',
    title: 'IMC 2026 Brand Identity Finalized',
    description: 'Visual identity, theme, colour palette and design language locked',
    department: 'marketing', status: 'done', priority: 'critical',
    assignees: ['Vipin Kumar'],
    dueDate: weeksBeforeEvent(16), createdAt: weeksBeforeEvent(18),
    tags: ['branding', 'design', 'theme'], milestone: true,
    subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'MK002',
    title: 'Event Website — Go Live',
    description: 'Launch IMC 2026 website with agenda, speakers, and delegate registration',
    department: 'marketing', status: 'in_progress', priority: 'critical',
    assignees: ['Vipin Kumar', 'Karan Mehta'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['website', 'digital'], milestone: true,
    subtasks: [
      { id: 'MK002-1', title: 'Home page design and copy', done: true },
      { id: 'MK002-2', title: 'Agenda page (placeholder)', done: true },
      { id: 'MK002-3', title: 'Registration flow integration', done: false },
      { id: 'MK002-4', title: 'Speaker profiles page', done: false },
      { id: 'MK002-5', title: 'QA and go-live', done: false },
    ],
    comments: [
      { id: 'c7', author: 'Karan Mehta', text: 'Registration backend needs API from Ops. Blocked until OP007 is scoped.', timestamp: weeksBeforeEvent(12) },
    ],
    dependencies: ['MK001'],
  },
  {
    id: 'MK003',
    title: 'Physical Collateral — Print Brief to Agency',
    description: 'Brief design agency on banners, signage, badges, brochures for Yashobhoomi',
    department: 'marketing', status: 'in_progress', priority: 'high',
    assignees: ['Deepika Rao'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['print', 'agency', 'signage'],
    subtasks: [
      { id: 'MK003-1', title: 'Collateral inventory list prepared', done: true },
      { id: 'MK003-2', title: 'Agency brief submitted', done: true },
      { id: 'MK003-3', title: 'First proofs review', done: false },
      { id: 'MK003-4', title: 'Final approval and send to print', done: false },
    ],
    comments: [], dependencies: ['MK001'],
  },
  {
    id: 'MK004',
    title: 'Partner Logo Wall & Co-branded Assets',
    description: 'Collect all sponsor logos and produce co-branded assets per tier',
    department: 'marketing', status: 'in_progress', priority: 'medium',
    assignees: ['Deepika Rao'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['logos', 'branding', 'partners'], subtasks: [], comments: [], dependencies: ['SA002'],
  },
  {
    id: 'MK005',
    title: 'AV & Stage Design Brief to Production Agency',
    description: 'Brief production agency on main stage aesthetics, LED screens, and AV at Yashobhoomi',
    department: 'marketing', status: 'not_started', priority: 'high',
    assignees: ['Vipin Kumar'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['AV', 'stage', 'production'], subtasks: [], comments: [], dependencies: ['MK001'],
  },
  {
    id: 'MK006',
    title: 'Save-the-Date Email Campaign',
    description: 'Send save-the-date emails to all 2025 attendees and prospect database',
    department: 'marketing', status: 'done', priority: 'high',
    assignees: ['Karan Mehta'],
    dueDate: weeksBeforeEvent(15), createdAt: weeksBeforeEvent(18),
    tags: ['email', 'campaign'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'MK007',
    title: 'Social Media Content Calendar — Pre-Event',
    description: 'Plan and schedule all pre-event social posts — speaker reveals, countdowns, partner announcements',
    department: 'marketing', status: 'in_progress', priority: 'high',
    assignees: ['Sneha Pillai'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['social media', 'content'],
    subtasks: [
      { id: 'MK007-1', title: 'Save-the-date posts published', done: true },
      { id: 'MK007-2', title: 'Speaker reveal series planned', done: true },
      { id: 'MK007-3', title: 'Partner announcement posts scheduled', done: false },
      { id: 'MK007-4', title: 'Countdown posts (4 weeks out)', done: false },
    ],
    comments: [
      { id: 'c8', author: 'Sneha Pillai', text: 'Save the date engagement 2.4x vs last year. Speaker reveals performing well.', timestamp: weeksBeforeEvent(11) },
    ],
    dependencies: ['MK001'],
  },
  {
    id: 'MK008',
    title: 'Digital Banner Set for All Platforms',
    description: 'Create digital banner assets for website, LinkedIn, Twitter/X, email headers',
    department: 'marketing', status: 'in_progress', priority: 'high',
    assignees: ['Deepika Rao'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['digital', 'banners', 'design'], subtasks: [], comments: [], dependencies: ['MK001'],
  },
  {
    id: 'MK009',
    title: 'Delegate Registration Page Design',
    description: 'Design the registration flow UX — form, confirmation email, and badge preview',
    department: 'marketing', status: 'in_progress', priority: 'high',
    assignees: ['Karan Mehta'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['registration', 'UX', 'design'], subtasks: [], comments: [], dependencies: ['MK001'],
  },
  {
    id: 'MK010',
    title: 'Photography & Videography Brief',
    description: 'Brief photo/video vendor on shot list, coverage zones, and deliverables for Oct 7–10',
    department: 'marketing', status: 'not_started', priority: 'medium',
    assignees: ['Sneha Pillai'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['photography', 'video'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'MK011',
    title: 'Event App UI Design',
    description: 'Design mobile app screens — agenda, speaker profiles, networking, floor map',
    department: 'marketing', status: 'not_started', priority: 'medium',
    assignees: ['Karan Mehta'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['app', 'UI', 'design'], subtasks: [], comments: [], dependencies: ['MK001'],
  },
  {
    id: 'MK012',
    title: 'IMC 2026 Explainer Video Brief',
    description: 'Brief video production house on 90-second event promo video for social and website',
    department: 'marketing', status: 'not_started', priority: 'medium',
    assignees: ['Vipin Kumar'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['video', 'promo'], subtasks: [], comments: [], dependencies: ['MK001'],
  },

  // ======== PR ========
  {
    id: 'PB001',
    title: 'Press Release — IMC 2026 Launch',
    description: 'Draft and distribute press release announcing IMC 2026 dates, theme, and key highlights',
    department: 'pr', status: 'done', priority: 'critical',
    assignees: ['Preeti Agarwal'],
    dueDate: weeksBeforeEvent(16), createdAt: weeksBeforeEvent(18),
    tags: ['press release', 'launch'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'PB002',
    title: 'Media Accreditation List',
    description: 'Compile and vet list of journalists, media houses, and publications for press passes',
    department: 'pr', status: 'in_progress', priority: 'high',
    assignees: ['Rahul Srivastava'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['media', 'accreditation'],
    subtasks: [
      { id: 'PB002-1', title: 'Pull list from IMC 2025 database', done: true },
      { id: 'PB002-2', title: 'Add new outlets and freelancers', done: true },
      { id: 'PB002-3', title: 'Vet list with editorial team', done: false },
    ],
    comments: [], dependencies: [],
  },
  {
    id: 'PB003',
    title: 'Press Kit Preparation',
    description: 'Assemble press kit: event overview, speaker bios, sponsor logos, key stats, brand assets',
    department: 'pr', status: 'in_progress', priority: 'high',
    assignees: ['Tanya Khanna'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['press kit', 'media'],
    subtasks: [
      { id: 'PB003-1', title: 'Event fact sheet drafted', done: true },
      { id: 'PB003-2', title: 'Speaker bios collected', done: false },
      { id: 'PB003-3', title: 'Brand assets from Marketing', done: false },
    ],
    comments: [], dependencies: ['MK001'],
  },
  {
    id: 'PB004',
    title: 'Speaker Announcement Media Series',
    description: 'Coordinated media outreach and social posts announcing keynote and track speakers',
    department: 'pr', status: 'in_progress', priority: 'high',
    assignees: ['Preeti Agarwal'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['speakers', 'announcements', 'media'], subtasks: [], comments: [],
    dependencies: ['CM001'],
  },
  {
    id: 'PB005',
    title: 'Partner Announcement Press Coverage',
    description: 'Pitch partner announcements to tech and business media for placement',
    department: 'pr', status: 'in_progress', priority: 'medium',
    assignees: ['Manish Dubey'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['partners', 'press', 'media'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'PB006',
    title: 'Journalist Guest List Finalization',
    description: 'Finalize confirmed journalist attendees, assign zones, and coordinate press badges',
    department: 'pr', status: 'not_started', priority: 'high',
    assignees: ['Rahul Srivastava'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['journalists', 'guests'], subtasks: [], comments: [], dependencies: ['PB002'],
  },
  {
    id: 'PB007',
    title: 'Press Conference Planning — Day 1',
    description: 'Organise dedicated press conference slot on Day 1 post-inauguration',
    department: 'pr', status: 'not_started', priority: 'critical',
    assignees: ['Preeti Agarwal'],
    dueDate: weeksBeforeEvent(4), createdAt: weeksBeforeEvent(18),
    tags: ['press conference', 'day1'], subtasks: [], comments: [], dependencies: ['GL001'],
  },
  {
    id: 'PB008',
    title: 'Live Social Media Coverage Plan',
    description: 'Plan real-time social coverage during the event — Twitter X, LinkedIn, Instagram',
    department: 'pr', status: 'not_started', priority: 'medium',
    assignees: ['Tanya Khanna'],
    dueDate: weeksBeforeEvent(5), createdAt: weeksBeforeEvent(18),
    tags: ['social media', 'live coverage'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'PB009',
    title: 'Influencer & Blogger Invite List',
    description: 'Identify and invite tech influencers and bloggers for complimentary passes',
    department: 'pr', status: 'not_started', priority: 'medium',
    assignees: ['Manish Dubey'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['influencers', 'bloggers'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'PB010',
    title: 'Media Monitoring Dashboard Setup',
    description: 'Set up Meltwater / Cision tracking for IMC 2026 mentions across print, digital, and social',
    department: 'pr', status: 'not_started', priority: 'medium',
    assignees: ['Rahul Srivastava'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['monitoring', 'media'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'PB011',
    title: 'Post-Event Press Release Drafts',
    description: 'Draft post-event press releases covering key announcements, policy launches, and highlights',
    department: 'pr', status: 'not_started', priority: 'medium',
    assignees: ['Tanya Khanna'],
    dueDate: weeksBeforeEvent(1), createdAt: weeksBeforeEvent(18),
    tags: ['press release', 'post-event'], subtasks: [], comments: [], dependencies: [],
  },

  // ======== GOVERNMENT LIAISON ========
  {
    id: 'GL001',
    title: 'MeitY Minister — Inauguration Confirmation',
    description: 'Confirm Minister of Electronics & IT for Day 1 inauguration at Yashobhoomi',
    department: 'govt_liaison', status: 'in_progress', priority: 'critical',
    assignees: ['Sudhakaran'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['MeitY', 'inauguration', 'ministerial'], milestone: true,
    subtasks: [
      { id: 'GL001-1', title: 'Initial approach letter sent', done: true },
      { id: 'GL001-2', title: 'Ministry secretariat meeting done', done: true },
      { id: 'GL001-3', title: 'Formal confirmation letter received', done: false },
      { id: 'GL001-4', title: 'Protocol and logistics briefing', done: false },
    ],
    comments: [
      { id: 'c9', author: 'Sudhakaran', text: 'Secretary confirmed minister is available Oct 7. Awaiting official letter from PS.', timestamp: weeksBeforeEvent(10) },
    ],
    dependencies: [],
    notes: 'Also pursuing PMO participation for Day 4 valedictory. P. Ramakrishna to send personal letter.',
  },
  {
    id: 'GL002',
    title: 'DoT Approval Letter for Event Hosting',
    description: 'Obtain formal approval letter from Department of Telecom for IMC 2026 at Yashobhoomi',
    department: 'govt_liaison', status: 'in_progress', priority: 'critical',
    assignees: ['Sudhakaran'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['DoT', 'approval', 'letter'],
    subtasks: [
      { id: 'GL002-1', title: 'Application submitted', done: true },
      { id: 'GL002-2', title: 'File number received', done: true },
      { id: 'GL002-3', title: 'Follow-up with JS office', done: false },
    ],
    comments: [], dependencies: [],
  },
  {
    id: 'GL003',
    title: 'DoT 6G Policy Announcement Coordination',
    description: 'Coordinate with DoT for potential 6G/spectrum policy announcement at IMC 2026',
    department: 'govt_liaison', status: 'in_progress', priority: 'critical',
    assignees: ['Vikram Bose'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['DoT', 'policy', '6G'],
    subtasks: [], comments: [], dependencies: ['GL001'],
    notes: 'Highly sensitive — coordinate messaging with Conference team before any public communication.',
  },
  {
    id: 'GL004',
    title: 'State Government Delegations — 5 States',
    description: 'Coordinate with IT Ministers and CMOs across 5 states to attend IMC 2026',
    department: 'govt_liaison', status: 'in_progress', priority: 'high',
    assignees: ['Ritika Nair'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['state', 'delegations'],
    subtasks: [
      { id: 'GL004-1', title: 'Target states identified: MH, KA, TN, TS, UP', done: true },
      { id: 'GL004-2', title: 'CMO outreach letters sent', done: true },
      { id: 'GL004-3', title: 'Follow-up calls with state secretariats', done: false },
    ],
    comments: [], dependencies: [],
  },
  {
    id: 'GL005',
    title: 'Official Ministerial Invitation Letters',
    description: 'Draft and despatch formal invitation letters to all confirmed government attendees',
    department: 'govt_liaison', status: 'in_progress', priority: 'high',
    assignees: ['Ananya Krishnan'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['invitations', 'protocol'], subtasks: [], comments: [], dependencies: ['GL001'],
  },
  {
    id: 'GL006',
    title: 'PMO Participation — Day 4 Valedictory',
    description: 'Pursue PMO office for senior participation at Day 4 valedictory and closing ceremony',
    department: 'govt_liaison', status: 'in_progress', priority: 'critical',
    assignees: ['Sudhakaran'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['PMO', 'valedictory'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'GL007',
    title: 'VIP Security & Protocol — CISF Briefing',
    description: 'Coordinate VIP security with CISF and Delhi Police for Yashobhoomi entry and zones',
    department: 'govt_liaison', status: 'not_started', priority: 'high',
    assignees: ['Vikram Bose'],
    dueDate: weeksBeforeEvent(3), createdAt: weeksBeforeEvent(18),
    tags: ['security', 'CISF', 'VIP'], subtasks: [], comments: [], dependencies: ['GL001', 'GL004'],
  },
  {
    id: 'GL008',
    title: 'International Delegations — Embassy Coordination',
    description: 'Coordinate with embassies and trade bodies for international government delegations',
    department: 'govt_liaison', status: 'not_started', priority: 'medium',
    assignees: ['Ananya Krishnan'],
    dueDate: weeksBeforeEvent(5), createdAt: weeksBeforeEvent(18),
    tags: ['international', 'embassy'], subtasks: [], comments: [], dependencies: ['GL001'],
  },
  {
    id: 'GL009',
    title: 'Government Delegation Briefing Document',
    description: 'Prepare briefing document for all state and central government delegations attending',
    department: 'govt_liaison', status: 'not_started', priority: 'medium',
    assignees: ['Ritika Nair'],
    dueDate: weeksBeforeEvent(4), createdAt: weeksBeforeEvent(18),
    tags: ['briefing', 'delegations'], subtasks: [], comments: [], dependencies: ['GL004'],
  },
  {
    id: 'GL010',
    title: 'VIP Lounge Protocol Guide',
    description: 'Prepare VIP lounge access rules, seating protocol, and hospitality guide',
    department: 'govt_liaison', status: 'not_started', priority: 'high',
    assignees: ['Ananya Krishnan'],
    dueDate: weeksBeforeEvent(3), createdAt: weeksBeforeEvent(18),
    tags: ['VIP', 'protocol', 'lounge'], subtasks: [], comments: [], dependencies: ['GL001'],
  },
  {
    id: 'GL011',
    title: 'Security Clearance List — Speakers & Press',
    description: 'Submit final list of international speakers and press to CISF for background clearance',
    department: 'govt_liaison', status: 'not_started', priority: 'high',
    assignees: ['Vikram Bose'],
    dueDate: weeksBeforeEvent(4), createdAt: weeksBeforeEvent(18),
    tags: ['security', 'clearance'], subtasks: [], comments: [], dependencies: ['CM001'],
  },

  // ======== OPERATIONS ========
  {
    id: 'OP001',
    title: 'Venue Layout & Floor Plan — Yashobhoomi',
    description: 'Finalise IICC Yashobhoomi hall allocations, floor plans, zone definitions',
    department: 'operations', status: 'in_progress', priority: 'critical',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['venue', 'floor plan', 'Yashobhoomi'], milestone: true,
    subtasks: [
      { id: 'OP001-1', title: 'Hall allocations confirmed with IICC', done: true },
      { id: 'OP001-2', title: 'Exhibition zone layout', done: true },
      { id: 'OP001-3', title: 'Conference hall layout', done: false },
      { id: 'OP001-4', title: 'Entry/exit and emergency routes', done: false },
    ],
    comments: [
      { id: 'c10', author: 'Neeraj Singh', text: 'IICC confirmed halls D, E, F for exhibition. Conference halls still to allocate.', timestamp: weeksBeforeEvent(12) },
    ],
    dependencies: [],
  },
  {
    id: 'OP002',
    title: 'Vendor Contracts — AV, Fabrication, Power',
    description: 'Finalise and sign contracts with all core build vendors at Yashobhoomi',
    department: 'operations', status: 'in_progress', priority: 'critical',
    assignees: ['Neeraj Singh', 'Sanjay Bhatt'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['vendors', 'contracts'], milestone: true,
    subtasks: [
      { id: 'OP002-1', title: 'AV vendor finalised', done: true },
      { id: 'OP002-2', title: 'Fabrication and carpentry vendor', done: true },
      { id: 'OP002-3', title: 'Power and electrical vendor', done: false },
      { id: 'OP002-4', title: 'Catering vendor shortlist and negotiation', done: false },
    ],
    comments: [], dependencies: [],
  },
  {
    id: 'OP003',
    title: 'Catering & F&B Vendor Finalization',
    description: 'Finalize catering partner for all 4 days — meals, tea breaks, cocktail reception',
    department: 'operations', status: 'in_progress', priority: 'high',
    assignees: ['Pooja Tiwari'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['catering', 'F&B', 'vendor'],
    subtasks: [
      { id: 'OP003-1', title: 'RFP sent to 4 caterers', done: true },
      { id: 'OP003-2', title: 'Tastings scheduled', done: false },
      { id: 'OP003-3', title: 'Contract signed', done: false },
    ],
    comments: [], dependencies: [],
  },
  {
    id: 'OP004',
    title: 'Event Budget vs Actuals Review',
    description: 'Monthly budget reconciliation — flag overruns, reforecast where needed',
    department: 'operations', status: 'in_progress', priority: 'high',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(2), createdAt: weeksBeforeEvent(18),
    tags: ['budget', 'finance'],
    subtasks: [], comments: [
      { id: 'c11', author: 'Neeraj Singh', text: 'Production costs 12% over forecast. Raised with Pradeep and CEO.', timestamp: weeksBeforeEvent(9) },
    ],
    dependencies: [],
  },
  {
    id: 'OP005',
    title: 'Hotel Room Block — Speakers & VIPs',
    description: 'Negotiate and block hotel rooms at Aerocity/CP for speakers, ministers, and VIP guests',
    department: 'operations', status: 'in_progress', priority: 'high',
    assignees: ['Divya Malhotra'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['hotel', 'accommodation', 'VIP'], subtasks: [], comments: [], dependencies: ['CM001'],
  },
  {
    id: 'OP006',
    title: 'Startup Pod Floor Map — with Aspire',
    description: 'Coordinate startup pod layout with Aspire team, assign booths per company',
    department: 'operations', status: 'not_started', priority: 'critical',
    assignees: ['Sanjay Bhatt'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['startup pods', 'floor map'], subtasks: [], comments: [], dependencies: ['OP001', 'AS001'],
  },
  {
    id: 'OP007',
    title: 'Delegate Registration System Setup',
    description: 'Configure badge printing, QR scanning, and check-in kiosk system for 10,000+ delegates',
    department: 'operations', status: 'not_started', priority: 'high',
    assignees: ['Rahul Verma'],
    dueDate: weeksBeforeEvent(4), createdAt: weeksBeforeEvent(18),
    tags: ['registration', 'badges', 'QR'], subtasks: [], comments: [], dependencies: ['MK002', 'OP001'],
  },
  {
    id: 'OP008',
    title: 'WiFi & Networking Infrastructure Plan',
    description: 'Plan enterprise WiFi coverage for all halls — delegates, exhibitors, press, VIP zones',
    department: 'operations', status: 'not_started', priority: 'high',
    assignees: ['Rahul Verma'],
    dueDate: weeksBeforeEvent(6), createdAt: weeksBeforeEvent(18),
    tags: ['WiFi', 'networking', 'tech'], subtasks: [], comments: [], dependencies: ['OP001'],
  },
  {
    id: 'OP009',
    title: 'Emergency Exit & Safety Drill Plan',
    description: 'Plan emergency evacuation routes, fire safety drill, and first aid station positions',
    department: 'operations', status: 'not_started', priority: 'critical',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(5), createdAt: weeksBeforeEvent(18),
    tags: ['safety', 'emergency', 'drill'], subtasks: [], comments: [], dependencies: ['OP001'],
  },
  {
    id: 'OP010',
    title: 'Shuttle & Transport Logistics Plan',
    description: 'Plan shuttle routes between Aerocity hotels and Yashobhoomi for speakers and VIPs',
    department: 'operations', status: 'not_started', priority: 'medium',
    assignees: ['Pooja Tiwari'],
    dueDate: weeksBeforeEvent(5), createdAt: weeksBeforeEvent(18),
    tags: ['transport', 'shuttle', 'logistics'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'OP011',
    title: 'On-Site Signage Placement Plan',
    description: 'Map all directional and sponsor signage placements across Yashobhoomi halls',
    department: 'operations', status: 'not_started', priority: 'medium',
    assignees: ['Divya Malhotra'],
    dueDate: weeksBeforeEvent(4), createdAt: weeksBeforeEvent(18),
    tags: ['signage', 'wayfinding'], subtasks: [], comments: [], dependencies: ['MK003'],
  },
  {
    id: 'OP012',
    title: 'On-Site Staff & Volunteer Briefing',
    description: 'Brief 150+ on-site staff and volunteers on roles, zones, and escalation protocol',
    department: 'operations', status: 'not_started', priority: 'high',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(1), createdAt: weeksBeforeEvent(18),
    tags: ['staff', 'volunteers', 'briefing'], subtasks: [], comments: [], dependencies: ['OP001', 'OP002'],
  },
  {
    id: 'OP013',
    title: 'Sponsor Payment Tracking Dashboard',
    description: 'Set up real-time payment tracking for all sponsor invoices and milestone payments',
    department: 'operations', status: 'in_progress', priority: 'critical',
    assignees: ['Neeraj Singh'],
    dueDate: weeksBeforeEvent(4), createdAt: weeksBeforeEvent(18),
    tags: ['payments', 'finance', 'tracking'], subtasks: [], comments: [], dependencies: ['SA007'],
  },
  {
    id: 'OP014',
    title: 'Post-Event Vendor Settlement',
    description: 'Process all vendor final invoices and close payments within 30 days post-event',
    department: 'operations', status: 'not_started', priority: 'medium',
    assignees: ['Sanjay Bhatt'],
    dueDate: '2026-11-07', createdAt: weeksBeforeEvent(18),
    tags: ['finance', 'vendors', 'post-event'], subtasks: [], comments: [], dependencies: ['OP002'],
  },

  // ======== ASPIRE ========
  {
    id: 'AS001',
    title: 'Aspire Eligibility Criteria Finalized',
    description: 'Lock eligibility rules: startup stage, founding year, funding cap, sector focus',
    department: 'aspire', status: 'done', priority: 'high',
    assignees: ['Shreya Bansal'],
    dueDate: weeksBeforeEvent(16), createdAt: weeksBeforeEvent(18),
    tags: ['eligibility', 'criteria'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'AS002',
    title: 'Startup Application Form — Go Live',
    description: 'Launch online application form for startups to apply for IMC 2026 Aspire pods',
    department: 'aspire', status: 'done', priority: 'critical',
    assignees: ['Kabir Sethi'],
    dueDate: weeksBeforeEvent(15), createdAt: weeksBeforeEvent(18),
    tags: ['application', 'form'], subtasks: [], comments: [], dependencies: ['AS001'],
  },
  {
    id: 'AS003',
    title: 'Startup Pod Sales — 40 Slots Pipeline',
    description: 'Drive paid pod sales to startups — target 40 pods at ₹2L per slot',
    department: 'aspire', status: 'in_progress', priority: 'critical',
    assignees: ['Shreya Bansal', 'Prachi Goyal'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['sales', 'pods', 'startups'],
    subtasks: [
      { id: 'AS003-1', title: 'Outreach to 100 target startups', done: true },
      { id: 'AS003-2', title: 'First wave calls (30 startups)', done: true },
      { id: 'AS003-3', title: '22 pods confirmed (paid)', done: true },
      { id: 'AS003-4', title: 'Second wave to close remaining 18', done: false },
    ],
    comments: [
      { id: 'c12', author: 'Shreya Bansal', text: '22 confirmed, 18 to go. Conversion rate strong at 22/40 in 4 weeks.', timestamp: weeksBeforeEvent(11) },
    ],
    dependencies: [],
  },
  {
    id: 'AS004',
    title: 'Startup Selection Jury Panel',
    description: 'Assemble jury of VCs, corp innovation leads, and founders to evaluate Aspire applicants',
    department: 'aspire', status: 'in_progress', priority: 'high',
    assignees: ['Shreya Bansal'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['jury', 'selection'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'AS005',
    title: 'Aspire Program Agenda — Pitches & Workshops',
    description: 'Design 2-day Aspire schedule: pitch slots, investor workshops, mentoring sessions',
    department: 'aspire', status: 'in_progress', priority: 'high',
    assignees: ['Kabir Sethi'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['agenda', 'pitches', 'workshops'], subtasks: [], comments: [], dependencies: ['AS004'],
  },
  {
    id: 'AS006',
    title: 'Investor Guest List for Aspire Day',
    description: 'Curate and invite 50+ investors, CVCs, and accelerators to Aspire showcase day',
    department: 'aspire', status: 'in_progress', priority: 'high',
    assignees: ['Nikhil Agarwal'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['investors', 'VCs', 'guests'],
    subtasks: [
      { id: 'AS006-1', title: 'Investor longlist compiled (80+)', done: true },
      { id: 'AS006-2', title: 'Shortlist to 50 with relevance filters', done: false },
      { id: 'AS006-3', title: 'Invites sent and RSVPs tracked', done: false },
    ],
    comments: [], dependencies: [],
  },
  {
    id: 'AS007',
    title: 'Startup Onboarding Kit Design & Dispatch',
    description: 'Design and send welcome kit to selected startups: booth guide, branding specs, schedule',
    department: 'aspire', status: 'not_started', priority: 'medium',
    assignees: ['Prachi Goyal'],
    dueDate: weeksBeforeEvent(5), createdAt: weeksBeforeEvent(18),
    tags: ['onboarding', 'kit'], subtasks: [], comments: [], dependencies: ['AS002'],
  },
  {
    id: 'AS008',
    title: 'Mentor Allocation Per Selected Startup',
    description: 'Match each Aspire startup to a relevant industry mentor for pre-event sessions',
    department: 'aspire', status: 'not_started', priority: 'medium',
    assignees: ['Riya Sharma'],
    dueDate: weeksBeforeEvent(5), createdAt: weeksBeforeEvent(18),
    tags: ['mentors', 'startups'], subtasks: [], comments: [], dependencies: ['AS004'],
  },
  {
    id: 'AS009',
    title: 'Aspire Marketing & Outreach Campaign',
    description: 'Run targeted digital campaign to attract quality startup applications and pod sales',
    department: 'aspire', status: 'in_progress', priority: 'high',
    assignees: ['Riya Sharma'],
    dueDate: weeksBeforeEvent(8), createdAt: weeksBeforeEvent(18),
    tags: ['marketing', 'outreach', 'digital'], subtasks: [], comments: [], dependencies: ['MK001'],
  },
  {
    id: 'AS010',
    title: 'Partnership with Accelerators & VCs',
    description: 'Formalise partnerships with 5+ accelerators to co-promote Aspire and send startups',
    department: 'aspire', status: 'in_progress', priority: 'high',
    assignees: ['Nikhil Agarwal'],
    dueDate: weeksBeforeEvent(9), createdAt: weeksBeforeEvent(18),
    tags: ['accelerators', 'VCs', 'partnerships'], subtasks: [], comments: [], dependencies: [],
  },
  {
    id: 'AS011',
    title: 'Startup Pod Floor Map Sign-off with Ops',
    description: 'Finalise pod layout and submit to Operations for floor plan integration',
    department: 'aspire', status: 'not_started', priority: 'critical',
    assignees: ['Kabir Sethi'],
    dueDate: weeksBeforeEvent(7), createdAt: weeksBeforeEvent(18),
    tags: ['floor map', 'pods'], subtasks: [], comments: [], dependencies: ['OP001'],
  },
  {
    id: 'AS012',
    title: 'Startup Showcase Judging Workflow',
    description: 'Design judging criteria, scorecard, and process for Day 2 startup pitches',
    department: 'aspire', status: 'not_started', priority: 'medium',
    assignees: ['Prachi Goyal'],
    dueDate: weeksBeforeEvent(5), createdAt: weeksBeforeEvent(18),
    tags: ['judging', 'showcase'], subtasks: [], comments: [], dependencies: ['AS004'],
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

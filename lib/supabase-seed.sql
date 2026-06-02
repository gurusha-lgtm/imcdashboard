-- IMC 2026 Dashboard — Supabase Schema & Seed
-- Run this in your Supabase SQL Editor

-- Drop existing table if re-running
drop table if exists tasks;

-- Create tasks table
create table tasks (
  id text primary key,
  title text not null,
  description text default '',
  department text not null,
  status text not null default 'not_started',
  priority text not null default 'medium',
  assignees text[] default '{}',
  due_date date not null,
  created_at date not null,
  tags text[] default '{}',
  subtasks jsonb default '[]',
  comments jsonb default '[]',
  dependencies text[] default '{}',
  milestone boolean default false,
  notes text,
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table tasks enable row level security;

-- Allow all operations for now (you can restrict later by user/role)
create policy "Allow all" on tasks for all using (true) with check (true);

-- Trigger to auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tasks_updated_at
  before update on tasks
  for each row execute function update_updated_at();

-- ===================== SEED DATA =====================

insert into tasks (id, title, description, department, status, priority, assignees, due_date, created_at, tags, subtasks, comments, dependencies, milestone, notes) values

-- SALES & MARKETING
('SM001','Platinum Partner Confirmations','Confirm all Platinum tier sponsors, collect signed agreements and advance payments','sales_marketing','in_progress','critical',
 '{"Pradeep Prakash","Parul Singh"}','2026-07-22','2026-07-08',
 '{"platinum","partnerships"}',
 '[{"id":"SM001-1","title":"Send contracts to confirmed Platinum partners","done":true},{"id":"SM001-2","title":"Collect signed agreements (8/12)","done":true},{"id":"SM001-3","title":"Follow up with remaining 4 partners","done":false},{"id":"SM001-4","title":"Update CRM with final status","done":false}]',
 '[{"id":"c1","author":"Pradeep Prakash","text":"Reliance and Airtel confirmed. 4 still pending.","timestamp":"2026-07-15"},{"id":"c2","author":"Parul Singh","text":"Following up with Samsung and Nokia this week.","timestamp":"2026-07-15"}]',
 '{}', true, 'Retainer clients from IMC 2025 auto-confirmed. New Platinum additions pending legal review.'),

('SM002','Gold Partner Outreach Campaign','Email and call campaign for 40 Gold tier prospects','sales_marketing','in_progress','high',
 '{"Samit Shukla","Lovesh Bhatia"}','2026-08-05','2026-07-08',
 '{"gold","outreach"}',
 '[{"id":"SM002-1","title":"Segment prospect list","done":true},{"id":"SM002-2","title":"Draft email sequence","done":true},{"id":"SM002-3","title":"Wave 1 sent (20 contacts)","done":true},{"id":"SM002-4","title":"Wave 2 sent (20 contacts)","done":false},{"id":"SM002-5","title":"Schedule follow-up calls","done":false}]',
 '[]','{}', false, null),

('SM003','Sponsorship Deck Refresh','Update sponsorship deck with IMC 2026 theme, new packages, and 2025 event stats','sales_marketing','review','high',
 '{"Lovesh Bhatia"}','2026-07-15','2026-07-08',
 '{"deck","collateral"}',
 '[{"id":"SM003-1","title":"Gather IMC 2025 metrics","done":true},{"id":"SM003-2","title":"Update package pricing","done":true},{"id":"SM003-3","title":"Design review with Vipin","done":false}]',
 '[{"id":"c3","author":"Lovesh Bhatia","text":"Draft done. Sent to Vipin for design review.","timestamp":"2026-07-15"}]',
 '{"MD001"}', false, null),

('SM004','Retainer Client Renewals','Process renewal contracts for returning sponsors from IMC 2025','sales_marketing','done','critical',
 '{"Parul Singh"}','2026-07-08','2026-07-08','{"renewals","retainer"}','[]','[]','{}', false, null),

('SM005','Partnership Tier Benefits Sign-off','Lock in deliverables for each sponsorship tier — sessions, branding, booth allocation','sales_marketing','done','critical',
 '{"Pradeep Prakash","Garima Sharma"}','2026-07-08','2026-07-08','{"tiers","benefits"}','[]','[]','{}', false,
 'Aligned with Programs team on session allocation per tier.'),

('SM006','Silver & Associate Partner Closures','Close remaining Silver and Associate sponsorship slots','sales_marketing','not_started','medium',
 '{"Samit Shukla"}','2026-08-19','2026-07-08','{"silver","associate"}','[]','[]','{"SM002"}', false, null),

('SM007','On-Site Branding Handover','Hand over final partner logo assets and branding requirements to operations','sales_marketing','not_started','high',
 '{"Parul Singh","Vipin Kumar"}','2026-09-02','2026-07-08','{"branding","handover"}','[]','[]','{"SM001","MD001"}', false, null),

-- PROGRAMS
('PR001','Keynote Speaker Confirmations','Confirm keynote speakers for main stage across all 4 event days (Oct 7–10)','programs','in_progress','critical',
 '{"Garima Sharma","Gurusha Sethi"}','2026-08-05','2026-07-08',
 '{"keynote","speakers"}',
 '[{"id":"PR001-1","title":"Day 1 keynote confirmed (DoT Minister)","done":true},{"id":"PR001-2","title":"Day 2 keynote confirmed (Industry CEO)","done":true},{"id":"PR001-3","title":"Day 3 keynote — awaiting PMO","done":false},{"id":"PR001-4","title":"Day 4 valedictory speaker","done":false},{"id":"PR001-5","title":"Send speaker briefs and logistics info","done":false}]',
 '[{"id":"c4","author":"Garima Sharma","text":"DoT minister confirmed Day 1. PMO response pending for Day 3.","timestamp":"2026-07-22"}]',
 '{"GR001"}', true, 'Day 3 keynote contingent on Government Relations confirming ministerial availability.'),

('PR002','Session Agenda — Track 1 (5G & Connectivity)','Build complete 4-day agenda for Track 1','programs','in_progress','high',
 '{"Gurusha Sethi"}','2026-08-05','2026-07-08','{"agenda","track1","5G"}',
 '[{"id":"PR002-1","title":"Map partner sessions to track","done":true},{"id":"PR002-2","title":"Fill non-partner slots","done":false},{"id":"PR002-3","title":"Confirm panel moderators","done":false}]',
 '[]','{"SM001","SM005"}', false, null),

('PR003','Session Agenda — Track 2 (AI & Deep Tech)','Build 4-day agenda for Track 2','programs','not_started','high',
 '{"Gurusha Sethi"}','2026-08-05','2026-07-08','{"agenda","track2","AI"}','[]','[]','{"PR002"}', false, null),

('PR004','Social Media Content Calendar','Plan and schedule all pre-event social posts','programs','in_progress','high',
 '{"Priyanka Sondhi"}','2026-08-19','2026-07-08',
 '{"social media","content"}',
 '[{"id":"PR004-1","title":"Save-the-date posts published","done":true},{"id":"PR004-2","title":"Speaker reveal series planned","done":true},{"id":"PR004-3","title":"Partner announcement posts scheduled","done":false},{"id":"PR004-4","title":"Countdown posts (4 weeks out)","done":false}]',
 '[{"id":"c5","author":"Priyanka Sondhi","text":"Save the date went live. Engagement is strong — 2.4x last year.","timestamp":"2026-07-22"}]',
 '{"MD001"}', false, null),

('PR005','Design Assets for Event Collateral','Create all design assets — digital banners, emailers, social creatives, stage backdrops','programs','in_progress','high',
 '{"Priyanka Sondhi","Vipin Kumar"}','2026-08-12','2026-07-08',
 '{"design","collateral","digital"}',
 '[{"id":"PR005-1","title":"Digital banner set","done":true},{"id":"PR005-2","title":"Email template designs","done":true},{"id":"PR005-3","title":"Stage backdrop and AV screens","done":false},{"id":"PR005-4","title":"Badge and registration desk design","done":false}]',
 '[]','{"MD001"}', false, null),

('PR006','Speaker Travel & Accommodation','Coordinate flights, hotel stays, and on-site logistics for confirmed speakers','programs','not_started','high',
 '{"Gurusha Sethi"}','2026-09-02','2026-07-08','{"speakers","logistics","travel"}','[]','[]','{"PR001"}', false, null),

('PR007','Stage Scripts & Runsheets (All 4 Days)','Prepare MC scripts and minute-by-minute runsheets for Oct 7–10','programs','not_started','high',
 '{"Garima Sharma","Gurusha Sethi"}','2026-09-16','2026-07-08','{"runsheet","scripts"}','[]','[]','{"PR001","PR002","PR003"}', false, null),

('PR008','Awards Programme — Categories & Jury','Finalise award categories, select jury panel, and plan ceremony','programs','not_started','medium',
 '{"Garima Sharma"}','2026-08-26','2026-07-08','{"awards","ceremony"}','[]','[]','{"GR001"}', false, null),

-- MARKETING & DESIGN
('MD001','IMC 2026 Brand Identity','Finalise visual identity, theme, colour palette and design language','marketing_design','done','critical',
 '{"Vipin Kumar"}','2026-07-08','2026-07-08','{"branding","design","theme"}','[]','[]','{}', true, null),

('MD002','Event Website — Go Live','Launch IMC 2026 website with agenda, speakers, and delegate registration','marketing_design','in_progress','critical',
 '{"Vipin Kumar"}','2026-08-05','2026-07-08',
 '{"website","digital"}',
 '[{"id":"MD002-1","title":"Home page design and copy","done":true},{"id":"MD002-2","title":"Agenda page (placeholder)","done":true},{"id":"MD002-3","title":"Registration integration","done":false},{"id":"MD002-4","title":"Speaker profiles page","done":false},{"id":"MD002-5","title":"QA and go-live","done":false}]',
 '[]','{"MD001"}', true, null),

('MD003','Physical Collateral — Print Brief to Agency','Brief design agency on banners, signage, badges, brochures for Yashobhoomi','marketing_design','in_progress','high',
 '{"Vipin Kumar"}','2026-08-12','2026-07-08',
 '{"print","agency","signage"}',
 '[{"id":"MD003-1","title":"Collateral inventory list","done":true},{"id":"MD003-2","title":"Agency brief submitted","done":true},{"id":"MD003-3","title":"First proofs review","done":false},{"id":"MD003-4","title":"Final approval and send to print","done":false}]',
 '[]','{"MD001"}', false, null),

('MD004','Partner Logo Wall & Co-branded Assets','Collect all sponsor logos and produce co-branded assets per tier','marketing_design','in_progress','medium',
 '{"Vipin Kumar"}','2026-08-19','2026-07-08','{"partners","logos","branding"}','[]','[]','{"SM001"}', false, null),

('MD005','AV & Stage Design Brief','Brief production agency on main stage aesthetics, LED screens, and AV','marketing_design','not_started','high',
 '{"Vipin Kumar"}','2026-08-19','2026-07-08','{"AV","stage","production"}','[]','[]','{"MD001"}', false, null),

-- GOVERNMENT RELATIONS
('GR001','MeitY Minister — Inauguration Confirmation','Confirm Minister of Electronics & IT for Day 1 inauguration at Yashobhoomi','govt_relations','in_progress','critical',
 '{"Sudhakaran"}','2026-08-05','2026-07-08',
 '{"MeitY","inauguration","ministerial"}',
 '[{"id":"GR001-1","title":"Initial approach letter sent","done":true},{"id":"GR001-2","title":"Ministry secretariat meeting done","done":true},{"id":"GR001-3","title":"Formal confirmation received","done":false},{"id":"GR001-4","title":"Protocol and logistics briefing","done":false}]',
 '[{"id":"c6","author":"Sudhakaran","text":"Secretary confirmed minister is available Oct 7. Awaiting official letter.","timestamp":"2026-07-22"}]',
 '{}', true, 'Also pursuing PMO participation for Day 4 valedictory.'),

('GR002','DoT Policy Announcement Coordination','Coordinate with DoT for potential 6G/spectrum policy announcement at IMC 2026','govt_relations','in_progress','critical',
 '{"Sudhakaran"}','2026-08-19','2026-07-08','{"DoT","policy","6G"}','[]','[]','{"GR001"}', false,
 'Highly sensitive — coordinate messaging with Programs before any public communication.'),

('GR003','State Government Delegations','Coordinate with 5 state IT Ministers / CMs to attend IMC 2026','govt_relations','in_progress','high',
 '{"Sudhakaran"}','2026-08-19','2026-07-08','{"state","delegations"}','[]','[]','{}', false, null),

('GR004','VIP Security & Protocol — CISF Briefing','Coordinate VIP security arrangements with CISF and Delhi Police','govt_relations','not_started','high',
 '{"Sudhakaran"}','2026-09-09','2026-07-08','{"security","VIP","CISF"}','[]','[]','{"GR001","GR003"}', false, null),

('GR005','Official Ministerial Invitation Letters','Draft and despatch formal invitation letters to all confirmed government attendees','govt_relations','in_progress','high',
 '{"Sudhakaran"}','2026-08-12','2026-07-08','{"invitations","protocol"}','[]','[]','{"GR001"}', false, null),

('GR006','International Delegations — Embassy Coordination','Coordinate with embassies and trade bodies for international government delegations','govt_relations','not_started','medium',
 '{"Sudhakaran"}','2026-08-26','2026-07-08','{"international","delegations","embassy"}','[]','[]','{"GR001"}', false, null),

-- FINANCE & HR OPERATIONS
('FO001','Vendor Contracts — AV, Fabrication, Power','Finalise and sign contracts with all core build vendors at Yashobhoomi','finance_ops','in_progress','critical',
 '{"Neeraj Singh"}','2026-08-12','2026-07-08',
 '{"vendors","contracts"}',
 '[{"id":"FO001-1","title":"AV vendor finalised","done":true},{"id":"FO001-2","title":"Fabrication/carpentry vendor","done":true},{"id":"FO001-3","title":"Power & electrical vendor","done":false},{"id":"FO001-4","title":"Catering vendor shortlist","done":false}]',
 '[]','{}', true, null),

('FO002','Sponsor Invoice & Payment Tracking','Track advance payments, milestone invoices, and outstanding balances from all sponsors','finance_ops','in_progress','critical',
 '{"Neeraj Singh"}','2026-09-02','2026-07-08','{"invoicing","payments","finance"}','[]',
 '[{"id":"c7","author":"Neeraj Singh","text":"Production costs 12% over forecast. Raised with Pradeep.","timestamp":"2026-07-22"}]',
 '{"SM001"}', false, null),

('FO003','Event Budget vs Actuals Review','Monthly budget reconciliation — flag overruns, reforecast where needed','finance_ops','in_progress','high',
 '{"Neeraj Singh"}','2026-09-16','2026-07-08','{"budget","finance"}','[]','[]','{}', false, null),

('FO004','Venue Layout & Floor Plan (Yashobhoomi)','Finalise IICC Yashobhoomi hall allocations, floor plans, zone definitions','finance_ops','in_progress','critical',
 '{"Neeraj Singh"}','2026-08-05','2026-07-08',
 '{"venue","Yashobhoomi","floor-plan"}',
 '[{"id":"FO004-1","title":"Hall allocations confirmed with IICC","done":true},{"id":"FO004-2","title":"Exhibition zone layout","done":true},{"id":"FO004-3","title":"Conference hall layout","done":false},{"id":"FO004-4","title":"Entry/exit and emergency routes","done":false}]',
 '[]','{}', true, null),

('FO005','Delegate Registration System','Configure badge printing, QR scanning, and check-in kiosk system','finance_ops','not_started','high',
 '{"Neeraj Singh"}','2026-09-02','2026-07-08','{"registration","badges","tech"}','[]','[]','{"MD002","FO004"}', false, null),

('FO006','On-Site Staff & Volunteer Briefing','Brief 150+ on-site staff and volunteers on roles, zones, and escalation','finance_ops','not_started','high',
 '{"Neeraj Singh"}','2026-09-30','2026-07-08','{"staff","volunteers","briefing"}','[]','[]','{"FO004","FO001"}', false, null),

('FO007','Post-Event Vendor Settlement','Process all vendor final invoices and payments within 30 days post-event','finance_ops','not_started','medium',
 '{"Neeraj Singh"}','2026-11-10','2026-07-08','{"finance","vendors","post-event"}','[]','[]','{"FO001","FO002"}', false, null);

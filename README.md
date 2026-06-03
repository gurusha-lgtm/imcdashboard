# IMC 2026 Dashboard

Project management dashboard for India Mobile Congress 2026 (Oct 7–10, IICC Yashobhoomi, New Delhi).

Built with Next.js 16, Supabase, Tailwind CSS.

---

## WhatsApp Integration

Team members can update task status by sending a WhatsApp message — no app needed.

### Webhook endpoint

`POST /api/whatsapp`

Handles both **Twilio** (`From` / `Body`) and **WATI** (`waId` / `text`) payload formats automatically.

### How it works

1. Team member sends a WhatsApp message to the bot number
2. The webhook looks up their phone number in the `users` table
3. It parses their message for a status keyword and task name
4. It updates the matching task on the dashboard immediately

**Status keywords recognised:**
| Keywords | Sets status to |
|---|---|
| done / finished / complete | Done ✓ |
| blocked / stuck / waiting / pending | Blocked 🚨 |
| started / working / wip / ongoing | In Progress 🔄 |
| review / reviewing / checking | In Review 👀 |

**Example messages:**
```
print brief done
agency not responding blocked
started working on vendor contracts
registration page review
```

### Registration flow

Team members must register once before they can update tasks.

1. First message from any unregistered number gets this reply:
   > *You're not registered yet. Send: register [your full name]*

2. They reply:
   > `register Priya Sharma`

3. The system matches their name against the `users` table and links their number. They get a confirmation with their task list.

### Connecting Twilio Sandbox (for testing)

1. Go to [console.twilio.com](https://console.twilio.com) → Messaging → Try it out → Send a WhatsApp message
2. Follow the sandbox join instructions (send `join [code]` to the sandbox number)
3. Set the sandbox webhook URL to:
   ```
   POST https://your-vercel-domain.com/api/whatsapp
   ```
4. Add environment variables to Vercel:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

### Moving to WATI (production)

WATI uses a different payload format — the webhook handles both automatically:
- Twilio: `{ From: "whatsapp:+91...", Body: "message" }`
- WATI: `{ waId: "91...", text: "message" }`

In WATI, set the webhook URL to `POST https://your-domain.com/api/whatsapp`.

### Setting up the database

Run `lib/supabase-seed.sql` in your Supabase SQL Editor. This creates:
- `users` table with all 33 team members (phone numbers start as null)
- `tasks` table with all 85 seeded tasks across 7 departments

Team members register their WhatsApp number the first time they message the bot.

---

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in your Supabase credentials.

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy to Vercel. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables, then redeploy.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

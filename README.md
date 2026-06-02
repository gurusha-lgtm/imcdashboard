## WhatsApp Integration

The `/api/whatsapp-update` endpoint allows updating task status via WhatsApp bots (Twilio/WATI).

### Endpoint

`POST /api/whatsapp-update`

### Payload

```json
{
  "taskId": "SM001",
  "newStatus": "blocked",
  "blockedReason": "Waiting for legal sign-off",
  "userId": "Pradeep Prakash"
}
```

- `taskId` (required): The task ID (e.g. `SM001`, `PR001`)
- `newStatus` (required): One of `not_started`, `in_progress`, `blocked`, `review`, `done`
- `blockedReason` (optional): Required context when `newStatus` is `blocked`
- `userId` (optional): Name of the person sending the update (for the auto-comment)

### Connecting Twilio / WATI

1. Deploy this app to a public URL (e.g. Vercel)
2. In your Twilio/WATI dashboard, set the webhook URL to:
   `POST https://your-domain.com/api/whatsapp-update`
3. Parse the incoming WhatsApp message in a separate serverless function and call this endpoint

### Example curl

```bash
curl -X POST https://your-domain.com/api/whatsapp-update \
  -H "Content-Type: application/json" \
  -d '{"taskId":"SM001","newStatus":"blocked","blockedReason":"Partner not responding","userId":"Pradeep Prakash"}'
```

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

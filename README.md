# Retain Demo Builder

A prospect-personalized walkthrough of Paddle Retain's three capabilities: Payment
Recovery (email), Payment Recovery In-App, and Cancellation Flows.

## How it works

1. Fill in the prospect's company name, contact name/title, landing page URL, and
   logo URL. The app captures a live screenshot of the landing page via a
   Puppeteer-backed API route (`app/api/screenshot`).
2. Pick which capability to demo.
3. **Payment Recovery** renders a mocked Gmail inbox with the real Retain email copy,
   personalized to the prospect. Clicking the link opens the landing page screenshot
   with a real Paddle Checkout overlay (sandbox) auto-launched, standing in for the
   payment-update step.
4. **Payment Recovery In-App** shows the same screenshot with a simulated in-app
   notification toast that opens the same checkout overlay.
5. **Cancellation Flows** is the one genuinely live piece: it calls
   `Paddle.Retain.demo({ feature: 'cancellationFlow' })` against a **live** Paddle
   client-side token, which is Paddle's own no-subscription-required way to preview
   a configured Cancellation Flow.

Retain only operates on live billing data and can't be triggered arbitrarily for a
demo, so Payment Recovery and Payment Recovery In-App are high-fidelity mocks. Only
Cancellation Flows uses a real, live Retain call.

## Setup

```bash
npm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_PADDLE_SANDBOX_TOKEN, NEXT_PUBLIC_PADDLE_SANDBOX_PRICE_ID,
# NEXT_PUBLIC_PADDLE_LIVE_TOKEN
npm run dev
```

For local screenshotting without downloading the serverless Chromium bundle, set
`CHROME_EXECUTABLE_PATH` to a local Chrome binary.

### Cancellation Flow prerequisites

- A live Paddle account with Retain enabled and a Cancellation Flow already
  configured (Paddle dashboard > Retain > Cancellation Flows).
- The live client-side token's allowed domains must include wherever this app is
  served from (your Vercel domain, and `localhost` for local dev if Paddle permits).

## Deploying

Deploy to Vercel as usual (`vercel deploy`), and set the three
`NEXT_PUBLIC_PADDLE_*` env vars in the Vercel project settings. The screenshot API
route needs Node.js runtime (already configured) since it uses `puppeteer-core` +
`@sparticuz/chromium-min`.

# PROMPTS

## Prompt 1

Create development steps in `Scratchpad` of `.cursorrule` to build a SaaS platform called "Voice-to-Video Script Coach" that allows users to speak their ideas and generate a full YouTube-style video script with visual direction and optional voice-over export. Use TypeScript, Next.js 15, Shadcn, Lucide, Zod, Zustand, OpenAI API, Whisper (or AssemblyAI), ElevenLabs, Resend, Prisma, PostgreSQL, Uploadthing, next-auth@beta, Stripe.

### How It Works:

- User speaks an idea (using browser mic).
- AI transcribes it → summarizes → generates:
  - A video script (intro, body, outro)
  - Visual directions (suggested scenes, b-roll, animations)
  - Optional text-to-speech export for voice-over
- User downloads or saves the script pack.
- Can export in formats: `.pdf`, `.txt`, or `.finalcutpro` templates.

### 🛠 Tech Stack (Cursor + Vercel):

- Frontend: Next.js (React-based, deploys easily on Vercel)
- Backend/API: Node.js + serverless functions (Vercel Functions)
- Voice Capture: Web APIs (MediaRecorder)
- AI Features: OpenAI API (summarization & scripting), ElevenLabs (voice-over), AssemblyAI or Whisper (transcription)
- Payments: Stripe (international-ready), or Gumroad / LemonSqueezy (for simpler setup)
- Auth: Clerk or Auth0 (Vercel-compatible)

### 💰 Monetization:

- Freemium: 3 scripts/month free
- Subscription: $9.99/month for unlimited scripts
- One-time credits: 5 scripts = $5
- Team/Agency plans: Script sharing with clients or assistants

### 🌍 Local Advantage:

- Tagalog version for Filipino creators
- Templates for vlogs, product reviews, or trending TikTok formats

### ✨ Expansion Ideas:

- Add AI-generated thumbnails or captions
- Integrate with Notion, CapCut, or YouTube API
- Build a marketplace for creators to buy/sell scripts

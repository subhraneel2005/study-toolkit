<div align="center">
  <!-- <img src="public/logo.png" alt="study toolkit" width="120" /> -->

# study toolkit for students

a minimal, open-source study platform with focused productivity tools and ai-powered agents — built by a student, for students.

  <br/>

   <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=flat" alt="Next.js" />
  <img src="https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white" alt="Vercel AI SDK" />
    <img src="https://img.shields.io/badge/Google%20Gemini-886FBF?logo=googlegemini&logoColor=fff" alt="Google Gemini" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Zod-2B4A6F?&style=flat&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Better%20Auth-FFF?logo=betterauth&logoColor=000&style=flat" alt="Better-Auth" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=flat" alt="Prisma" />
</div>

---

## what this platform does

the platform is split into **personal tools** (persistent, tied to your daily workflow) and **disposable tools** (on-demand ai utilities).

### personal tools

these are meant to be used every day and stored for long-term tracking.

- **daily logs**  
  write and track daily work, learnings, and reflections.

- **daily checklist**  
  manage todos with priority and completion tracking.

- **study heatmap**  
  visualize consistency and streaks using a github contribution-style heatmap.

### disposable ai tools

these tools don’t store long-term state and are focused on quick outcomes.

- **flashcards agent**  
  automatically generates study flashcards from input content.

- **chat with pdf agent**  
  upload a pdf and have contextual conversations with it.

- **summarizer**  
  condenses long text or documents into concise summaries.

- **web search tool**  
  searches and retrieves relevant research papers and sources.

---

## key features

- **byok (bring your own key)**  
  users plug in their own google gemini api key using vercel’s ai sdk.

- **secure two-layer api key encryption**  
  api keys are encrypted before storage with an additional protection layer.

- **server actions + react server components**  
  used for optimized, secure data mutations and rendering.

- **clean, distraction-free ui**  
  focused on usability, not gimmicks.

- **open source**  
  transparent codebase, easy to extend.

- **built by a student, for students**  
  opinionated toward real study workflows, not generic “ai dashboards”.

---

## tech stack

- **next.js (app router)** — frontend + server rendering
- **vercel ai sdk** — ai orchestration
- **google gemini** — llm provider
- **prisma** — orm
- **postgresql** — database
- **server actions & rsc** — secure backend logic
- **zustand** — lightweight client state (where needed)

---

## contributing

Contributions are welcome! Please open an issue or submit a PR.

```bash
git clone https://github.com/<YOUR_USERNAME>/study-toolkit.git
cd study-toolkit
npm install
npm run dev
```

---

## environment variables

create a `.env` file in the project root. use the following `.env.example` as reference:

```env
# database
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require

# ai (bring your own key)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key

# web search (serper)
GOOGLE_SEARCH_BASE_URL=https://google.serper.dev/search
SERPER_API_KEY=your_serper_api_key

# vercel ai gateway (optional / production)
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key

# email service
RESEND_API_KEY=your_resend_api_key

# encryption
# server-side encryption secret (keep private)
ENCRYPTION_SECRET=your_long_random_secret

# client-safe encryption key
NEXT_PUBLIC_ENCRYPTION_KEY=your_public_encryption_key

# google oauth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# better-auth
# development
BETTER_AUTH_URL=http://localhost:3000

# production
# BETTER_AUTH_URL=https://your-production-domain.com
```

### Prisma migration

```bash
npx prisma migrate dev --name db_init
```

```bash
npx prisma generate
```

---

<div align="center">
  <p>Created with ❤️ by <a href="https://twitter.com/subhraneeltwt">Subhraneel</a></p>
  <p>
    <a href="https://github.com/subhraneel2005">GitHub</a> •
    <a href="https://twitter.com/subhraneeltwt">Twitter</a>
  </p>
</div>

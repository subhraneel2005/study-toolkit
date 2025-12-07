<div align="center">
  <!-- <img src="https://raw.githubusercontent.com/subhraneel2005/genai-project-01/main/public/logo.png" alt="Research Agent Workspace" width="120" /> -->
  
  # Study toolkit for students
  
Building a platform with a bunch of AI agents and tools that helps students in their academics.
   <br/>
   <br/>
  <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=flat" alt="Next.js" />
  <img src="https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white" alt="Vercel AI SDK" />
    <img src="https://img.shields.io/badge/Google%20Gemini-886FBF?logo=googlegemini&logoColor=fff" alt="Google Gemini" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=fff" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/Zod-2B4A6F?&style=flat&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Resend-000?logo=resend&logoColor=fff&style=flat" alt="Resend" />
  <img src="https://img.shields.io/badge/Better%20Auth-FFF?logo=betterauth&logoColor=000&style=flat" alt="Better-Auth" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=flat" alt="Prisma" />

  <br />
    <img src="https://github.com/subhraneel2005/Research-Agent-Workspace/blob/main/public/landing1.png?raw=true" alt="Landing page Banner" width="100%" />
  <br />
  
</div>

## Features

- **Web Search Agent** — Find and index academic articles and research papers
- **Chat with PDF** — Upload PDFs and have natural-language conversations
- **YouTube Lectures** — Extract transcripts and interact with video content (Coming Soon)
- **Summarizer** — Compress long content into concise summaries
- **Notes Generator** — Produce structured, study-ready notes
- **Flashcards** — Convert notes into spaced-repetition flashcards
- **Export Tools** — Save notes to Notion, Google Drive, or local storage

## Tech Stack

- **Next.js** — Frontend and server-side rendering
- **Vercel AI SDK** — Agent orchestration and LLM integration
- **Prisma** — Type-safe ORM
- **PostgreSQL** — Database
- **Better-Auth** — Secure authentication
- **Resend** — Email verification
- **React Hook Form + Zod** — Form handling and validation

---

## Architectural Diagrams

<div align="left">
  <img src="https://github.com/subhraneel2005/Research-Agent-Workspace/blob/main/public/notes-gen.png?raw=true" alt="Notes Generator Agent Architecture" width="700" />
</div>
lp
**Overview:**
The Notes Generator Agent is responsible for generating MDX-formatted, editable notes from multiple AI agent outputs (such as Chat-w-pdf, Flashcards, and Summarizer agents). It enables users to view, edit, autosave, and export notes seamlessly — much like editing a Notion document.

**Key Highlights:**

- Combines outputs from multiple agents (Chat-w-pdf, Flashcards, Summarizer).
- Uses LLM to produce structured MDX-formatted notes.
- Autosaves progress in the database for reliability.
- Allows live editing with temporary saves in Zustand.
- Supports exporting notes as PDF or saving to Google Drive/Notion.
- Enables deletion and version control for note edits.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/subhraneel2005/Research-Agent-Workspace.git

# Install dependencies
cd Research-Agent-Workspace
npm install

# Start development server
npm run dev
```

## Contributing

Contributions are welcome! Please open an issue or submit a PR.

## License

MIT

---

<div align="center">
  <p>Created with ❤️ by <a href="https://github.com/subhraneel2005">Subhraneel</a></p>
  <p>
    <a href="https://github.com/subhraneel2005">GitHub</a> •
    <a href="https://twitter.com/Subhraneel55545">Twitter</a>
  </p>
</div>

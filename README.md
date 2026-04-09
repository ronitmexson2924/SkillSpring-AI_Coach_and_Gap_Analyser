# SkillSpring

SkillSpring is a full-stack skill mapping and growth tracking app with a motion-led landing page, a dashboard for skills/roadmaps/progress, and an Express API that supports MongoDB plus local in-memory fallbacks for development.

## Stack

- React 18 + Vite
- Tailwind CSS v3
- Framer Motion + Lenis
- Zustand
- Recharts + `react-activity-calendar`
- Node.js + Express 4
- MongoDB + Mongoose
- OpenAI GPT-4o via backend proxy

## Project Structure

```text
client/   React SPA
server/   Express API, models, controllers, services
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start MongoDB if you want persistent storage:

```bash
mongod --dbpath ./data/db
```

4. Start the app:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend runs on `http://localhost:5000`.

## Development Notes

- Authentication is intentionally bypassed. A mock user is injected on both client and server.
- The frontend can operate against the backend or degrade to local mock data when the API is unavailable.
- The backend can operate with MongoDB or fall back to an in-memory store when `MONGODB_URI` is missing or Mongo is offline.
- AI roadmap/chat routes stream over SSE. If `OPENAI_API_KEY` is not configured, the server responds with deterministic mock AI output.

## Important Routes

### Skills

- `GET /api/skills`
- `POST /api/skills`
- `PUT /api/skills/:id`
- `DELETE /api/skills/:id`
- `POST /api/skills/parse-resume`
- `POST /api/skills/import-github`

### Roadmap

- `GET /api/roadmap`
- `POST /api/roadmap/generate`
- `PUT /api/roadmap/task/:id`

### AI

- `POST /api/ai/chat`
- `POST /api/ai/analyze-gaps`
- `GET /api/ai/role-requirements/:role`

## Quality Checks

```bash
npm run lint
npm run format
```

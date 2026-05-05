# quiz-builder

Monorepo with a NestJS backend and a Next.js frontend.

```
quiz-builder/
├── backend/    # NestJS + Sequelize + Postgres
├── frontend/   # Next.js (App Router)
└── compose.yml # Postgres for local dev
```

## Prerequisites

- Node.js 20+
- npm
- Docker (for the database)

## 1. Database setup

Postgres runs in Docker via `compose.yml` and reads credentials from `backend/.env`.

```bash
cp backend/.env.example backend/.env
docker compose up -d
```

Defaults from `.env.example`:

- Host: `localhost`
- Port: `5433` (mapped to container's `5432`)
- DB: `quiz_builder`
- User / password: `postgres` / `postgres`

Apply migrations:

```bash
cd backend
npm install
npm run migration:run
```

## 2. Run the backend

```bash
cd backend
npm run start:dev
```

Backend listens on `http://localhost:3001` (configurable via `PORT` in `backend/.env`).

## 3. Run the frontend

The frontend reads the backend URL from `API_URL`.

```bash
cd frontend
echo "API_URL=http://localhost:3001" > .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## 4. Create a sample quiz

### Via the UI

1. Open `http://localhost:3000`.
2. Go to the quiz creation page and fill in a title, description, and at least one question (boolean, checkbox, or input).
3. Submit — the quiz appears in the quiz list.

### Via the API

```bash
curl -X POST http://localhost:3001/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Quiz",
    "description": "A short demo quiz",
    "questions": [
      {
        "type": "boolean",
        "text": "The sky is blue.",
        "correctAnswer": true
      },
      {
        "type": "input",
        "text": "Capital of France?",
        "correctAnswer": "Paris"
      },
      {
        "type": "checkbox",
        "text": "Pick the prime numbers.",
        "options": ["2", "3", "4", "5"],
        "correctAnswers": ["2", "3", "5"]
      }
    ]
  }'
```

Other endpoints:

- `GET    /quizzes` — list all
- `GET    /quizzes/:id` — get one
- `DELETE /quizzes/:id` — delete

## Formatting

Prettier is configured at the repo root and covers all packages.

```bash
npm install         # once, at repo root
npm run format      # write
npm run format:check
```

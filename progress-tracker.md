# Progress Tracker — Sportz (Real-time Sports App)

## Project Setup
- [x] Initialize Node.js project (ESM, `"type": "module"`, pnpm)
- [x] Express server scaffold (`index.js`, port 8080)
- [x] Install Drizzle ORM + Neon WebSocket driver (`drizzle-orm`, `@neondatabase/serverless`, `ws`, `dotenv`)
- [x] Install `drizzle-kit` (dev dependency)
- [x] Create `.env` with `DATABASE_URL` (placeholder — replace with real Neon connection string)
- [x] Create `drizzle.config.js` (schema: `./src/db/schema.js`, out: `./drizzle`)
- [x] Create `.gitignore` (`.env`, `node_modules`, `drizzle/`)

## Database Client
- [x] `src/db/db.js` — Neon WebSocket adapter, exports `db` and `pool`
- [x] `neonConfig.webSocketConstructor = ws` for Node < v22

## Database Schema (`src/db/schema.js`)
- [x] `match_status` enum — `scheduled`, `live`, `finished`
- [x] `matches` table — id, sport, homeTeam, awayTeam, status, startTime, endTime, homeScore (default 0), awayScore (default 0), createdAt (default now)
- [x] `commentary` table — id, matchId (FK → matches.id), minute, sequence, period, eventType, actor, team, message, metadata (jsonb), tags, createdAt (default now)
- [x] camelCase JS identifiers mapped to snake_case DB columns

## CRUD Demo
- [x] `src/index.js` — full CRUD lifecycle against the `matches` table (create → read → update → delete)

## Migrations
- [x] Initial migration generated (`drizzle/0000_tidy_rictor.sql`)
- [ ] Apply migration to Neon DB (`pnpm db:migrate`)

## Next Steps
1. Replace the placeholder `DATABASE_URL` in `.env` with the real Neon connection string.
2. Run `pnpm db:migrate` to apply the migration.
3. Run `pnpm db:crud` to verify the CRUD lifecycle.

# Events Admin Backend — Implementation Plan

## Context

`uxWeb` is a plain **Vite + React 19 SPA** (react-router-dom for client routing) — **not** Next.js, and that is not changing. It deploys to Vercel with a catch-all SPA rewrite in `vercel.json`. This plan adds a lightweight backend using **Vercel Functions** (an `/api` directory at the project root), which deploy alongside the static build for any frontend framework — no migration required.

Scope for this pass: **events only**. Designathon admin (`src/data/designathons.js`, rendered in `src/pages/hackathon.jsx`) is explicitly out of scope for now but should follow the same pattern later if picked up.

### Existing relevant state
- Events are currently static: `src/data/events.json`, imported directly by `src/pages/events.jsx`, which splits them into upcoming/previous by comparing `date` to `new Date()` client-side. There is no "published/visible" concept today — everything in the file renders.
- Event shape in `events.json`: `title`, `subtitle`, `descriptionPresent`, `descriptionPast`, `date` (`YYYY-MM-DD`), `time` (free text, e.g. `"6:00 PM - 8:00 PM"`), `location`, `signupLink`, `imageGallery` (array of `/public`-relative paths, optional).
- Images today are committed to `/public/events/...` and referenced by static path.
- `uxWeb/.env` already has `POSTGRES_URL` (and `PRISMA_DATABASE_URL`) — a Postgres database has already been provisioned via Vercel's "Prisma Postgres" storage product. This is just the DB; there is no commitment to use the Prisma ORM. **Use a lightweight client (`@vercel/postgres` or `pg`) directly against `POSTGRES_URL`, not Prisma Client** — the query surface here is small enough that Prisma's engine weight isn't worth the serverless cold-start cost.
- No `.vercel` project link exists locally; deployment is presumably via a GitHub integration.

## Housekeeping (do first, before any backend code)

1. **Fix `vercel.json`.** Current rewrite:
   ```json
   { "rewrites": [ { "source": "/(.*)", "destination": "/" } ] }
   ```
   This would also catch `/api/*` requests and serve `index.html` instead of invoking the function. Change to exclude `/api`:
   ```json
   { "rewrites": [ { "source": "/((?!api/).*)", "destination": "/" } ] }
   ```

## Data model

New `events` table in the existing Postgres DB, replacing `src/data/events.json`:

| column | type | notes |
|---|---|---|
| `id` | serial or uuid PK | |
| `title` | text | e.g. "Workshops" |
| `subtitle` | text | |
| `description_present` | text | |
| `description_past` | text | |
| `event_date` | date | |
| `event_time` | text | keep existing free-text format |
| `location` | text | |
| `signup_link` | text | nullable |
| `image_gallery` | `text[]` or `jsonb` | array of Vercel Blob URLs |
| `published` | boolean | **the "show on site" toggle** — default `true` on migration, default `false` for new events created via admin |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

### Migration path
1. Write a one-time script that reads `src/data/events.json` and inserts each entry as a row with `published: true`.
2. Once verified, delete `src/data/events.json`.
3. Update `src/pages/events.jsx` to fetch `GET /api/events` instead of importing the JSON file (keep the existing upcoming/previous split logic — it operates on the same shape, just needs `camelCase` keys returned from the API to match, or update the component to the new field names).

## API surface (`/api`)

```
GET  /api/events                  public — returns published events only

POST /api/auth/login              body: { password } -> sets signed session cookie
POST /api/auth/logout             clears the cookie

GET    /api/admin/events          all events, incl. unpublished (auth required)
POST   /api/admin/events          create event (auth required)
PATCH  /api/admin/events/[id]     update event, incl. toggling `published` (auth required)
DELETE /api/admin/events/[id]     delete event (auth required)

POST   /api/admin/upload          issues a short-lived Vercel Blob client upload token (auth required)
```

Shared helpers:
- `api/_lib/db.js` — Postgres client/connection helper.
- `api/_lib/session.js` — cookie signing/verification; exports `requireAdmin(req)` used at the top of every `/api/admin/*` handler. Return `401` if invalid/missing.

## Auth: single shared admin password

- Env vars: `ADMIN_PASSWORD_HASH` (bcrypt hash, not plaintext) and `SESSION_SECRET` (random string for signing).
- `POST /api/auth/login`: compares submitted password against the hash (bcrypt compare), and on success signs a short-lived JWT (recommend the `jose` library — works well in the Vercel Functions runtime) and sets it as a cookie with `HttpOnly; Secure; SameSite=Strict`.
- Every `/api/admin/*` handler calls `requireAdmin(req)` first and rejects if the cookie is missing/invalid/expired.
- Client-side `/admin` route checks auth (e.g. via a `GET /api/auth/me` or by attempting an authed call and redirecting to `/admin/login` on 401) purely for UX — the real security boundary is server-side, not the route guard.

## Image uploads: Vercel Blob

1. Admin selects a file in the `/admin` UI.
2. Browser calls `POST /api/admin/upload` (authenticated), which uses `@vercel/blob`'s `handleUpload` to issue a scoped, short-lived client upload token.
3. Browser uploads the file **directly to Blob** using that token — this bypasses Vercel Functions' request body size limits entirely and is the intended pattern for this SDK.
4. Blob returns a public CDN URL. The client attaches that URL into the event's `image_gallery` array via the update endpoint.

Requires `BLOB_READ_WRITE_TOKEN` (created automatically when a Blob store is attached to the Vercel project).

## Admin UI — inside the existing SPA

New routes added to the existing `react-router-dom` router (no new project/deploy):

- `/admin/login` — password form, posts to `/api/auth/login`.
- `/admin` — list of all events (published + unpublished), publish/unpublish toggle per row, links to create/edit.
- `/admin/events/new` and `/admin/events/:id` — form covering all fields in the table above, plus a drag-and-drop/file-picker uploader wired to `/api/admin/upload` for populating `image_gallery`.

Reuse existing component/styling conventions in `src/components` and `src/styles` where sensible rather than introducing a new UI kit.

## Env vars required

| var | where it comes from |
|---|---|
| `POSTGRES_URL` | already set (Vercel Prisma Postgres storage) |
| `BLOB_READ_WRITE_TOKEN` | new — from attaching a Blob store to the Vercel project |
| `ADMIN_PASSWORD_HASH` | new — bcrypt hash, generate and set manually |
| `SESSION_SECRET` | new — random secret for JWT signing |

Set these both in the Vercel project's environment variables (for prod/preview) and locally in `.env` (for `vercel dev`).

## Local development

Once `/api` exists, use `vercel dev` instead of `vite dev` — it runs the Vite dev server and emulates the Functions runtime together, so `fetch('/api/events')` behaves the same locally as in production.

## Explicitly out of scope for this pass

- Designathon admin (`designathons.js` / `hackathon.jsx`) — same general pattern (Postgres table, admin CRUD, Blob uploads, `published` flag) would apply later, but with a JSONB-based schema for the nested `winners`/`projects`/`mentors` arrays rather than full normalization, since that content is edited and read as one block roughly once a year. Not building now.
- Per-user admin accounts — single shared password is sufficient for the current team size.
- Rate limiting on `/api/auth/login` — worth adding later (e.g. via Vercel KV or the Vercel Firewall) but not a blocker for v1 given the small, known audience.

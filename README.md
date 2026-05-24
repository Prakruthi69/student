# Student CRUD — NestJS + Drizzle ORM + PostgreSQL

A full-stack student management app with a NestJS REST API and a vanilla-JS frontend.

---

## Project Structure

```
student-crud/
├── src/
│   ├── db/
│   │   ├── db.ts           # Drizzle client (pg Pool)
│   │   ├── schema.ts       # Table definitions + enums
│   │   └── seed.ts         # Sample data seeder
│   ├── students/
│   │   ├── dto/
│   │   │   ├── create-student.dto.ts
│   │   │   └── update-student.dto.ts
│   │   ├── students.controller.ts
│   │   ├── students.module.ts
│   │   └── students.service.ts
│   ├── public/             # Static frontend (HTML/CSS/JS)
│   │   ├── index.html
│   │   ├── css/style.css
│   │   └── js/app.js
│   ├── app.module.ts
│   └── main.ts
├── drizzle/                # Generated SQL migrations (db:generate)
├── drizzle.config.ts
├── package.json
├── tsconfig.json
├── nest-cli.json
└── .env.example
```

---

## Quick Start

### 1 — Prerequisites
- Node.js ≥ 18
- PostgreSQL database

### 2 — Install
```bash
npm install
```

### 3 — Configure environment
```bash
cp .env.example .env
# Edit .env and set DATABASE_URL
```

### 4 — Push schema to database
```bash
npm run db:push
```

### 5 — (Optional) Seed sample data
```bash
npm run db:seed
```

### 6 — Start development server
```bash
npm run start:dev
```

Open **http://localhost:3000** in your browser.

---

## API Reference

| Method | Route                    | Description              |
|--------|--------------------------|--------------------------|
| GET    | /api/students            | List all (paginated)     |
| GET    | /api/students/stats      | Aggregate stats          |
| GET    | /api/students/:id        | Get one student          |
| POST   | /api/students            | Create a student         |
| PUT    | /api/students/:id        | Update a student         |
| DELETE | /api/students/:id        | Delete a student         |

### Query parameters for GET /api/students

| Param      | Example              | Description               |
|------------|----------------------|---------------------------|
| search     | `?search=arjun`      | Name / email / roll       |
| department | `?department=physics`| Filter by department      |
| status     | `?status=active`     | active/inactive/graduated |
| semester   | `?semester=5`        | Exact semester            |
| minGpa     | `?minGpa=7.0`        | GPA lower bound           |
| maxGpa     | `?maxGpa=10.0`       | GPA upper bound           |
| sortBy     | `?sortBy=gpa`        | id/name/gpa/semester/...  |
| order      | `?order=asc`         | asc or desc               |
| page       | `?page=2`            | Page number (default 1)   |
| limit      | `?limit=20`          | Per page (max 100)        |

---

## Fixes applied (vs. original submission)

| # | File | Problem | Fix |
|---|------|---------|-----|
| 1 | `schema.ts` | `updatedAt` used `.defaultNow()` only — never updated on PUT | Added `.$onUpdateFn(() => new Date())` |
| 2 | `main.ts` | `ValidationPipe` was missing `forbidNonWhitelisted: true` | Enabled `whitelist`, `forbidNonWhitelisted`, `transform` |
| 3 | `students.controller.ts` | Per-route `@UsePipes(new ValidationPipe(...))` duplicated the global pipe with conflicting options | Removed; global pipe handles all routes |
| 4 | `package.json` | `@nestjs/serve-static` was used in `app.module.ts` but not listed as a dependency | Added `"@nestjs/serve-static": "^4.0.0"` |
| 5 | `dto/*.ts` | `dateOfBirth` validated only by `MinLength(10)` — accepted any 10+ char string | Added `@Matches(/^\d{4}-\d{2}-\d{2}$/)` regex guard |
| 6 | `students.service.ts` | Duplicate-check used `` sql`id != ${id}` `` (unqualified column) | Changed to `sql\`${students.id} != ${id}\`` (Drizzle column ref) |
| 7 | `seed.ts` | Re-running the seed crashed on unique constraint | Added `.onConflictDoNothing()` for idempotent reruns |

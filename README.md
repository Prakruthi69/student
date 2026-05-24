# 🎓 Student Management CRUD — NestJS + TypeScript + PostgreSQL + Drizzle ORM

A complete full-stack CRUD application for managing students, built with **NestJS** — both backend API and frontend served from the same server.

---

## 🏗️ Project Structure

```
student-crud/
├── src/
│   ├── db/
│   │   ├── db.ts                    ← Drizzle ORM connection (pg Pool)
│   │   ├── schema.ts                ← PostgreSQL table + enum definitions
│   │   └── seed.ts                  ← Seeds 10 sample students
│   ├── students/
│   │   ├── dto/
│   │   │   ├── create-student.dto.ts  ← Validation rules (POST)
│   │   │   └── update-student.dto.ts  ← All-optional validation (PUT)
│   │   ├── students.controller.ts   ← REST route handlers
│   │   ├── students.service.ts      ← Drizzle ORM queries & business logic
│   │   └── students.module.ts
│   ├── public/
│   │   ├── index.html               ← Frontend UI (served by NestJS)
│   │   ├── css/style.css            ← Styles
│   │   └── js/app.js                ← Frontend JS (calls REST API)
│   ├── app.module.ts
│   └── main.ts                      ← Bootstrap
├── drizzle/                         ← Auto-generated migrations
├── drizzle.config.ts
├── nest-cli.json
├── tsconfig.json
├── .env.example
└── package.json
```

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set your PostgreSQL connection string
```
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/student_db
PORT=3000
```

### 3. Create the database
```sql
-- In psql or pgAdmin:
CREATE DATABASE student_db;
```

### 4. Push schema to database
```bash
npm run db:push
```

### 5. Seed 10 sample students
```bash
npm run db:seed
```

### 6. Start the server
```bash
npm run start:dev    # Development (hot reload)
npm run start        # Production
```

### 7. Open the app
```
http://localhost:3000
```

---

## 📋 REST API Endpoints

| Method   | Endpoint                   | Description                         |
|----------|----------------------------|-------------------------------------|
| `GET`    | `/api/students`            | List all students (filter, paginate)|
| `GET`    | `/api/students/stats`      | Dashboard statistics                |
| `GET`    | `/api/students/:id`        | Get a single student by ID          |
| `POST`   | `/api/students`            | Create a new student                |
| `PUT`    | `/api/students/:id`        | Update a student                    |
| `DELETE` | `/api/students/:id`        | Delete a student                    |

### Query Parameters — GET /api/students

| Param        | Type    | Example              | Description              |
|--------------|---------|----------------------|--------------------------|
| `search`     | string  | `arjun`              | Search name/email/roll   |
| `department` | string  | `computer_science`   | Filter by department     |
| `status`     | string  | `active`             | Filter by status         |
| `semester`   | number  | `4`                  | Filter by semester       |
| `minGpa`     | string  | `7.0`                | Minimum GPA              |
| `maxGpa`     | string  | `10.0`               | Maximum GPA              |
| `isActive`   | boolean | `true`               | Filter by active flag    |
| `sortBy`     | string  | `gpa`                | Sort field               |
| `order`      | string  | `asc`                | Sort direction           |
| `page`       | number  | `1`                  | Page number              |
| `limit`      | number  | `10`                 | Results per page         |

---

## 🗄️ Database Schema

```sql
CREATE TYPE department_enum AS ENUM (
  'computer_science','mathematics','physics','chemistry',
  'biology','english','history','economics','other'
);

CREATE TYPE status_enum AS ENUM (
  'active','inactive','graduated','suspended'
);

CREATE TABLE students (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255)   NOT NULL,
  email         VARCHAR(255)   NOT NULL UNIQUE,
  phone         VARCHAR(20),
  roll_number   VARCHAR(50)    NOT NULL UNIQUE,
  department    department_enum NOT NULL DEFAULT 'other',
  semester      INTEGER        NOT NULL DEFAULT 1,
  gpa           NUMERIC(3,2)   DEFAULT 0.00,
  address       TEXT,
  status        status_enum    NOT NULL DEFAULT 'active',
  is_active     BOOLEAN        NOT NULL DEFAULT TRUE,
  date_of_birth VARCHAR(20),
  created_at    TIMESTAMP      DEFAULT NOW(),
  updated_at    TIMESTAMP      DEFAULT NOW()
);
```

---

## 🧰 Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Framework  | **NestJS** (Node.js)                        |
| Language   | **TypeScript**                              |
| Database   | **PostgreSQL**                              |
| ORM        | **Drizzle ORM**                             |
| Validation | **class-validator** + **class-transformer** |
| Frontend   | HTML + CSS + Vanilla JS (served by NestJS)  |

---

## 🌱 Other Commands

```bash
npm run db:push       # Sync schema to PostgreSQL
npm run db:generate   # Generate migration files
npm run db:studio     # Open Drizzle Studio (visual DB browser)
npm run db:seed       # Insert 10 sample students
npm run build         # Compile TypeScript
```

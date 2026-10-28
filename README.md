# SpendLens – Simple Full Stack Expense Tracker

**Frontend:** React + Vite + Axios + Chart.js  
**Backend:** Spring Boot 3 (Java 17) + Spring Data JPA + PostgreSQL

```
spend-lens-fullstack/
├── backend/    Spring Boot REST API
└── frontend/   React app
```

## How to run

You need **Java 17+**, **Maven**, **Node.js 18+** and **PostgreSQL**.

**0. Create the database** (once)
```sql
CREATE DATABASE spendlens;
```
Or with Docker:
```bash
docker run --name spendlens-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=spendlens -p 5432:5432 -d postgres:16
```
Default login is `postgres` / `postgres`. To use different credentials, edit
`backend/src/main/resources/application.properties` or set the `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` environment variables.
Tables are created automatically on first start.

**1. Start the backend** (port 8080)
```bash
cd backend
mvn spring-boot:run
```

**2. Start the frontend** (port 5173), in a second terminal
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## REST API

| Method | URL                  | What it does                              |
|--------|----------------------|-------------------------------------------|
| GET    | `/api/expenses`      | All expenses, newest first. Optional `?month=2026-10` filters by month |
| POST   | `/api/expenses`      | Add an expense                            |
| DELETE | `/api/expenses/{id}` | Delete an expense                         |
| GET    | `/api/summary`       | Spent / remaining / top category / category breakdown. Optional `?month=2026-10` (defaults to current month) |

Example POST body:
```json
{ "date": "2026-10-28", "category": "Food", "amount": 250 }
```

## Filter by month

Use the month picker under the form. The summary cards, pie chart, budget alert and the
All Expenses table all update for the selected month. The frontend sends `?month=yyyy-MM`
to the API and the backend filters in the database.

## Backend layers

`Controller` (HTTP) → `Service` (business logic, monthly summary) → `Repository` (JPA) → `PostgreSQL`

- Change the monthly budget in `application.properties` (`app.monthly-budget`).
- No CORS config is needed: the Vite dev server proxies `/api` to `http://localhost:8080`
  (see `frontend/vite.config.js`), so the browser only talks to one origin.

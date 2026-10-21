# Sales System

[🇧🇷 Português](README.md) | 🇺🇸 English

Sales management system with a **Laravel** REST API and a **React + TypeScript** front end. It manages clients, shops, sellers and products, and records sales.

## Stack

| Layer | Technologies |
|---|---|
| Back end | PHP 8.2, Laravel 12, L5-Swagger (OpenAPI) |
| Database | PostgreSQL 12 |
| Front end | React 19, TypeScript, Vite, Tailwind CSS, Axios, React Router, Heroicons |
| Infra | Docker, Docker Compose, GitHub Actions |

## Structure

```
.
├── BACKEND/            # Laravel API (controllers, models, migrations, Swagger)
├── FRONTEND/           # React + Vite SPA
├── docker-compose.yml  # API + front end + PostgreSQL
└── .github/workflows/  # tests, changelog and issue/PR automations
```

## API endpoints

Every resource exposes full CRUD (`GET`, `POST`, `GET /{id}`, `PUT /{id}`, `DELETE /{id}`) under the `/api` prefix:

| Resource | Route |
|---|---|
| Clients | `/api/clients` |
| Shops | `/api/shops` |
| Sellers | `/api/sellers` |
| Products | `/api/products` |
| Sales | `/api/sales` |

Interactive documentation (Swagger) is available at `http://localhost:8000/documentacao-api`.

## Getting started

### With Docker (recommended)

Requirement: **Docker** and **Docker Compose**.

```bash
cp BACKEND/.env.example BACKEND/.env
docker compose up --build -d
docker exec laravelapp php artisan key:generate
docker exec laravelapp php artisan migrate
```

Database variables are already set by `docker-compose.yml`, so there is no need to edit them in `.env`.

| Service | URL |
|---|---|
| Front end | `http://localhost:5173` |
| API | `http://localhost:8000/api` |
| Swagger | `http://localhost:8000/documentacao-api` |
| PostgreSQL | `localhost:5432` (user/password `postgres`) |

### Front end without Docker

Requirement: **Node.js 18+**.

```bash
cd FRONTEND
npm install
npm run dev
```

The front end consumes the API at `http://localhost:8000/api` (set in `src/services/api.ts`).

## Status

- ✅ API with CRUD for every resource and Swagger docs
- 🚧 Front end with **Clients** and **Shops** screens; Sellers, Products and Sales are not implemented yet

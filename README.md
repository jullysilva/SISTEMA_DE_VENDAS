# Sistema de Vendas

🇧🇷 Português | [🇺🇸 English](README.en.md)

Sistema de gestão de vendas com uma API REST em **Laravel** e um front-end em **React + TypeScript**. Permite cadastrar clientes, lojas, vendedores, produtos e registrar vendas.

## Stack

| Camada | Tecnologias |
|---|---|
| Back-end | PHP 8.2, Laravel 12, L5-Swagger (OpenAPI) |
| Banco de dados | PostgreSQL 12 |
| Front-end | React 19, TypeScript, Vite, Tailwind CSS, Axios, React Router, Heroicons |
| Infra | Docker, Docker Compose, GitHub Actions |

## Estrutura

```
.
├── BACKEND/            # API Laravel (controllers, models, migrations, Swagger)
├── FRONTEND/           # SPA React + Vite
├── docker-compose.yml  # API + front-end + PostgreSQL
└── .github/workflows/  # testes, changelog e automações de issues/PRs
```

## Endpoints da API

Todos os recursos possuem CRUD completo (`GET`, `POST`, `GET /{id}`, `PUT /{id}`, `DELETE /{id}`) sob o prefixo `/api`:

| Recurso | Rota |
|---|---|
| Clientes | `/api/clients` |
| Lojas | `/api/shops` |
| Vendedores | `/api/sellers` |
| Produtos | `/api/products` |
| Vendas | `/api/sales` |

A documentação interativa (Swagger) fica disponível em `http://localhost:8000/documentacao-api`.

## Como rodar

### Com Docker (recomendado)

Pré-requisito: **Docker** e **Docker Compose**.

```bash
cp BACKEND/.env.example BACKEND/.env
docker compose up --build -d
docker exec laravelapp php artisan key:generate
docker exec laravelapp php artisan migrate
```

As variáveis de banco já são definidas pelo `docker-compose.yml`, então não é preciso editá-las no `.env`.

| Serviço | URL |
|---|---|
| Front-end | `http://localhost:5173` |
| API | `http://localhost:8000/api` |
| Swagger | `http://localhost:8000/documentacao-api` |
| PostgreSQL | `localhost:5432` (usuário/senha `postgres`) |

### Front-end sem Docker

Pré-requisito: **Node.js 18+**.

```bash
cd FRONTEND
npm install
npm run dev
```

O front-end consome a API em `http://localhost:8000/api` (configurado em `src/services/api.ts`).

## Status

- ✅ API com CRUD de todos os recursos e documentação Swagger
- 🚧 Front-end com telas de **Clientes** e **Lojas**; Vendedores, Produtos e Vendas ainda não implementados

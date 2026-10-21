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
├── docker-compose.yml  # API + PostgreSQL
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

### Pré-requisitos

- Docker e Docker Compose
- Node.js 18+ (para o front-end)

### Back-end + banco

```bash
cp BACKEND/.env.example BACKEND/.env   # ajuste DB_HOST=db, DB_USERNAME/DB_PASSWORD=postgres
docker compose up --build -d
docker exec laravelapp php artisan key:generate
docker exec laravelapp php artisan migrate
```

A API sobe em `http://localhost:8000/api`.

> ⚠️ O `docker-compose.yml` referencia `./backend` em minúsculas. Em Linux é preciso ajustar para `./BACKEND` (ver [#2](https://github.com/jullysilva/SISTEMA_DE_VENDAS/issues/2)).

### Front-end

```bash
cd FRONTEND
npm install
npm run dev
```

O front-end consome a API em `http://localhost:8000/api` (configurado em `src/services/api.ts`).

## Status

- ✅ API com CRUD de todos os recursos e documentação Swagger
- 🚧 Front-end com telas de **Clientes** e **Lojas**; Vendedores, Produtos e Vendas ainda não implementados

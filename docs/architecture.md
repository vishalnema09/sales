# Backend architecture
- Express API with routes under `backend/src/routes`; `transactions` routes map to controller methods.
- Controller (`transactionsController`) builds aggregation pipelines via `transactionsService` and returns paginated results with meta.
- Data access through Mongoose model `Transaction`; MongoDB stores transaction documents with indexes on text fields, date, region, category, and tags.
- `buildPipeline` constructs `$match`, text-like regex search, sorting, pagination, and option-facet queries for filter options.
- `db.js` initializes the Mongo connection using environment configuration.

# Frontend architecture
- React + Vite single-page app. Entry in `frontend/src/main.jsx`; layout in `layout/MainLayout`.
- State for filters and pagination managed in `pages/Sales.jsx`, passed to presentational components.
- `useTransactions` hook fetches data from the API, handles query string building, loading/error state, and exposes `data` + `meta`.
- UI components: `SearchBar`, `FilterPanel` (multi-select filters and ranges), `SummaryCards`, `TransactionsTable`, `Pagination`.
- API client (`services/api.js`) wraps Axios with a base URL from `VITE_API_URL`.

# Data flow
- User interacts with search/sort/filter controls in `Sales` page; state changes update the `filters` object.
- `useTransactions` serializes filters (arrays joined by commas, empty values removed) and issues `GET /transactions` with query params.
- Backend `transactionsController` invokes `buildPipeline` to apply `$match` filters, regex search, sorting, and pagination, returning `{ data, meta }`.
- UI renders table rows and summary cards from `data`; `Pagination` uses `meta` to request subsequent pages.
- Filter options are fetched from `GET /transactions/options` and populate multi-select controls.

# Folder structure
- `backend/src` — API source (routes, controllers, services, models, utils).
  - `routes/transactions.js` — transactions endpoints and options endpoint.
  - `controllers/transactionsController.js` — request handling and response shaping.
  - `services/transactionsService.js` — aggregation pipeline builder.
  - `models/Transaction.js` — Mongoose schema and indexes.
  - `utils/db.js` — Mongo connection setup.
- `frontend/src` — SPA source (components, hooks, pages, layout, services, styles).
  - `pages/Sales.jsx` — main screen wiring search, filters, data, and pagination.
  - `components/FilterPanel.jsx` — multi-select filters and clear-all control.
  - `hooks/useTransactions.js` — data fetching hook with query serialization.
  - `services/api.js` — Axios instance.

# Module responsibilities
- `Transaction` model: schema definition, indexes, Mongo collection access.
- `transactionsService.buildPipeline`: translate query params into Mongo aggregation (filters, search, sort, pagination).
- `transactionsController.getTransactions`: orchestrate pipeline execution and format response/meta.
- `transactions routes`: expose `/transactions` and `/transactions/options`.
- `useTransactions` hook: serialize filters, fetch data, manage loading/error/meta state.
- `FilterPanel`/`SearchBar`/`Pagination`: collect user input and drive filter/sort/page state.
- `TransactionsTable`/`SummaryCards`: render transactional data and summary metrics.


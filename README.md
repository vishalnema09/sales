# Overview
Sales analytics dashboard for browsing transactions with search, multi-select filters, sorting, and paginated results backed by an Express + MongoDB API. Provides summary cards, tabular data, and filter options sourced from the backend. Built with React and Vite for a fast local development experience.

# Tech Stack
- Frontend: React, Vite, Axios, Tailwind-style utility classes
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

# Search Implementation Summary
- Text search input updates the `q` parameter and triggers `useTransactions`.
- Backend matches `phoneNumber`, `customerName`, `productName`, or `transactionId` via case-insensitive regex in the aggregation pipeline.

# Filter Implementation Summary
- Multi-select filters for region, gender, product category, tags, and payment method send comma-separated arrays to the API.
- Numeric range filters for age and date range are applied in the aggregation `$match`.
- Filters can be combined simultaneously; a clear-all resets all filter params.

# Sorting Implementation Summary
- Dropdown controls `sortBy` (`date`, `quantity`, `customerName`) and `sortDir` (`asc`/`desc`).
- Backend orders results in the aggregation pipeline before pagination.

# Pagination Implementation Summary
- Client sends `page` and `limit`; backend returns `meta` with `total`, `page`, `pages`, `limit`.
- UI renders pagination controls using `meta` and refetches on page change.

# Setup Instructions
1) Backend: create `.env` with `MONGO_URI` and `PORT` (default 5000); run `npm install` then `npm start` from `backend/`.
2) Frontend: run `npm install` then `npm run dev` from `frontend/`; ensure `VITE_API_URL` points to the backend (default `http://localhost:5000`).
3) Open the shown local URL to use the app.

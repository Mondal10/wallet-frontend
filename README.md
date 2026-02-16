# Wallet Transaction Frontend

```
Note: Backend is deployed on Render.
So the first API call may take a while to boot the server and load, as inactive instances are spun off in the free tier.
```

Hosted at [Netlify hosted app](https://walletfrontend.netlify.app/)

Video demo: [Loom link](https://www.loom.com/share/544c579db56b4365bc1c8dc191327af5)

A Vue 3 + TanStack Table powered frontend for managing wallets and transactions.

Supports:

- Wallet setup
- Transaction listing (server-side pagination)
- Credit / Debit entries
- CSV export
- Clean responsive UI

---

## Tech Stack

| Technology              | Purpose                 |
| ----------------------- | ----------------------- |
| Vue 3 (Composition API) | Frontend framework      |
| Pinia                   | State management        |
| Axios                   | API communication       |
| TanStack Vue Table      | Data table & pagination |
| Tailwind CSS            | UI styling              |

---

## Project Setup

I have used [pnpm](https://pnpm.io/) for package management. You can use your preferred package manager.

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm run dev
```

App runs at:

```
http://localhost:5173
```

---

## Environment Variables

Create `.env` file:

```env
VITE_WALLET_API_URL=https://wallet-backend-7vnk.onrender.com

```

---

## Table Features

- Server-side pagination
- Sorting (Date and Amount column)
- Dynamic page size
- Loading skeleton
- Currency formatting (INR)
- Date formatting

---

## CSV Export

Handled via backend endpoint.
Frontend triggers download using blob response.

---

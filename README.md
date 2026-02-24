<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/115T3YVJu9Xao53U2_uoO-Ho6KrcRRKS3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and fill in required values (Discord + optional API/DB paths).
3. Run frontend + API together:
   `npm run dev`

The API runs on `http://127.0.0.1:4000` by default and stores SQLite files under `./data`.

## SQLite Environments

- Development DB path: `SQLITE_DEV_DB_PATH` (default `./data/development.sqlite`)
- Production DB path: `SQLITE_PROD_DB_PATH` (default `./data/production.sqlite`)
- Optional override: `SQLITE_DB_PATH` (if set, this wins for any environment)
- Environment switch: `APP_ENV=development|production`

Production database files are gitignored (`*.sqlite`, `data/*.sqlite`).

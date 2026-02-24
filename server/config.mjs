import path from 'node:path';

export const CONTENT_KEYS = [
  'officers',
  'progress',
  'consumables',
  'tactics',
  'epValues',
  'rules',
  'guides',
  'heroConfig'
];

export const CONTENT_KEY_SET = new Set(CONTENT_KEYS);

const normalizeEnv = (value) => String(value || '').trim().toLowerCase();

export const resolveRuntimeConfig = () => {
  const runtimeEnv = normalizeEnv(process.env.APP_ENV || process.env.NODE_ENV || 'development');
  const isProduction = runtimeEnv === 'production';
  const defaultDbPath = isProduction ? './data/production.sqlite' : './data/development.sqlite';
  const selectedDbPath = process.env.SQLITE_DB_PATH
    || (isProduction ? process.env.SQLITE_PROD_DB_PATH : process.env.SQLITE_DEV_DB_PATH)
    || defaultDbPath;

  return {
    runtimeEnv,
    isProduction,
    apiPort: Number(process.env.API_PORT || 4000),
    dbPath: path.resolve(process.cwd(), selectedDbPath)
  };
};

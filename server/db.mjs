import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import initSqlJs from 'sql.js';
import { CONTENT_KEYS } from './config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlWasmPath = path.resolve(__dirname, '../node_modules/sql.js/dist');

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

const UPSERT_SQL = `
INSERT INTO content (key, value, updated_at)
VALUES (?, ?, datetime('now'))
ON CONFLICT(key) DO UPDATE SET
  value = excluded.value,
  updated_at = datetime('now');
`;

const SELECT_ALL_SQL = 'SELECT key, value, updated_at FROM content;';
const SELECT_ONE_SQL = 'SELECT key, value, updated_at FROM content WHERE key = ?;';

const parseStoredValue = (rawValue) => {
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
};

export const createContentStore = async (dbPath) => {
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(sqlWasmPath, file)
  });

  const dbDir = path.dirname(dbPath);
  await fs.mkdir(dbDir, { recursive: true });

  let db;
  if (existsSync(dbPath)) {
    const fileBuffer = await fs.readFile(dbPath);
    db = new SQL.Database(new Uint8Array(fileBuffer));
  } else {
    db = new SQL.Database();
  }

  db.run(CREATE_TABLE_SQL);

  const persist = async () => {
    const bytes = db.export();
    await fs.writeFile(dbPath, Buffer.from(bytes));
  };

  const getAll = () => {
    const result = {};
    const stmt = db.prepare(SELECT_ALL_SQL);
    while (stmt.step()) {
      const row = stmt.getAsObject();
      if (!row.key) continue;
      result[String(row.key)] = parseStoredValue(String(row.value ?? 'null'));
    }
    stmt.free();
    return result;
  };

  const getOne = (key) => {
    const stmt = db.prepare(SELECT_ONE_SQL);
    stmt.bind([key]);
    const found = stmt.step();
    if (!found) {
      stmt.free();
      return null;
    }
    const row = stmt.getAsObject();
    stmt.free();
    return {
      key: String(row.key),
      value: parseStoredValue(String(row.value ?? 'null')),
      updatedAt: String(row.updated_at || '')
    };
  };

  const upsertOne = async (key, value) => {
    db.run(UPSERT_SQL, [key, JSON.stringify(value)]);
    await persist();
    return getOne(key);
  };

  const upsertMany = async (entries) => {
    db.run('BEGIN');
    try {
      for (const [key, value] of entries) {
        db.run(UPSERT_SQL, [key, JSON.stringify(value)]);
      }
      db.run('COMMIT');
    } catch (err) {
      db.run('ROLLBACK');
      throw err;
    }
    await persist();
  };

  const initializeMissingKeys = async () => {
    const existing = new Set(Object.keys(getAll()));
    const missing = CONTENT_KEYS.filter((key) => !existing.has(key));
    if (!missing.length) return;
    const defaults = missing.map((key) => [key, null]);
    await upsertMany(defaults);
  };

  await initializeMissingKeys();

  return {
    getAll,
    getOne,
    upsertOne,
    upsertMany
  };
};

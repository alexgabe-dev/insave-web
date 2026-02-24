import 'dotenv/config';
import express from 'express';
import { resolveRuntimeConfig, CONTENT_KEY_SET } from './config.mjs';
import { createContentStore } from './db.mjs';

const config = resolveRuntimeConfig();
const app = express();
const store = await createContentStore(config.dbPath);

app.use(express.json({ limit: '25mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    env: config.runtimeEnv,
    dbPath: config.dbPath
  });
});

app.get('/api/content', (_req, res) => {
  res.json({
    ok: true,
    data: store.getAll()
  });
});

app.get('/api/content/:key', (req, res) => {
  const key = String(req.params.key || '');
  if (!CONTENT_KEY_SET.has(key)) {
    res.status(400).json({ ok: false, error: `Invalid content key: ${key}` });
    return;
  }
  res.json({
    ok: true,
    data: store.getOne(key)
  });
});

app.put('/api/content/:key', async (req, res, next) => {
  try {
    const key = String(req.params.key || '');
    if (!CONTENT_KEY_SET.has(key)) {
      res.status(400).json({ ok: false, error: `Invalid content key: ${key}` });
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(req.body || {}, 'value')) {
      res.status(400).json({ ok: false, error: 'Missing "value" in request body.' });
      return;
    }
    const updated = await store.upsertOne(key, req.body.value);
    res.json({ ok: true, data: updated });
  } catch (err) {
    next(err);
  }
});

app.put('/api/content', async (req, res, next) => {
  try {
    const data = req.body?.data;
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      res.status(400).json({ ok: false, error: 'Body must contain a "data" object.' });
      return;
    }
    const entries = Object.entries(data);
    for (const [key] of entries) {
      if (!CONTENT_KEY_SET.has(key)) {
        res.status(400).json({ ok: false, error: `Invalid content key: ${key}` });
        return;
      }
    }
    await store.upsertMany(entries);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  console.error('[api] unhandled error:', err);
  res.status(500).json({
    ok: false,
    error: err instanceof Error ? err.message : 'Internal server error'
  });
});

app.listen(config.apiPort, () => {
  console.log(`[api] running on http://127.0.0.1:${config.apiPort}`);
  console.log(`[api] env=${config.runtimeEnv}`);
  console.log(`[api] sqlite=${config.dbPath}`);
});

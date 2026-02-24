import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import multer from 'multer';
import { resolveRuntimeConfig, CONTENT_KEY_SET } from './config.mjs';
import { createContentStore } from './db.mjs';

const config = resolveRuntimeConfig();
const app = express();
const store = await createContentStore(config.dbPath);

const MEDIA_MAX_MB = Number(process.env.MEDIA_MAX_MB || 200);
const mediaDir = path.resolve(process.cwd(), process.env.MEDIA_DIR || 'media');
await fs.mkdir(mediaDir, { recursive: true });

const mimeToExt = {
  'video/mp4': '.mp4',
  'video/webm': '.webm',
  'video/quicktime': '.mov',
  'video/x-matroska': '.mkv',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif'
};

const upload = multer({
  storage: multer.diskStorage({
    destination: mediaDir,
    filename: (_req, file, cb) => {
      const extFromName = path.extname(file.originalname || '').toLowerCase();
      const extFromMime = mimeToExt[file.mimetype] || '';
      const ext = extFromName || extFromMime;
      const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
      const random = crypto.randomBytes(6).toString('hex');
      cb(null, `${stamp}-${random}${ext}`);
    }
  }),
  limits: { fileSize: MEDIA_MAX_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const isAllowed = file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/');
    if (!isAllowed) {
      cb(new Error('Only image or video uploads are allowed.'));
      return;
    }
    cb(null, true);
  }
});

app.use(express.json({ limit: '25mb' }));
app.use('/media', express.static(mediaDir, { maxAge: '365d', immutable: true }));

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

app.post('/api/media', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      const isLimit = err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE';
      res.status(isLimit ? 413 : 400).json({
        ok: false,
        error: isLimit
          ? `File too large. Max size is ${MEDIA_MAX_MB} MB.`
          : (err instanceof Error ? err.message : 'Upload failed.')
      });
      return;
    }
    if (!req.file) {
      res.status(400).json({ ok: false, error: 'Missing file in upload.' });
      return;
    }
    res.json({ ok: true, url: `/media/${req.file.filename}` });
  });
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

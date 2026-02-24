export type ContentKey =
  | 'officers'
  | 'progress'
  | 'consumables'
  | 'tactics'
  | 'epValues'
  | 'rules'
  | 'guides'
  | 'heroConfig';

export type ContentSnapshot = Partial<Record<ContentKey, unknown>>;

const apiBase = ((import.meta as any).env?.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');

const toUrl = (path: string) => `${apiBase}${path.startsWith('/') ? path : `/${path}`}`;

const parseJson = async (res: Response) => {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const error = data?.error || `API request failed (${res.status})`;
    throw new Error(error);
  }
  return data;
};

export const fetchContentSnapshot = async (): Promise<ContentSnapshot> => {
  const res = await fetch(toUrl('/content'));
  const data = await parseJson(res);
  if (!data?.data || typeof data.data !== 'object' || Array.isArray(data.data)) {
    return {};
  }
  return data.data as ContentSnapshot;
};

export const saveContentSection = async (key: ContentKey, value: unknown): Promise<void> => {
  const res = await fetch(toUrl(`/content/${encodeURIComponent(key)}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value })
  });
  await parseJson(res);
};

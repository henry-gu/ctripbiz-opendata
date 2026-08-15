export class TtlLruCache {
  #entries = new Map();

  constructor(maxEntries = 300) {
    this.maxEntries = maxEntries;
  }

  get(key, { allowStaleMs = 0 } = {}) {
    const entry = this.#entries.get(key);
    if (!entry) return null;
    const now = Date.now();
    const stale = entry.expiresAt <= now;
    if (stale && now - entry.expiresAt > allowStaleMs) {
      this.#entries.delete(key);
      return null;
    }
    this.#entries.delete(key);
    this.#entries.set(key, entry);
    return { value: entry.value, expiresAt: entry.expiresAt, stale };
  }

  set(key, value, ttlMs) {
    this.#entries.delete(key);
    this.#entries.set(key, { value, expiresAt: Date.now() + ttlMs });
    while (this.#entries.size > this.maxEntries) {
      this.#entries.delete(this.#entries.keys().next().value);
    }
  }

  get size() {
    return this.#entries.size;
  }
}

export function stableCacheKey(endpoint, payload) {
  return `${endpoint}:${JSON.stringify(sortValue(payload))}`;
}

function sortValue(value) {
  if (Array.isArray(value)) return value.map(sortValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortValue(value[key])]));
}

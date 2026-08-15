const SECRET_KEYS = /^(appkey|appsecurity|ticket|authorization|x-.*token)$/i;
const IDENTITY_KEYS = /^(uid|userid|corpid)$/i;

export function redact(value, key = "") {
  if (SECRET_KEYS.test(key)) return "***";
  if (IDENTITY_KEYS.test(key) && typeof value === "string") {
    return value.length <= 4 ? "***" : `${value.slice(0, 2)}***${value.slice(-2)}`;
  }
  if (Array.isArray(value)) return value.map((item) => redact(item));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [childKey, redact(childValue, childKey)]));
}

export class DiagnosticBuffer {
  #items = new Map();

  constructor(maxEntries = 20, ttlMs = 30 * 60 * 1000) {
    this.maxEntries = maxEntries;
    this.ttlMs = ttlMs;
  }

  set(id, value) {
    this.prune();
    this.#items.set(id, { value: redact(value), expiresAt: Date.now() + this.ttlMs });
    while (this.#items.size > this.maxEntries) this.#items.delete(this.#items.keys().next().value);
  }

  get(id) {
    this.prune();
    return this.#items.get(id)?.value ?? null;
  }

  prune() {
    const now = Date.now();
    for (const [key, entry] of this.#items) if (entry.expiresAt <= now) this.#items.delete(key);
  }
}

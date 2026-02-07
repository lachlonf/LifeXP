export function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}

export function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

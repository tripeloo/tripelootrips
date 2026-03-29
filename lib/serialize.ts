import { ObjectId } from "mongodb";

/** Deep clone for RSC → client props (ObjectId → string). */
export function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value, replacer)) as T;
}

function replacer(_key: string, val: unknown) {
  if (val instanceof ObjectId) return String(val);
  if (val instanceof Date) return val.toISOString();
  return val;
}

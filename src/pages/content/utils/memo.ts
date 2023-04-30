import { createMemo } from "solid-js";

export function createLazyMemo<T>(fn: (v?: T) => T, value?: T): () => T {
  let memo: () => T;
  return () => {
    if (!memo) memo = createMemo(fn, value);
    return memo();
  };
}

"use client";

import { useEffect, useState } from "react";

/** Returns true after first client render — guards against hydration mismatch
 *  for persisted (localStorage) state like wishlist/compare. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

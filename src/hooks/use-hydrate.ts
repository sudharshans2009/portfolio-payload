"use client";

import { useEffect, useState } from "react";

export function useHydrate<T>(
  useFn: (value: unknown) => unknown,
  [defaultState, defaultValue]: unknown[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawDepsFn: (value: any) => any[],
): T {
  const [value, setValue] = useState(defaultState || null);
  const fn = useFn(defaultValue);
  const deps =
    rawDepsFn({
      value: {
        get: value,
        set: setValue,
        default: { state: defaultState, value: defaultValue },
      },
      fn,
    }) || [];

  useEffect(() => {
    setValue(fn || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return (value || defaultState) as T;
}

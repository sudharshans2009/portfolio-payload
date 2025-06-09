import { useState, useMemo } from "react";

export function useSearch<T>(
  data: T[],
  filterFn: (item: T, query: string) => boolean | undefined,
) {
  const [query, setQuery] = useState("");
  const filteredList = useMemo(
    () => data.filter((item) => filterFn(item, query)),
    [data, filterFn, query],
  );

  return {
    filtered: filteredList,
    query: {
      get: query,
      set: setQuery,
    },
  };
}

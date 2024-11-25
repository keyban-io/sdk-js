import React from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchParam(name: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    searchParams.get(name) ?? "",
    React.useCallback(
      (value: string) => {
        setSearchParams((prev) => {
          prev.set(name, value);
          return prev;
        });
      },
      [setSearchParams, name],
    ),
  ] as const;
}

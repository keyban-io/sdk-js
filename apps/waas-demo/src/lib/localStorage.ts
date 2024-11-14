import React from "react";

function loadStorage<T>(key: string, initialValue: T | (() => T)): T {
  const init =
    initialValue instanceof Function ? initialValue : () => initialValue;

  try {
    const str = localStorage.getItem(key);
    if (str == null) return init();
    return JSON.parse(str) as T;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (_err: any) {
    return init();
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState<T>(loadStorage(key, initialValue));

  React.useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === key) setState(loadStorage(key, initialValue));
    };

    window.addEventListener("storage", listener);

    return () => window.removeEventListener("storage", listener);
  }, [key, initialValue]);

  return [
    state,
    React.useCallback(
      (value: T | ((prev: T) => T)) =>
        setState((prev) => {
          const next = value instanceof Function ? value(prev) : value;
          localStorage.setItem(key, JSON.stringify(next));
          return next;
        }),
      [key],
    ),
  ];
}

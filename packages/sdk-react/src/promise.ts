import { KeybanClient } from "@keyban/sdk-base";
import React from "react";
import { useKeybanClient } from "~/provider";

type Cache = Map<string, WrappedPromise<unknown>>;

// We use a WeakMap so cache gets automatically removed when
// client gets destroyed
const caches: WeakMap<KeybanClient, Cache> = new WeakMap();

const CacheContext = React.createContext<Cache>(new Map());

export function PromiseCacheProvider({ children }: React.PropsWithChildren) {
  const client = useKeybanClient();

  let cache = caches.get(client);
  if (!cache) {
    cache = new Map();
    caches.set(client, cache);
  }

  return React.createElement(CacheContext.Provider, { value: cache }, children);
}

enum PromiseState {
  Pending,
  Fulfilled,
  Rejected,
}

type WrappedPromise<T> =
  | { status: PromiseState.Pending; value: null; promise: Promise<T> }
  | { status: PromiseState.Fulfilled; value: T; promise: Promise<T> }
  | { status: PromiseState.Rejected; value: Error; promise: Promise<T> };

export type UsePromiseOptions<B extends boolean> = {
  suspense: B;
};

type PromiseResultExtra = {
  refresh: () => void;
  reset: () => void;
  loading: boolean;
};

type PromiseResult<T> = {
  [S in PromiseState]: {
    readonly [PromiseState.Pending]: [null, null, PromiseResultExtra];
    readonly [PromiseState.Fulfilled]: [T, null, PromiseResultExtra];
    readonly [PromiseState.Rejected]: [null, Error, PromiseResultExtra];
  }[S];
};

export type UsePromiseResult<T, B extends boolean> =
  | (B extends false ? PromiseResult<T>[PromiseState.Pending] : never)
  | PromiseResult<T>[PromiseState.Fulfilled]
  | PromiseResult<T>[PromiseState.Rejected];

const updateWrappedPromise = <T>(wrapped: WrappedPromise<T>) => {
  wrapped.promise
    .then((result) => {
      wrapped.status = PromiseState.Fulfilled;
      wrapped.value = result;

      return result;
    })
    .catch((error) => {
      wrapped.status = PromiseState.Rejected;
      wrapped.value = error;

      throw error;
    });
};

export function usePromise<T, B extends boolean>(
  key: string,
  promise: () => Promise<T>,
  options?: UsePromiseOptions<B>,
): UsePromiseResult<T, B> {
  const cache = React.useContext(CacheContext);
  let cached = cache.get(key) as WrappedPromise<T> | undefined;

  if (!cached) {
    cached = {
      status: PromiseState.Pending,
      value: null,
      promise: promise(),
    };

    updateWrappedPromise(cached);

    cache.set(key, cached);
  }

  const [loading, setLoading] = React.useState(
    cached.status === PromiseState.Pending,
  );
  React.useEffect(() => {
    cached.promise.finally(() => setLoading(false));
  }, [cached.promise]);

  const refresh = React.useCallback(() => {
    setLoading(true);

    cached.promise = promise();
    updateWrappedPromise(cached);
  }, [cached, promise]);

  const reset = React.useCallback(() => {
    setLoading(true);
    cache.delete(key);
  }, [cached, promise]);

  const extra: PromiseResultExtra = { refresh, reset, loading };

  switch (cached.status) {
    case PromiseState.Pending:
      if (options?.suspense) throw cached.promise;
      return [null, null, extra] as UsePromiseResult<T, B>;
    case PromiseState.Fulfilled:
      return [cached.value, null, extra];
    case PromiseState.Rejected:
      return [null, cached.value, extra];
  }
}

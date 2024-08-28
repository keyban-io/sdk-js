import React from "react";

const CacheContext = React.createContext(new Map());

export function PromiseCacheProvider({ children }: React.PropsWithChildren) {
  const cache = React.useMemo(() => new Map(), []);
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
  isLoading: boolean;
};

type PromiseResult<T> = {
  [S in PromiseState]: {
    [PromiseState.Pending]: [null, null, PromiseResultExtra];
    [PromiseState.Fulfilled]: [T, null, PromiseResultExtra];
    [PromiseState.Rejected]: [null, Error, PromiseResultExtra];
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
  const cache: Map<string, WrappedPromise<T>> = React.useContext(CacheContext);

  let cached = cache.get(key);

  if (!cached) {
    cached = {
      status: PromiseState.Pending,
      value: null,
      promise: promise(),
    };

    updateWrappedPromise(cached);

    cache.set(key, cached);
  }

  const [isLoading, setIsLoading] = React.useState(
    cached.status === PromiseState.Pending,
  );
  React.useEffect(() => {
    cached.promise.finally(() => setIsLoading(false));
  }, [cached.promise]);

  const refresh = React.useCallback(() => {
    setIsLoading(true);

    cached.promise = promise();
    updateWrappedPromise(cached);
  }, [cached, promise]);

  const extra: PromiseResultExtra = { refresh, isLoading };

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

import React from "react";

const CacheContext = React.createContext(new Map());

export function PromiseCacheProvider({ children }: React.PropsWithChildren) {
  const cache = React.useMemo(() => new Map(), []);

  return (
    <CacheContext.Provider value={cache}>{children}</CacheContext.Provider>
  );
}

enum PromiseState {
  Pending,
  Fulfilled,
  Rejected,
}

type WrappedPromise<T> =
  | { status: PromiseState.Pending; value: null; promise: Promise<T> }
  | { status: PromiseState.Fulfilled; value: T; promise: Promise<T> }
  | { status: PromiseState.Rejected; value: any; promise: Promise<T> };

export type WrappedPromiseResultExtra = {
  refresh: () => void;
  isLoading: boolean;
};
export type WrappedPromiseResult<T> =
  | [T, null, WrappedPromiseResultExtra]
  | [null, Error, WrappedPromiseResultExtra];

export function useWrappedPromise<T>(
  key: string,
  promise: () => Promise<T>,
): WrappedPromiseResult<T> {
  const cache: Map<string, WrappedPromise<T>> = React.useContext(CacheContext);

  let cached = cache.get(key);

  if (!cached) {
    const wrapped: WrappedPromise<T> = {
      status: PromiseState.Pending,
      value: null,
      promise: promise()
        .then((result) => {
          wrapped.status = PromiseState.Fulfilled;
          wrapped.value = result;
          setIsLoading(false);

          return result;
        })
        .catch((error) => {
          wrapped.status = PromiseState.Rejected;
          wrapped.value = error;
          setIsLoading(false);

          throw error;
        }),
    };

    cache.set(key, wrapped);
    cached = wrapped;
  }

  // Still use some state in case we want to opt-out of
  // suspense by catching the promise
  const [isLoading, setIsLoading] = React.useState(
    cached.status === PromiseState.Pending,
  );

  const refresh = React.useCallback(() => {
    cached.promise = promise()
      .then((result) => {
        cached.status = PromiseState.Fulfilled;
        cached.value = result;
        setIsLoading(false);

        return result;
      })
      .catch((error) => {
        cached.status = PromiseState.Rejected;
        cached.value = error;
        setIsLoading(false);

        throw error;
      });
  }, [cached, promise]);

  switch (cached.status) {
    case PromiseState.Pending:
      throw cached.promise;
    case PromiseState.Fulfilled:
      return [cached.value, null, { refresh, isLoading }];
    case PromiseState.Rejected:
      return [null, cached.value, { refresh, isLoading }];
  }
}

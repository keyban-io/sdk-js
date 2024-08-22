import React from "react";
import { useKeybanClient } from "./provider";
import { KeybanApiStatus } from "@keyban/sdk-base";

export function useKeybanApiStatus() {
  const client = useKeybanClient();

  const [apiStatus, setApiStatus] = React.useState<KeybanApiStatus>();
  React.useEffect(() => {
    let canceled = false;
    client.apiStatus().then((status) => {
      if (!canceled) setApiStatus(status);
    });
    return () => {
      canceled = true;
    };
  }, [client]);

  return apiStatus;
}

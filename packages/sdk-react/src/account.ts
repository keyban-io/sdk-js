import React from "react";
import { useKeyban } from "./provider";
import { KeybanAccount } from "@keyban/sdk-base";

export function useKeybanAccount(keyId: string) {
  const keyban = useKeyban();
  const [account, setAccount] = React.useState<KeybanAccount>();

  React.useEffect(() => {
    let canceled = false;

    keyban.client.initialize(keyId).then((account) => {
      if (!canceled) setAccount(account);
    });

    return () => {
      canceled = true;
    };
  }, [keyId]);

  return account;
}

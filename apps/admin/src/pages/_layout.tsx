import { CircularProgress, Stack } from "@mui/material";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";
import React from "react";

import Header from "~/components/Header";
import KeybanLogo from "~/components/KeybanLogo";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <ThemedLayoutV2
      Header={() => <Header sticky />}
      Title={(props) => (
        <ThemedTitleV2
          {...props}
          icon={<KeybanLogo width={24} height={24} />}
          text="Keyban"
        />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
}

Layout.Loader = () => (
  <Stack alignItems="center">
    <CircularProgress />
  </Stack>
);

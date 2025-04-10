import { User } from "@auth0/auth0-react";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useGetIdentity } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";

import LocaleSwitcher from "~/components/LocaleSwitcher";
import { ColorMode, useColorMode } from "~/lib/theme";

export default function Header({
  sticky = true,
}: RefineThemedLayoutV2HeaderProps) {
  const { mode, toggleMode } = useColorMode();

  const { data: user } = useGetIdentity<User>();

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <HamburgerMenu />
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            {user && (
              <Avatar
                src={user?.picture}
                alt={user?.nickname}
                sx={{ width: 32, height: 32 }}
              />
            )}

            <IconButton color="inherit" onClick={toggleMode}>
              {mode === ColorMode.Dark ? (
                <LightModeOutlined />
              ) : (
                <DarkModeOutlined />
              )}
            </IconButton>

            <LocaleSwitcher />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

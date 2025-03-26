// src/components/ApplicationHeader.tsx
import { faBell, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"; // Import des icônes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type KeybanNetwork, useKeybanAuth } from "@keyban/sdk-react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

import NetworkSelector from "~/components/NetworkSelector";

type ApplicationHeaderProps = {
  selectedNetworkId?: KeybanNetwork;
  onSelectNetwork?: (chainId: KeybanNetwork) => void;
  onToggleTheme: () => void; // Nouvelle prop pour basculer le thème
  themeMode: "light" | "dark"; // Nouvelle prop pour le mode actuel
};

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  selectedNetworkId,
  onSelectNetwork,
  onToggleTheme, // Déstructuration de la nouvelle prop
  themeMode, // Déstructuration de la nouvelle prop
}) => {
  const { logout: keybanLogout, isAuthenticated: isKeybanAuthenticated } =
    useKeybanAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    if (isKeybanAuthenticated) {
      keybanLogout();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 48,
            width: 48,
            paddingRight: 1,
          }}
          alt="KEYBAN logo"
          src="/images/keyban-logo-small.svg"
        />
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          KEYBAN WAAS Demo
        </Typography>

        {selectedNetworkId && onSelectNetwork && <Box sx={{ flexGrow: 1 }} />}

        <Box
          sx={{
            display: { md: "flex" },
            alignItems: "center",
          }}
        >
          {selectedNetworkId && onSelectNetwork && (
            <NetworkSelector
              network={selectedNetworkId}
              onChange={onSelectNetwork}
            />
          )}

          {/* Bouton de Bascule du Thème */}
          <IconButton onClick={onToggleTheme} color="inherit" sx={{ mx: 1 }}>
            <FontAwesomeIcon icon={themeMode === "light" ? faMoon : faSun} />
          </IconButton>

          {selectedNetworkId && onSelectNetwork && (
            <IconButton color="inherit" sx={{ mx: 1 }}>
              <Badge badgeContent={4} color="secondary">
                <FontAwesomeIcon icon={faBell} />
              </Badge>
            </IconButton>
          )}

          {selectedNetworkId && onSelectNetwork && (
            <>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleMenuOpen}
                  color="inherit"
                  sx={{ p: 0, ml: 1 }}
                >
                  <Avatar sx={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => logout()}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationHeader;

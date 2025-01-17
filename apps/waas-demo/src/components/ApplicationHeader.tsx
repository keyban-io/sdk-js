// src/components/ApplicationHeader.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { faBell, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"; // Import des icônes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type KeybanChain, useKeybanAuth } from "@keyban/sdk-react";
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
  selectedChainId?: KeybanChain;
  onSelectChain?: (chainId: KeybanChain) => void;
  onToggleTheme: () => void; // Nouvelle prop pour basculer le thème
  themeMode: "light" | "dark"; // Nouvelle prop pour le mode actuel
};

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  selectedChainId,
  onSelectChain,
  onToggleTheme, // Déstructuration de la nouvelle prop
  themeMode, // Déstructuration de la nouvelle prop
}) => {
  const { user, logout: auth0Logout } = useAuth0();
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
      keybanLogout().then(() => {
        console.log("isKeybanAuthenticated", isKeybanAuthenticated);
        auth0Logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        });
      });
    } else {
      auth0Logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
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

        {selectedChainId && onSelectChain && <Box sx={{ flexGrow: 1 }} />}

        <Box
          sx={{
            display: { md: "flex" },
            alignItems: "center",
          }}
        >
          {selectedChainId && onSelectChain && (
            <NetworkSelector chain={selectedChainId} onChange={onSelectChain} />
          )}

          {/* Bouton de Bascule du Thème */}
          <IconButton onClick={onToggleTheme} color="inherit" sx={{ mx: 1 }}>
            <FontAwesomeIcon icon={themeMode === "light" ? faMoon : faSun} />
          </IconButton>

          {selectedChainId && onSelectChain && (
            <IconButton color="inherit" sx={{ mx: 1 }}>
              <Badge badgeContent={4} color="secondary">
                <FontAwesomeIcon icon={faBell} />
              </Badge>
            </IconButton>
          )}

          {selectedChainId && onSelectChain && (
            <>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleMenuOpen}
                  color="inherit"
                  sx={{ p: 0, ml: 1 }}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={user?.picture}
                    alt={user?.name}
                  />
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

import { useState } from 'react';

import NetworkSelector from '@/components/NetworkSelector';
import { useAuth0 } from '@auth0/auth0-react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { KeybanChain } from '@keyban/sdk-react';
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
} from '@mui/material';

type ApplicationHeaderProps = {
  selectedChainId: KeybanChain;
  onSelectChain: (chainId: KeybanChain) => void;
};

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  selectedChainId,
  onSelectChain,
}) => {
  const { user, logout } = useAuth0();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElUser(null);
  };

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
      openUrl: false,
    });

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
        <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
          KEYBAN WAAS Demo
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: { md: "flex" },
            alignItems: "center",
          }}
        >
          <NetworkSelector
            selectedChainId={selectedChainId}
            onSelectChain={onSelectChain}
          />
          <IconButton color="inherit" sx={{ mx: 1 }}>
            <Badge badgeContent={4} color="secondary">
              <FontAwesomeIcon icon={faBell} />
            </Badge>
          </IconButton>

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
            <MenuItem onClick={() => logoutWithRedirect()}>
              {" "}
              <Typography sx={{ textAlign: "center" }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationHeader;

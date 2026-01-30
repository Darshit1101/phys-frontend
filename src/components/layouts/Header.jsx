import Logo from "../../assets/logos/NewLogoIcon";
import apiList from "../../constants/apiList";
import useApiCall from "../../hooks/useApiCall";
import { useAuth } from "../../stores/useAuth";
import Icon from "../global/Icon";
import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { LogOut, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ setMobileOpen }) => {
  const theme = useTheme();
  const { name, logout } = useAuth();
  const [profileEl, setProfileEl] = useState(null);
  const profileMenuOpen = Boolean(profileEl);
  const navigate = useNavigate();
  const { apiCall, loading } = useApiCall({
    ...apiList.AUTH.LOGOUT,
    autoFetch: false,
  });

  const handleProfileClick = (event) => {
    setProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileEl(null);
  };

  const handleLogout = async () => {
    try {
      await apiCall();
      logout();
    } catch (error) {
      toast(error.message, { type: "error" });
    } finally {
      handleProfileClose();
    }
  };
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        background: theme.palette.background.blur,
        backdropFilter: `blur(${theme.blur.sm})`,
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack
          sx={{
            visibility: { lg: "hidden" },
            flexDirection: "row",
            gap: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            sx={{ padding: 0 }}
            onClick={() => {
              setMobileOpen(true);
            }}
          >
            <MenuIcon size={"24px"} />
          </IconButton>
        </Stack>

        <Stack
          sx={{
            alignItems: "center",
            visibility: { lg: "hidden" },
            textDecoration: "none",
          }}
          component={Link}
          to="/"
        >
          <Logo sx={{ width: "140px" }} />
        </Stack>

        <IconButton onClick={handleProfileClick}>
          <Avatar
            sx={{
              fontSize: "16px",
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.text.primaryContrast,
              width: { xs: "28px", md: "36px" },
              height: { xs: "28px", md: "36px" },
            }}
          ></Avatar>
        </IconButton>

        <Menu
          id="profile-menu"
          aria-labelledby="profile-button"
          anchorEl={profileEl}
          open={profileMenuOpen}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            mt: "4px",
            "& .MuiPaper-root": {
              minWidth: "100px",
            },
          }}
        >
          <Box px="16px" py="6px">
            <Typography
              variant="subtitle2"
              onClick={() => {
                navigate("/profile");
                setProfileEl(null);
              }}
              sx={{
                cursor: "pointer",
                color: "primary.main",
                display: "block",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {name}
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            sx={{
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: alpha(theme.palette.error.main, 0.05),
              },
            }}
            onClick={handleLogout}
          >
            <ListItemIcon>
              <Button
                loading={loading}
                startIcon={<LogOut size={20} />}
                sx={{ color: "error.main", p: 0, fontSize: "14px" }}
              >
                Log Out
              </Button>
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

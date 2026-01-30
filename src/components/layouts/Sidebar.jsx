import LogoIcon from "../../assets/logos/NewLogoIcon";
import { SIDEBAR_MENUS } from "../../constants/sidebarMenus";
import { useAuth } from "../../stores/useAuth";
import Icon from "../global/Icon";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ width = 240, mobileOpen, setMobileOpen }) => {
  const theme = useTheme();
  const { name } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const SidebarContent = (
    <Box
      sx={{
        width,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: theme.palette.background.blur,
        backdropFilter: `blur(${theme.blur.lg})`,
      }}
    >
      {/* Header */}
      <Toolbar
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          justifyContent: isMobile ? "space-between" : "center",
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
          component={Link}
          to="/"
        >
          {/* <LogoIcon sx={{ width: "160px" }} /> */}
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "text.secondary", mt: 0.5 }}
          >
            Activeedge physiotherapy and fitness
          </Typography>
        </Stack>

        {isMobile && (
          <IconButton onClick={() => setMobileOpen(false)} sx={{ px: 0 }}>
            <X />
          </IconButton>
        )}
      </Toolbar>

      {/* Menu */}
      <List
        sx={{
          px: 1,
          flexGrow: 1,
          gap: 2,
          overflowY: "auto",
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        {SIDEBAR_MENUS.map((menu) => (
          <ListItem key={menu.path} disablePadding>
            <ListItemButton
              component={NavLink}
              to={menu.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "6px",
                "&.active": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.primaryContrast,
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.text.primaryContrast,
                  },
                },
              }}
            >
              <ListItemIcon>
                <Icon
                  icon={menu.icon}
                  sx={{
                    "&.active": {
                      color: theme.palette.text.primaryContrast,
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={menu.title}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          borderRight: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.light,
            cursor: "pointer",
          }}
        />

        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              lineHeight: 0.8,
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
            onClick={() => {
              navigate("/profile");
              setMobileOpen(false);
            }}
          >
            {name}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );

  return (
    <>
      {/* Drawer for mobile */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width,
              boxSizing: "border-box",
            },
          }}
        >
          {SidebarContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            width,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100vh",
            borderRight: `1px solid ${theme.palette.divider}`,
          }}
        >
          {SidebarContent}
        </Box>
      )}
    </>
  );
};

export default Sidebar;

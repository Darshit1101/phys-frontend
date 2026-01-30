import bgImg from "../../assets/bg.webp";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box, Container, Stack } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <Stack
      component="main"
      direction="row"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main content */}
      <Stack
        flexGrow={1}
        sx={{
          minWidth: 0,
          position: "relative",
        }}
      >
        {/* Header */}
        <Header setMobileOpen={setMobileOpen} />

        {/* Outlet/Main content */}
        <Box sx={{ p: { md: "24px" } }}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Layout;

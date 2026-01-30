import bgImg from "../../assets/bg2.webp";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Stack
      component="main"
      justifyContent="center"
      sx={{
        minWidth: "100%",
        minHeight: ["100vh", "100dvh"],
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </Stack>
  );
};

export default AuthLayout;

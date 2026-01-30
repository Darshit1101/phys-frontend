import { useTheme } from "@emotion/react";
import { alpha, Box } from "@mui/material";

function CommonPageLayout({ children, sx, ...prop }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: alpha(theme.palette.background.default, 0.5),
        backdropFilter: `blur(${theme.blur.lg})`,
        borderRadius: "12px",
        boxShadow: theme.customShadows.soft,
        padding: { xs: "12px", md: "20px" },
        ...sx,
      }}
      {...prop}
    >
      {children}
    </Box>
  );
}

export default CommonPageLayout;

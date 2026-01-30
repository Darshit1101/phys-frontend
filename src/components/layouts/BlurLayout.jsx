import { useTheme } from "@emotion/react";
import { alpha, Box } from "@mui/material";

function BlurLayout({ children, sx, ...prop }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: alpha(theme.palette.background.default, 0.5),
        backdropFilter: `blur(${theme.blur.sm})`,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.customShadows.soft,
        ...sx,
      }}
      {...prop}
    >
      {children}
    </Box>
  );
}

export default BlurLayout;

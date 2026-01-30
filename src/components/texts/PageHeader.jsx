import { Box, Stack, Typography, useTheme } from "@mui/material";

const PageHeader = ({ title, subtitle, action }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      gap="10px"
      alignItems="center"
      mb="20px"
      flexWrap="wrap"
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography component="h2" variant="h4" mb="6px">
          {title}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 400,
            color: theme.palette.text.secondary,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {action}
    </Stack>
  );
};

export default PageHeader;

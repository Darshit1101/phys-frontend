import Button from "../../components/global/buttons/Button";
import Input from "../../components/global/inputs/Input";
import PasswordInput from "../../components/global/inputs/PasswordInput";
import BlurLayout from "../../components/layouts/BlurLayout";
import apiList from "../../constants/apiList";
import useApiCall from "../../hooks/useApiCall";
import { useAuth } from "../../stores/useAuth";
import { signInSchema } from "../../validations/signInSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const { setUserDetails } = useAuth();
  const { apiCall } = useApiCall({
    ...apiList.AUTH.LOGIN,
    autoFetch: false,
  });

  const methods = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await apiCall({ body: { email, password } });
      const userData = response.data;
      const message = response.message;
      setUserDetails({
        isLoggedIn: true,
        id: userData?._id,
        email: userData?.email,
        name: userData?.fullName,
      });
      toast.success(message || "Admin logged in successfully");
    } catch (err) {
      toast.error(err?.response.data.message || "Failed to sign in");
    }
  };

  return (
    <BlurLayout
      sx={{
        maxWidth: "720px",
        width: "100%",
        px: "20px",
        py: { xs: "40px", md: "70px" },
        display: "grid",
        placeItem: "center",
      }}
    >
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Welcome back
      </Typography>
      <Typography sx={{ mt: "8px", textAlign: "center" }}>
        By logging in, we can ensure that your information is kept secure.
      </Typography>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            maxWidth: "400px",
            mx: "auto",
            width: "100%",
          }}
        >
          <Stack spacing={3} sx={{ mt: "40px" }}>
            <Input name="email" label="Email" type="email" />
            <Box>
              <PasswordInput name="password" label="Password" />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={isSubmitting}
              disabled={!isValid || isSubmitting}
              sx={{ py: "12px" }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </BlurLayout>
  );
}

export default LoginPage;

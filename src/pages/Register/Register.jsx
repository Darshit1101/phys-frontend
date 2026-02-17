import Button from "../../components/global/buttons/Button";
import Input from "../../components/global/inputs/Input";
import PasswordInput from "../../components/global/inputs/PasswordInput";
import BlurLayout from "../../components/layouts/BlurLayout";
import apiList from "../../constants/apiList";
import useApiCall from "../../hooks/useApiCall";
import { signUpSchema } from "../../validations/signUpSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const { apiCall } = useApiCall({
    ...apiList.AUTH.REGISTER,
    autoFetch: false,
  });

  const methods = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = async ({ fullName, email, password }) => {
    try {
      const response = await apiCall({ body: { fullName, email, password } });
      toast.success(response.message || "Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create account");
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
        Create Account
      </Typography>
      <Typography sx={{ mt: "8px", textAlign: "center" }}>
        Join us today and start your journey with secure access.
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
            <Input name="fullName" label="Full Name" type="text" />
            <Input name="email" label="Email" type="email" />
            <PasswordInput name="password" label="Password" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={isSubmitting}
              disabled={!isValid || isSubmitting}
              sx={{ py: "12px" }}
            >
              Sign Up
            </Button>
            <Typography sx={{ textAlign: "center", mt: "24px" }}>
              Already have an account?{" "}
              <Link 
                to="/login" 
                style={{ 
                  color: "#1976d2", 
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#1565c0"}
                onMouseLeave={(e) => e.target.style.color = "#1976d2"}
              >
                Login here
              </Link>
            </Typography>
          </Stack>
        </Box>
      </FormProvider>
    </BlurLayout>
  );
}

export default Register;
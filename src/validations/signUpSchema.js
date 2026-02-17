import * as yup from "yup";
import { passwordSchema } from "./signInSchema";

export const signUpSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: passwordSchema,
});

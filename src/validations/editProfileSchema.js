import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as yup from "yup";

const australiaPhoneTest = (value) => {
  if (!value) return false;

  const phone = parsePhoneNumberFromString(value, "AU");

  return phone?.isValid() && phone?.country === "AU";
};

export const editProfileSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .test(
      "is-valid-au-phone",
      "Enter a valid Australian phone number",
      australiaPhoneTest
    ),
});

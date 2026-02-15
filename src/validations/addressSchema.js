import * as yup from 'yup'

export const addressSchema = yup.object({
  line1: yup.string().required('Address line is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  postalCode: yup.string().required('Postal code is required'),
  isDefault: yup.boolean(),
})

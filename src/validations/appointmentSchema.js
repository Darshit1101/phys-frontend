import * as yup from 'yup'

export const appointmentSchema = yup.object({
  appointmentDate: yup.string().required('Date is required'),
  slotStart: yup.string().required('Time slot is required'),
  problem: yup.string(),
})

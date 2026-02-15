import { yupResolver } from '@hookform/resolvers/yup'
import { Box, MenuItem, Stack, TextField } from '@mui/material'
import { FormProvider, useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '../../components/global/buttons/Button'
import Input from '../../components/global/inputs/Input'
import TextArea from '../../components/global/inputs/TextArea'
import CommonPageLayout from '../../components/layouts/CommonPageLayout'
import PageHeader from '../../components/texts/PageHeader'
import apiList from '../../constants/apiList'
import { appointmentSlots } from '../../constants/timeSlot'
import useApiCall from '../../hooks/useApiCall'
import { appointmentSchema } from '../../validations/appointmentSchema'

const AppointmentPage = () => {
  const { apiCall } = useApiCall({ ...apiList.APPOINTMENT.BOOK, autoFetch: false })

  const methods = useForm({
    resolver: yupResolver(appointmentSchema),
    mode: 'onChange',
    defaultValues: {
      appointmentDate: '',
      slotStart: '',
      problem: '',
      slotDuration: 30,
    },
  })

  const { handleSubmit, formState: { isSubmitting, isValid }, reset, control } = methods

  const onSubmit = async (data) => {
    try {
      await apiCall({ body: data })
      toast.success('Appointment booked successfully!')
      reset()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to book appointment')
    }
  }

  return (
    <CommonPageLayout>
      <PageHeader title="Book Appointment" subtitle="Schedule your appointment" />
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Input name="appointmentDate" label="Appointment Date" type="date" InputLabelProps={{ shrink: true }} />

            <Controller
              name="slotStart"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  label="Time Slot"
                  error={!!error}
                  helperText={error?.message}
                  sx={{
                    '& .MuiOutlinedInput-input': { padding: '14.5px !important' },
                    '& .MuiOutlinedInput-root': { backgroundColor: 'background.default', borderRadius: '8px' },
                  }}
                >
                  {appointmentSlots.map((slot) => (
                    <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                  ))}
                </TextField>
              )}
            />

            <TextArea name="problem" label="Problem Description" rows={2} />

            <Button type="submit" fullWidth loading={isSubmitting} disabled={!isValid || isSubmitting} sx={{ py: '12px' }}>
              Book Appointment
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </CommonPageLayout>
  )
}

export default AppointmentPage

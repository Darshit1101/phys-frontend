import { yupResolver } from '@hookform/resolvers/yup'
import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '../../components/global/buttons/Button'
import Input from '../../components/global/inputs/Input'
import Modal from '../../components/global/modal/Modal'
import TextArea from '../../components/global/inputs/TextArea'
import apiList from '../../constants/apiList'
import { appointmentSlot } from '../../constants/timeSlot'
import useApiCall from '../../hooks/useApiCall'
import { appointmentSchema } from '../../validations/appointmentSchema'

const BookAppointmentModal = ({ open, onClose, onSuccess }) => {
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
      onClose()
      onSuccess?.()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to book appointment')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h5" sx={{ mb: 3, mt: 2 }}>
        Book Appointment
      </Typography>
      
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
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
                  {appointmentSlot.map((slot) => (
                    <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="slotDuration"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  label="Duration (minutes)"
                  error={!!error}
                  helperText={error?.message}
                  sx={{
                    '& .MuiOutlinedInput-input': { padding: '14.5px !important' },
                    '& .MuiOutlinedInput-root': { backgroundColor: 'background.default', borderRadius: '8px' },
                  }}
                >
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={45}>45</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                </TextField>
              )}
            />

            <TextArea name="problem" label="Problem Description" rows={3} />

            <Button type="submit" fullWidth loading={isSubmitting} disabled={!isValid || isSubmitting} sx={{ py: '12px' }}>
              Book Appointment
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </Modal>
  )
}

export default BookAppointmentModal

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '../../components/global/buttons/Button'
import Input from '../../components/global/inputs/Input'
import Modal from '../../components/global/modal/Modal'
import apiList from '../../constants/apiList'
import useApiCall from '../../hooks/useApiCall'
import { addressSchema } from '../../validations/addressSchema'
import {useAuth} from "../../stores/useAuth";

const AddressModal = ({ open, onClose, onSuccess, editData }) => {
  const { id: accountId } = useAuth()
  const isEdit = !!editData

  const { apiCall: createCall } = useApiCall({ ...apiList.ADDRESS.CREATE, autoFetch: false })
  const { apiCall: updateCall } = useApiCall({ ...apiList.ADDRESS.UPDATE, autoFetch: false })

  const methods = useForm({
    resolver: yupResolver(addressSchema),
    mode: 'onChange',
    defaultValues: editData || {
      line1: '',
      city: '',
      state: '',
      postalCode: '',
      isDefault: false,
      accountId: accountId
    },
  })

  const { handleSubmit, formState: { isSubmitting, isValid }, reset, register } = methods

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateCall({ url: `${apiList.ADDRESS.UPDATE.url}/${editData._id}`, body: data })
        toast.success('Address updated successfully!')
      } else {
        await createCall({ body: data })
        toast.success('Address created successfully!')
      }
      reset()
      onClose()
      onSuccess?.()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save address')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h5" sx={{ mb: 3, mt: 2 }}>
        {isEdit ? 'Edit Address' : 'Add New Address'}
      </Typography>
      
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Input name="line1" label="Address Line" />
            <Input name="city" label="City" />
            <Input name="state" label="State" />
            <Input name="postalCode" label="Postal Code" />
            
            <FormControlLabel
              control={<Checkbox {...register('isDefault')} />}
              label="Set as default address"
            />

            <Button type="submit" fullWidth loading={isSubmitting} disabled={!isValid || isSubmitting} sx={{ py: '12px' }}>
              {isEdit ? 'Update Address' : 'Add Address'}
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </Modal>
  )
}

export default AddressModal

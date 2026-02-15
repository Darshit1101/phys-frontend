import { useState } from 'react'
import { Box, Card, CardContent, Chip, IconButton, Stack, Switch, Typography } from '@mui/material'
import { Edit, MapPin, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import Button from '../../components/global/buttons/Button'
import CommonPageLayout from '../../components/layouts/CommonPageLayout'
import PageHeader from '../../components/texts/PageHeader'
import apiList from '../../constants/apiList'
import useApiCall from '../../hooks/useApiCall'
import { useAuth } from '../../stores/useAuth'
import AddressModal from './AddressModal'

const Main = () => {
  const [openModal, setOpenModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const { setUserDetails } = useAuth()
  const { data, loading, apiCall } = useApiCall({ 
    ...apiList.ADDRESS.LIST
  })
  const { apiCall: deleteCall } = useApiCall({ ...apiList.ADDRESS.DELETE, autoFetch: false })
  const { apiCall: setDefaultCall } = useApiCall({ ...apiList.ADDRESS.SET_DEFAULT, autoFetch: false })

  const handleEdit = (address) => {
    setEditData(address)
    setOpenModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return
    try {
      await deleteCall({ url: `${apiList.ADDRESS.DELETE.url}/${id}` })
      toast.success('Address deleted successfully!')
      apiCall()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete address')
    }
  }

  const handleSetDefault = async (id, currentDefault) => {
    if (currentDefault) return
    try {
      await setDefaultCall({ url: `${apiList.ADDRESS.SET_DEFAULT.url}/${id}` })
      setUserDetails({ addressId: id })
      toast.success('Default address updated!')
      apiCall()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to set default address')
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setEditData(null)
  }

  const addresses = data?.data || []

  return (
    <CommonPageLayout>
      <PageHeader 
        title="Addresses" 
        subtitle="Manage your addresses" 
        action={
          <Button onClick={() => setOpenModal(true)} sx={{ px: 3 }}>
            Add Address
          </Button>
        }
      />

      {loading ? (
        <Typography>Loading...</Typography>
      ) : addresses.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">No addresses found</Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {addresses.map((address) => (
            <Card key={address._id} variant="outlined">
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
                    <MapPin size={20} />
                    <Box>
                      <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
                        {address.line1}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {address.city}, {address.state} - {address.postalCode}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Default
                      </Typography>
                      <Switch 
                        checked={address.isDefault}
                        onChange={() => handleSetDefault(address._id, address.isDefault)}
                        size="small"
                      />
                    </Stack>
                    <IconButton size="small" onClick={() => handleEdit(address)}>
                      <Edit size={18} />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(address._id)}>
                      <Trash2 size={18} />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      <AddressModal 
        open={openModal} 
        onClose={handleCloseModal} 
        onSuccess={apiCall}
        editData={editData}
      />
    </CommonPageLayout>
  )
}

export default Main
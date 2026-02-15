import { useState } from 'react'
import Button from '../../components/global/buttons/Button'
import CommonPageLayout from '../../components/layouts/CommonPageLayout'
import PageHeader from '../../components/texts/PageHeader'
import BookAppointmentModal from './BookAppointmentModal'
import AppointmentDataTable from './DataTable'

const AppointmentPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <CommonPageLayout>
      <PageHeader 
        title="Appointments" 
        subtitle="Manage your appointments" 
        action={
          <Button onClick={() => setOpenModal(true)} sx={{ px: 3 }}>
            Book Appointment
          </Button>
        }
      />

      <AppointmentDataTable refreshTrigger={refreshTrigger} />

      <BookAppointmentModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onSuccess={handleSuccess}
      />
    </CommonPageLayout>
  )
}

export default AppointmentPage

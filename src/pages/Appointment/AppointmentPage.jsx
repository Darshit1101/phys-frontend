import { useState } from 'react'
import Button from '../../components/global/buttons/Button'
import CommonPageLayout from '../../components/layouts/CommonPageLayout'
import PageHeader from '../../components/texts/PageHeader'
import BookAppointmentModal from './BookAppointmentModal'
import AppointmentDataTable from './DataTable'

const AppointmentPage = () => {
  const [openModal, setOpenModal] = useState(false)

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

      <AppointmentDataTable />

      <BookAppointmentModal open={openModal} onClose={() => setOpenModal(false)} />
    </CommonPageLayout>
  )
}

export default AppointmentPage

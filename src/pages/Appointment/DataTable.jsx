import React, { useEffect } from 'react'
import { Box, Chip } from '@mui/material'
import DataTable from '../../components/global/tables/DataTable'
import apiList from '../../constants/apiList'
import useApiCall from '../../hooks/useApiCall'

const AppointmentDataTable = (props) => {
  const { refreshTrigger } = props
  const { data, loading, apiCall } = useApiCall({ ...apiList.APPOINTMENT.LIST })

  // Refresh data when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger > 0) {
      apiCall()
    }
  }, [refreshTrigger, apiCall])

  const columns = [
    { id: 'customId', label: 'ID', render: (row) => row.customId },
    { id: 'appointmentDate', label: 'Date', render: (row) => new Date(row.appointmentDate).toLocaleDateString() },
    { id: 'slotStart', label: 'Time', render: (row) => row.slotStart },
    { id: 'slotDuration', label: 'Duration', render: (row) => `${row.slotDuration} min` },
    { id: 'problem', label: 'Problem', render: (row) => row.problem || '-' },
    {
      id: 'status',
      label: 'Status',
      render: (row) => (
        <Chip
          label={row.status || 'Pending'}
          size="small"
          color={row.status === 'Confirmed' ? 'success' : 'default'}
        />
      )
    },
  ]

  return (
    <Box>
      <DataTable
        columns={columns}
        rows={data?.data || []}
        loading={loading}
        emptyMessage="No appointments found"
      />
    </Box>
  )
}

export default AppointmentDataTable
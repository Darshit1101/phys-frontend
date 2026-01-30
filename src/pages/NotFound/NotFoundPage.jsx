import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/global/buttons/Button'
import './NotFoundPage.css'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Sorry, we couldn't find the page you're looking for. 
          The page might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="error-actions">
          <Button onClick={handleGoHome} variant="contained">
            Go to Homepage
          </Button>
          <Button onClick={handleGoBack} variant="outlined">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em',
        border: '3px solid red',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h5' color='error' gutterBottom>
        Opps seems like you entered an undefind route
      </Typography>
      <Typography variant='body1' color='link' component={Link} to='/'>
        Back to home
      </Typography>
    </div>
  )
}

export default NotFound

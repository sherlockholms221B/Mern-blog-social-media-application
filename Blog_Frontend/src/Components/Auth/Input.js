import React from 'react'
import { TextField, Grid } from '@mui/material'

const Input = ({ name, label, half, handleChange, type, autoFocus }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant='outlined'
        required
        type={type}
        autoFocus={autoFocus}
        fullWidth={true}
      />
    </Grid>
  )
}

export default Input

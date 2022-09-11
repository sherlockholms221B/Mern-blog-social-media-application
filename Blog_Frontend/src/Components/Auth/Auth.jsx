import React, { useState } from 'react'
import {
  Paper,
  Grid,
  Typography,
  Avatar,
  Container,
  Button,
  CircularProgress,
} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { Input } from '../../import'
import { useDispatch, useSelector } from 'react-redux'
import { signIn, signUp } from '../../Actions/AuthActions'
import { useNavigate } from 'react-router-dom'
import Filebase from 'react-file-base64'

const Auth = () => {
  const dispatch = useDispatch()
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
  })
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.AuthHandler)
  const handleSubmite = (e) => {
    e.preventDefault()

    if (isSignUp) {
      dispatch(signUp(formData, navigate))
    } else {
      dispatch(signIn(formData, navigate))
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
  }

  if (isLoading) {
    return (
      <Paper
        elevation={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '15px',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Paper>
    )
  }

  return (
    <Container component='main' maxWidth='xs' sx={{ marginTop: '5em' }}>
      <Paper
        elevation={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '1em',
        }}
      >
        <Avatar>
          <LockOutlined sx={{ color: 'red' }} />
        </Avatar>
        <Typography
          variant='h5'
          sx={{
            textTransform: 'capitalize',
            marginBottom: '1em',
            fontWeight: 'bold',
          }}
          color='primary'
        >
          {isSignUp ? 'sign up' : 'sign in'}
        </Typography>
        <form onSubmit={handleSubmite}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
            />
            {isSignUp && (
              <>
                <Input
                  fullWidth
                  name='confirmPassword'
                  label='Repeat Password '
                  handleChange={handleChange}
                  type='password'
                />

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    width: '100%',
                  }}
                >
                  <Typography variant='body1' gutterBottom>
                    Upload profile image
                  </Typography>
                  <Filebase
                    type='file'
                    multiple={false}
                    onDone={({ base64 }) =>
                      setFormData({ ...formData, profileImage: base64 })
                    }
                  />
                </div>
              </>
            )}
          </Grid>

          <Button
            type='submite'
            variant='contained'
            fullWidth
            sx={{ marginTop: '1em' }}
          >
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Button>

          <Grid container sx={{ marginTop: '0.5em' }}>
            <Grid
              item
              sx={{
                width: '100%',
              }}
            >
              <Button
                variant='text'
                onClick={switchMode}
                sx={{
                  display: 'felx',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  textTransform: 'capitalize',
                }}
              >
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth

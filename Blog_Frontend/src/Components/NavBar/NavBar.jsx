import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import { LOGOUT } from '../../Constants/Constants'

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile'))
  )

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const logOut = () => {
    dispatch({ type: LOGOUT })
    setProfile(null)
    navigate('/')
  }

  useEffect(() => {
    const token = profile?.token
    if (token) {
      const { exp } = decode(token)
      if (exp < Date.now() / 1000) {
        dispatch({ type: LOGOUT })
        setProfile(null)
        navigate('/')
      }
    }
    setProfile(JSON.parse(localStorage.getItem('profile')))
  }, [location, profile?.token, dispatch, navigate])

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button variant='contained' color='error' onClick={logOut}>
          Log out
        </Button>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography
            variant='h6'
            component={Link}
            to='/'
            sx={{
              display: { xs: 'block', sm: 'block' },
              textDecoration: 'none',
              color: 'white',
            }}
          >
            BLOG
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          {profile ? (
            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              <Avatar
                alt={profile?.user?.name}
                src={profile?.user?.profileImage}
              />
              <Button
                variant='contained'
                color='error'
                onClick={logOut}
                sx={{ marginLeft: '1em' }}
              >
                Log out
              </Button>
            </Box>
          ) : (
            <Button variant='contained' component={Link} to='/auth'>
              Sign In
            </Button>
          )}
          {profile && (
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <Avatar
                  alt={profile?.user?.name}
                  src={profile?.user?.profileImage}
                />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  )
}

export default NavBar

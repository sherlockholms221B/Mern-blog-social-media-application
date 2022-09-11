import React from 'react'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { NavBar, Home, Auth, PostDetails, NotFound } from './import.js'
import { createTheme, Container } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: 'Segoe UI, cursive',
  },
})

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth='xl'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Navigate replace to='/posts' />} />
            <Route path='/posts' exact element={<Home />} />
            <Route path='/post/search/posts' exact element={<Home />} />
            <Route
              path='/post/search/posts/searchingtags'
              exact
              element={<Home />}
            />
            <Route path='/posts/:id' exact element={<PostDetails />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

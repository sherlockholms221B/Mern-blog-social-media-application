import React, { useState } from 'react'
import { Grow, Grid, Paper } from '@mui/material'
import { Posts, Form, Pages, Search } from '../../import.js'
import { classes, StyledContainer } from './Styles.js'
import { useLocation } from 'react-router-dom'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentPost, setCurrentPost] = useState(null)
  const query = useQuery()
  const page = query.get('page') || 1

  return (
    <Grow in>
      <StyledContainer className={classes.container} maxWidth={false}>
        <Grid
          container
          justify='space-between'
          align='stratch'
          spacing={2}
          sx={{
            flexDirection: { xs: 'column-reverse', sm: 'row' },
          }}
        >
          <Grid item xs={12} sm={7} md={8.5} className={classes.post}>
            <Posts currentPost={currentPost} setCurrentPost={setCurrentPost} />
          </Grid>
          <Grid item xs={12} sm={5} md={3.5} className={classes.form}>
            <Search />
            <Form currentPost={currentPost} setCurrentPost={setCurrentPost} />
            <Paper elevation={6} className={classes.pages}>
              <Pages page={page} />
            </Paper>
          </Grid>
        </Grid>
      </StyledContainer>
    </Grow>
  )
}

export default Home

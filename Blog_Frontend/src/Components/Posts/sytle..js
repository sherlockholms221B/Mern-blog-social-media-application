import { Grid, styled } from '@mui/material'

const Posts = 'Posts'
const classes = {
  container: `${Posts}-container`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.container}`]: {
    hieght: '90vh',
    backgroundColor: 'rgb(227, 227, 227)',
    padding: theme.spacing(4, 0, 10, 2),
  },
}))

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}))

export { StyledGrid, classes, Container }

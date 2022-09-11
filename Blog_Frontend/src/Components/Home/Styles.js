import { styled, Container } from '@mui/material'

const home = 'home'
const classes = {
  container: `${home}-container`,
  post: `${home}-post`,
  form: `${home}-form`,
  pages: `${home}-pages`,
}

const StyledContainer = styled(Container)(({ theme }) => ({
  [`&.${classes.container}`]: {
    margin: theme.spacing(8.3, 0, 0, 0),
    padding: theme.spacing(0),
    width: '100%',
    height: '100vh',
  },
  [`& .${classes.post}`]: {
    height: '100vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  [`& .${classes.form}`]: {
    padding: theme.spacing(0, 1, 0, 0),
    height: '100vh',
    width: '100%',
  },
  [`& .${classes.pages}`]: {
    margin: theme.spacing(1, 0, 0, 0),
    padding: theme.spacing(1, 0),
  },
}))

export { classes, StyledContainer }

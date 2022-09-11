import { Paper, styled } from '@mui/material'

const post = 'post'
const classes = {
  paper: `${post}-peper`,
  form: `${post}-form`,
  submite: `${post}-submite`,
  clear: `${post}-clear`,
  filebaseContainer: `${post}-filebaseContainer`,
}

const SelectedPeper = styled(Paper)(({ theme }) => ({
  [`&.${classes.paper}`]: {
    margin: theme.spacing(3, 0, 0, 0),
  },
  [`& .${classes.form}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '.8em',
    padding: theme.spacing(1),
  },
  [`& .${classes.filebaseContainer}`]: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
  },

  [`& .${classes.submite}`]: {
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.clear}`]: {
    padding: theme.spacing(1, 0),
  },
}))

export { SelectedPeper, classes }

import { styled, AppBar } from '@mui/material'

const search = 'search'
const classes = {
  appbar: `${search}-appbar`,
  chip: `${search}-chip`,
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [`&.${classes.appbar}`]: {
    borderRadius: 4,
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0, 0, 0),
  },
  [`& .${classes.chip}`]: {
    margin: theme.spacing(1, 0, 0, 0),
  },
}))

export { classes, StyledAppBar }

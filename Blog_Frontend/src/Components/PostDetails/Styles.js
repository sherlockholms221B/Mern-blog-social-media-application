import { styled, Paper } from '@mui/material'
const PostDetails = 'PostDetails'
const classes = {
  paper: `${PostDetails}-paper`,
  media: `${PostDetails}-media`,
  imageSection: `${PostDetails}-imageSection`,
  card: `${PostDetails}-card`,
  section: `${PostDetails}-section`,
  recommendedPosts: `${PostDetails}- recommendedPosts`,
  loadingPaper: `${PostDetails}-loadingPaper`,
}
const StyledPaper = styled(Paper)(({ theme }) => ({
  [`&.${classes.paper}`]: {
    padding: '20px',
    margin: theme.spacing(9, 0, 0, 0),
    overFlow: 'auto',
  },
  [`& .${classes.media}`]: {
    objectFit: 'cover',
    maxWidth: '80%',
    maxHeight: '400px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  [`& .${classes.card}`]: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  [`& .${classes.section}`]: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  [`& .${classes.imageSection}`]: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
}))

export { StyledPaper, classes }

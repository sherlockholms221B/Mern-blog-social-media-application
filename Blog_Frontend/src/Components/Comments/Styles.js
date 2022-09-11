import { styled } from '@mui/material'

const comments = 'comments'
const classes = {
  commentsOuterContainer: `${comments}-commentsOuterContainer`,
  commentsInnerContainer: `${comments}-commentsInnerContainer`,
}

const Div = styled('div')(({ theme }) => ({
  [`&.${classes.commentsOuterContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  [`& .${classes.commentsInnerContainer}`]: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
    border: '3px solid gray ',
    padding: theme.spacing(2),
    borderRadius: '0.5em',
    display: 'flex',
    flexDirection: 'column',
  },
}))

export { classes, Div }

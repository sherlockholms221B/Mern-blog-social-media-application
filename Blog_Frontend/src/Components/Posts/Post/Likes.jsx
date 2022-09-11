import React from 'react'
import { Typography } from '@mui/material'
import { Favorite } from '@mui/icons-material'

const Likes = ({ likes, userId }) => {
  if (likes.length > 0) {
    return likes.find((like) => like === userId) ? (
      <>
        <Favorite color='primary' /> &nbsp;
        {likes.length > 2 ? (
          <Typography variant='body1'>
            You and {likes.length - 1} others
          </Typography>
        ) : (
          <Typography variant='body1'>
            {likes.length} like{likes.length > 1 ? 's' : ''}
          </Typography>
        )}
      </>
    ) : (
      <>
        <Favorite color='disabled' /> &nbsp;
        <Typography variant='body1'>
          {likes.length} {likes.length === 1 ? 'like' : 'likes'}
        </Typography>
      </>
    )
  }

  return (
    <>
      <Favorite /> &nbsp; <Typography variant='body1'>like</Typography>
    </>
  )
}

export default Likes

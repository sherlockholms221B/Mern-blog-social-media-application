import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { classes, Div } from './Styles'
import { useDispatch } from 'react-redux'
import { commentOnPost } from '../../Actions/Postactions.js'
import { Stack } from '@mui/system'

const Comments = ({ post }) => {
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')
  const [creator, setCreator] = useState('')
  const dispatch = useDispatch()
  const commentsRef = useRef(null)
  const profile = JSON.parse(localStorage.getItem('profile'))
  const commentCreator = profile?.user?.name

  const handleComment = async () => {
    const newComments = await dispatch(
      commentOnPost(comment, commentCreator, post._id)
    )
    setCreator(newComments?.commentCreator)
    setComments(newComments?.updatedPost?.comments)
    setComment('')
    console.log(creator)

    commentsRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div>
      <Div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          {comments?.length === 0 ? (
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              direction={{ xs: 'column' }}
              spacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Typography variant='h5' color='primary' gutterBottom>
                No Comments Yet
              </Typography>
              <Typography variant='body1' gutterBottom color='secondary'>
                Be the first to comment
              </Typography>
            </Stack>
          ) : (
            comments?.map((comment, i) => (
              <div
                style={{
                  width: 'fit-content',
                  padding: '.5em',
                  margin: '.6em 0',
                }}
                key={i}
              >
                <Typography gutterBottom variant='h5'>
                  {creator}
                </Typography>
                <Typography variant='section' gutterBottom>
                  {comment}
                </Typography>
              </div>
            ))
          )}
          <div ref={commentsRef}></div>
        </div>
        {profile?.user?.name && (
          <div style={{ width: '70%', padding: '1em' }}>
            <Typography variant='h6'>Write a comment</Typography>
            <TextField
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline={true}
              rows={5}
              hieght={29}
              label='Comment'
            />
            <Button
              sx={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              color='primary'
              onClick={handleComment}
              variant='contained'
            >
              Comment
            </Button>
          </div>
        )}
      </Div>
    </div>
  )
}

export default Comments

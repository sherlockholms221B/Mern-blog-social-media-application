import React, { useEffect } from 'react'
import {
  Typography,
  CircularProgress,
  Divider,
  Paper,
  Chip,
  Stack,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { StyledPaper, classes } from './Styles'
import { getSinglePost, getPostByTag } from '../../Actions/Postactions'
import { Comments } from '../../import'
import Post from './RecomededPost'

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.Post)

  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getSinglePost(id))
  }, [id, dispatch])

  useEffect(() => {
    if (post) {
      dispatch(getPostByTag(post?.tags?.join(',')))
    }
  }, [post, dispatch])

  if (!post) return null
  if (isLoading) {
    return (
      <Paper
        elevation={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '15px',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Paper>
    )
  }

  const postsYouMightLike = posts?.filter(({ _id }) => _id !== post._id)

  return (
    <StyledPaper elevation={6} className={classes.paper}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h5'>{post.title}</Typography>

          {post?.tags?.map((tag, i) => (
            <Chip
              label={tag}
              key={i}
              variant='contained'
              color='primary'
              sx={{ margin: '0.3em 0.5em' }}
            />
          ))}
          <Typography gutterBottom variant='body1' sx={{ lineHeight: '1.5em' }}>
            {post.message}
          </Typography>
          <Typography variant='h6'>Creator: {post.name}</Typography>
          <Typography variant='body1' sx={{ margin: '0 0 0 .5em' }}>
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Comments post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={post.selectedFile}
            alt={post.title}
          />
        </div>
      </div>
      {postsYouMightLike.length === 0 ? (
        <Typography variant='h6' color='error' gutterBottom>
          No relateded post
        </Typography>
      ) : (
        <div className={classes.section}>
          <Typography variant='h5'>You might also like</Typography>
          <Divider />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ marginTop: '1em' }}
          >
            {postsYouMightLike.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </Stack>
        </div>
      )}
    </StyledPaper>
  )
}

export default PostDetails

import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Chip,
  Divider,
} from '@mui/material'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { ExpandMoreContainer } from './style'
import { red } from '@mui/material/colors'
import { MoreVert, ExpandMore, Delete, Edit } from '@mui/icons-material'
import {
  likePost,
  deletePost,
  getPostByTag,
} from '../../../Actions/Postactions'
import Likes from './Likes'
import { useNavigate } from 'react-router-dom'

const Post = ({ post, setCurrentPost }) => {
  const profile = JSON.parse(localStorage.getItem('profile'))

  const [expanded, setExpanded] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [likes, setLikes] = useState(post?.likes)

  const userId = profile?.user?._id
  const isMenuOpen = Boolean(anchorEl)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleMoreAction = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const moreAction = (e) => {
    handleMoreAction(e)
  }

  const handlePostEditing = () => {
    setCurrentPost(post._id)
    handleMenuClose()
  }

  const handleDeletePost = () => {
    dispatch(deletePost(post._id))
    handleMenuClose()
  }

  const handleLikePost = async (e) => {
    dispatch(likePost(post._id))

    if (post.likes.find((like) => like === userId)) {
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post.likes, userId])
    }
  }

  const handleSearchByTag = (e) => {
    const currentText = e.currentTarget.textContent
    console.log(currentText)
    if (currentText) {
      dispatch(getPostByTag(currentText))
      navigate(`/post/search/posts/searchingtags?tags=${currentText}`)
    } else {
      navigate('/')
    }
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }
  const menuId = 'primary-search-account-menu'
  return (
    <Card sx={{ maxWidth: { xs: 500, md: 400 } }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} onClick={openPost}>
            {' '}
            {post?.name.charAt(0)}{' '}
          </Avatar>
        }
        action={
          profile?.user?._id === post?.creator ? (
            <IconButton
              aria-label='settings'
              onClick={moreAction}
              size='large'
              edge='end'
              aria-controls={menuId}
              aria-haspopup='true'
            >
              <MoreVert />
            </IconButton>
          ) : null
        }
        title={post.name}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardMedia
        component='img'
        sx={{ maxheight: '410px' }}
        image={post.selectedFile}
        alt={post.creator}
      />
      <CardContent>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ marginBottom: '1em' }}
        >
          {post.title}
        </Typography>
        <Divider />
        {post.tags.map((tag, i) => (
          <Chip
            label={`${tag}`}
            color='primary'
            key={i}
            sx={{ margin: '1em 0.2em 0 0.2em' }}
            onClick={handleSearchByTag}
          />
        ))}
      </CardContent>
      <Divider textAlign='right'>
        <Typography variant='body1' color='primary'>
          {!expanded ? 'more' : 'less'}
        </Typography>
      </Divider>
      <CardActions disableSpacing>
        <IconButton onClick={handleLikePost}>
          <Likes likes={likes} userId={userId} />
        </IconButton>
        <ExpandMoreContainer
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMore />
        </ExpandMoreContainer>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>{post.message}</Typography>
        </CardContent>
      </Collapse>
      {profile?.user?._id === post?.creator && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={handleDeletePost}
            sx={{ color: 'blue', padding: '0  2em 0 0 ' }}
          >
            <Grid item xs={5} md={5}>
              <IconButton size='lg'>
                <Delete color='error' />
              </IconButton>
            </Grid>
            <Grid item xs={7} md={7}>
              <Typography>Delete Post</Typography>
            </Grid>
          </MenuItem>
          <MenuItem onClick={handlePostEditing} sx={{ padding: '0  2em 0 0 ' }}>
            <Grid item xs={5} md={5}>
              <IconButton size='lg'>
                <Edit />
              </IconButton>
            </Grid>
            <Grid item xs={5} md={5}>
              <Typography>Edit Post</Typography>
            </Grid>
          </MenuItem>
        </Menu>
      )}
    </Card>
  )
}

export default Post

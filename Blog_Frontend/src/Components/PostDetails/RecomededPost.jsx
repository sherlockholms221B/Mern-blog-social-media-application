import React from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  Typography,
  CardContent,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

import moment from 'moment'

const RecomededPost = ({ post }) => {
  const navigate = useNavigate()
  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }
  return (
    <Card sx={{ maxWidth: 400 }} elevation={6}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} onClick={openPost}>
            {post?.name.charAt(0)}{' '}
          </Avatar>
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
      </CardContent>
    </Card>
  )
}

export default RecomededPost

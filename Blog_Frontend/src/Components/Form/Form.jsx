import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import FileBase64 from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../Actions/Postactions.js'
import { classes, SelectedPeper } from './style.js'
import { useNavigate } from 'react-router-dom'

const Form = ({ currentPost, setCurrentPost }) => {
  //seting up the used vaariables
  const profile = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    selectedFile: '',
    tags: [],
  })
  const updetedPost = useSelector((state) =>
    currentPost
      ? state.Post.posts.find((post) => post._id === currentPost)
      : null
  )

  useEffect(() => {
    if (updetedPost) setPostData(updetedPost)
  }, [updetedPost])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentPost) {
      dispatch(updatePost(currentPost, postData, navigate))
    } else {
      dispatch(createPost({ ...postData, name: profile?.user?.name }, navigate))
    }
    clearForm()
  }

  const clearForm = () => {
    setCurrentPost(null)
    setPostData({
      title: '',
      message: '',
      selectedFile: '',
      tags: [],
    })
  }

  if (!profile?.user?.name) {
    return (
      <Paper sx={{ marginTop: '3em', padding: '1em 0' }}>
        <Typography variant='h6' color='error' align='center'>
          SignUp/SignIn to acess the full future's of Blog
        </Typography>
      </Paper>
    )
  }
  return (
    <SelectedPeper elevation={6} className={classes.paper}>
      <form autoComplete='on' onSubmit={handleSubmit} className={classes.form}>
        <TextField
          name='title'
          label='Title'
          size='small'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          fullWidth
          rows={4}
          multiline={true}
          label='Message'
          hieght={29}
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value })
          }}
        />
        <TextField
          name='tags'
          fullWidth
          size='small'
          multiline={true}
          rows={2}
          label='Tags'
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }}
        />
        <div className={classes.filebaseContainer}>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button type='submite' variant='contained' fullWidth color='primary'>
          submite
        </Button>
        <Button variant='contained' fullWidth color='error' onClick={clearForm}>
          clear form
        </Button>
      </form>
    </SelectedPeper>
  )
}

export default Form

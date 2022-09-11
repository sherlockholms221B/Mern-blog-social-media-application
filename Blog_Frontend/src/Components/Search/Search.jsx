import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { StyledAppBar, classes } from './styles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPostOnSearch } from '../../Actions/Postactions'

const Search = () => {
  const [postData, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearchPost = () => {
    if (postData.trim()) {
      dispatch(getPostOnSearch(postData))
      navigate(`/post/search/posts?postData=${postData || 'none'}`)
    } else {
      navigate('/')
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearchPost()
    }
  }

  return (
    <StyledAppBar className={classes.appbar} color='inherit' position='static'>
      <TextField
        label='Search Blog'
        value={postData}
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        variant='outlined'
      />
      <Button
        variant='contained'
        color='primary'
        fullWidth
        className={classes.chip}
        onClick={handleSearchPost}
      >
        Search
      </Button>
    </StyledAppBar>
  )
}

export default Search

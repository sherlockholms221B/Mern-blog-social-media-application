import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import { StyledGrid, classes, Container } from './sytle.'

const Posts = ({ setCurrentPost }) => {
  const { posts, isLoading } = useSelector((state) => state.Post)

  return (
    <>
      {isLoading ? (
        <Container>
          <CircularProgress />
        </Container>
      ) : (
        <StyledGrid
          sx={{ marginTop: { xs: '1em' } }}
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className={classes.container}
        >
          <Masonry spacing={2} columns={{ xs: 1, sm: 2, md: 3 }}>
            {posts?.map((post) => (
              <div key={post._id}>
                <Post post={post} setCurrentPost={setCurrentPost} />
              </div>
            ))}
          </Masonry>
        </StyledGrid>
      )}
    </>
  )
}

export default Posts

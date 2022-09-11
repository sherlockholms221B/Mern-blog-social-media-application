import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fatchPost } from '../../Actions/Postactions'

const Pages = ({ page }) => {
  const dispatch = useDispatch()
  const { totalPages } = useSelector((state) => state.Post)

  useEffect(() => {
    if (page) dispatch(fatchPost(page))
  }, [page, dispatch])

  return (
    <Pagination
      sx={{ display: 'flex', justifyContent: 'space-evenly' }}
      count={totalPages}
      page={Number(page) || 1}
      variant='outlined'
      color='primary'
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  )
}

export default Pages

import * as Api from '../Api/Api.js'

import {
  GET_SINGLE_POST,
  FATCH,
  CREATE,
  UPDATE,
  LIKE,
  COMMENT_ON_POST,
  DELETE,
  SEARCH,
  START_LOADING,
  END_LOADING,
  SEARCH_BY_TAG,
} from '../Constants/Constants.js'

const fatchPost = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await Api.fatchPost(page)

    dispatch({ type: FATCH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
  }
}

const getSinglePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await Api.getSinglePost(id)

    dispatch({ type: GET_SINGLE_POST, payload: data })

    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
  }
}

const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const { data } = await Api.createPost(post)

    dispatch({ type: CREATE, payload: data })
    navigate(`/posts/${data._id}`)
  } catch (err) {
    console.log(err)
  }
}

const updatePost = (id, post, navigate) => async (dispatch) => {
  try {
    const { data } = await Api.updatePost(id, post)

    dispatch({ type: UPDATE, payload: data })
    navigate(`/posts/${data._id}`)
  } catch (error) {
    console.log(error)
  }
}

const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await Api.likePost(id)

    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

const commentOnPost = (comment, creator, id) => async (dispatch) => {
  try {
    const { data } = await Api.commentOnPost(comment, creator, id)

    dispatch({ type: COMMENT_ON_POST, payload: data })

    return data
  } catch (error) {
    console.log(error)
  }
}

const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await Api.deletePost(id)

    dispatch({ type: DELETE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

const getPostOnSearch = (term) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await Api.getPostOnSearch(term)

    dispatch({ type: SEARCH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
  }
}

const getPostByTag = (tag) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const {
      data: { data },
    } = await Api.getPostByTag(tag)

    dispatch({ type: SEARCH_BY_TAG, payload: data })

    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export {
  getSinglePost,
  fatchPost,
  createPost,
  updatePost,
  likePost,
  commentOnPost,
  deletePost,
  getPostOnSearch,
  getPostByTag,
}

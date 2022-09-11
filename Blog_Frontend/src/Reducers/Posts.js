import {
  GET_SINGLE_POST,
  FATCH,
  SEARCH,
  SEARCH_BY_TAG,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT_ON_POST,
  START_LOADING,
  END_LOADING,
} from '../Constants/Constants.js'

const Post = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case GET_SINGLE_POST:
      return { ...state, post: action.payload }
    case FATCH:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      }
    case SEARCH:
      return { ...state, posts: action.payload }
    case SEARCH_BY_TAG:
      return { ...state, posts: action.payload }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post
        }),
      }
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post
        }),
      }
    case COMMENT_ON_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload.updatedPost
          }

          return post
        }),
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== action.payload._id
        }),
      }
    default:
      return state
  }
}

export default Post

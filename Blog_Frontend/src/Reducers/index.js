import { combineReducers } from 'redux'
import Post from './Posts'
import AuthHandler from './Auth'

export default combineReducers({
  Post,
  AuthHandler,
})

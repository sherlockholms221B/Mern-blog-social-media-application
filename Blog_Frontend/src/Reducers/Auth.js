import {
  AUTH,
  START_LOADING,
  END_LOADING,
  LOGOUT,
} from '../Constants/Constants'

const AuthHandler = (state = { isLoading: false, authData: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      return { ...state, authData: action?.payload }
    case LOGOUT:
      localStorage.clear()
      return { ...state, authData: null }
    default:
      return state
  }
}

export default AuthHandler

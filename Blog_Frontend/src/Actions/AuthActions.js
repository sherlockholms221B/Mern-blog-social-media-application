import * as Api from '../Api/Api'
import { AUTH, START_LOADING, END_LOADING } from '../Constants/Constants'

const signUp = (authData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await Api.signUp(authData)

    dispatch({ type: AUTH, payload: data })
    navigate('/')
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

const signIn = (authData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await Api.signIn(authData)

    dispatch({ type: AUTH, payload: data })
    navigate('/')
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export { signUp, signIn }

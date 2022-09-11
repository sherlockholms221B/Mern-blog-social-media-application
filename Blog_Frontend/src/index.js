import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import reducer from './Reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(compose(thunk)))
const element = document.getElementById('root')
const root = createRoot(element)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

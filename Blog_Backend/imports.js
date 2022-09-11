import express from 'express'
import bodyParser from 'body-parser'
import Cors from 'cors'
import Postroutes from './Routes/Post.js'
import Userroutes from './Routes/User.js'
import conectToDataBase from './Mongo/Connect.js'
import notFound from './Errors/Not-found.js'
import * as config from 'dotenv/config'

export {
  express,
  bodyParser,
  Cors,
  conectToDataBase,
  Postroutes,
  Userroutes,
  notFound,
  config,
}

import bodyParser from 'body-parser'
import {
  express,
  Cors,
  conectToDataBase,
  Postroutes,
  Userroutes,
  notFound,
  config,
} from './imports.js'

const app = express()

app.use(Cors())
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
)


app.use('/post', Postroutes)
app.use('/users', Userroutes)
app.use(notFound)

const PORT = process.env.PORT || 5000
const start = async () => {
  try {
    await conectToDataBase(process.env.MONGO__URI)
    app.listen(PORT, () => console.log(`server is runing on Port:${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()

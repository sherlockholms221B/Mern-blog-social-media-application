import Post from './Models/Post.js'
import { conectToDataBase } from './imports.js'
import 'dotenv/config'

const start = async () => {
  try {
    await conectToDataBase(process.env.MONGO__URI)
    await Post.deleteMany()
    console.log('task completed')
  } catch (error) {
    console.log(error)
  }
}

start()

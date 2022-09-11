import mongoose from 'mongoose'

const conectToDataBase = async (url) => {
  return mongoose.connect(url)
}

export default conectToDataBase

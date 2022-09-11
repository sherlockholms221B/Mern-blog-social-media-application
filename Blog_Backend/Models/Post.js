import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: String,
  creator: String,
  message: {
    type: String,
    required: false,
    minlength: 3,
    trim: true,
  },
  tags: [String],
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
  selectedFile: {
    type: String,
    required: false,
  },
})

const Post = mongoose.model('Post', PostSchema)

export default Post

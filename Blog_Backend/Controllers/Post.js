import mongoose from 'mongoose'
import Post from '../Models/Post.js'

const getPost = async (req, res) => {
  try {
    const { page } = req.query

    const limit = 50
    const startIndex = (Number(page) - 1) * limit

    const total = await Post.countDocuments({})
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex)

    if (posts.length === 0) {
      return res.status(404).send({ message: 'No post found' })
    }

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    res.status(404).send({
      msg: error,
    })
  }
}

const getPostBySearch = async (req, res) => {
  try {
    const { postData } = req.query

    const title = new RegExp(postData, 'i')

    const posts = await Post.find({ $or: [{ title }] })
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No match found from the search term' })
    }

    res.status(200).json({ data: posts })
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

const getPostByTag = async (req, res) => {
  try {
    const { tags } = req.query

    const posts = await Post.find({ tags: { $in: tags.split(',') } })
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No match found for the tag' })
    }
    res.status(200).json({ data: posts })
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)

    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

const createPost = async (req, res) => {
  try {
    const postData = req.body
    const post = new Post({
      ...postData,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    })

    await post.save()

    res.status(201).send(post)
  } catch (error) {
    res.status(409).send({
      msg: error,
    })
  }
}

const updatePost = async (req, res) => {
  const { id: _id } = req.params
  try {
    const postData = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({ msg: 'Invalid id' })
    }

    const post = await Post.findByIdAndUpdate(_id, postData, { new: true })

    res.status(200).json({ post })
  } catch (error) {
    res.status(404).json({ msg: error })
  }
}

const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const reqId = req.userId

    if (!reqId) {
      return res.status(409).json({ message: 'unauthenticated' })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ msg: "can't perform action at the moment" })
    }

    const post = await Post.findById(id)

    const index = post.likes.findIndex((id) => id === String(reqId))

    if (index === -1) {
      post.likes.push(reqId)
    } else {
      post.likes = post.likes.filter((id) => id !== String(reqId))
    }

    const likedPost = await Post.findByIdAndUpdate(id, post, { new: true })

    res.status(200).json(likedPost)
  } catch (error) {
    res.status(404).json({ msg: error })
  }
}

const commentOnPost = async (req, res) => {
  try {
    const { id } = req.params
    const { comment, creator } = req.body

    const post = await Post.findById(id)

    post.comments.push(comment)

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })

    res.status(200).json({ updatedPost, commentCreator: creator })
  } catch (error) {
    res.status(404).json({ msg: error })
  }
}

const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({ message: 'Invalid Credentials' })
    }

    const deletedPost = await Post.findByIdAndDelete({ _id })
    res.status(200).json(deletedPost)
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

export {
  getSinglePost,
  getPost,
  getPostBySearch,
  getPostByTag,
  createPost,
  updatePost,
  likePost,
  commentOnPost,
  deletePost,
}

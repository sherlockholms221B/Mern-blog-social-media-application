import express from 'express'
import {
  getSinglePost,
  getPost,
  getPostBySearch,
  getPostByTag,
  createPost,
  updatePost,
  likePost,
  commentOnPost,
  deletePost,
} from '../Controllers/Post.js'
import auth from '../Middleware/Auth.js'

const router = express.Router()
router.route('/').get(getPost)
router.route('/').all(auth).post(createPost)
router.route('/:id').get(getSinglePost)
router.route('/search/posts').get(getPostBySearch)
router.route('/search/posts/searchingtags').get(getPostByTag)
router.route('/:id').all(auth).patch(updatePost).delete(deletePost)
router.route('/:id/like').all(auth).patch(likePost)
router.route('/:id/comment').all(auth).post(commentOnPost)

export default router

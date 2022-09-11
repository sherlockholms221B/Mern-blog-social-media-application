import axios from 'axios'

const API = axios.create({
  baseURL: 'https://blog-social-media-application.herokuapp.com/',
})

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  if (user) {
    req.headers.authorization = `Bearer ${user.token}`
  }
  return req
})

const getSinglePost = (id) => API.get(`/post/${id}`)
const fatchPost = (page) => API.get(`/post?page=${page}`)
const getPostOnSearch = (postData) => {
  return API.get(`/post/search/posts?postData=${postData}`)
}
const getPostByTag = (tag) => {
  return API.get(`/post/search/posts/searchingtags?tags=${tag}`)
}

const createPost = (postData) => API.post('post', postData)
const updatePost = (id, postData) => API.patch(`/post/${id}`, postData)
const likePost = (id) => API.patch(`/post/${id}/like`)
const commentOnPost = (comment, creator, id) => {
  return API.post(`/post/${id}/comment`, { comment, creator })
}
const deletePost = (id) => API.delete(`/post/${id}`)

const signUp = (authData) => API.post(`users/signUp`, authData)
const signIn = (authData) => API.post(`users/signIn`, authData)

export {
  getSinglePost,
  fatchPost,
  getPostOnSearch,
  getPostByTag,
  createPost,
  updatePost,
  likePost,
  commentOnPost,
  deletePost,
  signIn,
  signUp,
}

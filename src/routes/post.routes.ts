import asyncHandler from 'express-async-handler'
import Router from 'express'

import { Post } from '../models/post'

export const postsRouter = Router()

// find many
postsRouter.get('/', asyncHandler(async (request, response) => {
  const foundPosts = await Post.find()
  response.json(foundPosts)
}))

// find one
postsRouter.get('/:id', asyncHandler(async (request, response) => {
  const foundPost = await Post.findOne({ _id: request.params.id })
  response.json(foundPost)
}))

// create one
postsRouter.post('/', asyncHandler(async (request, response) => {
  const createdPost = await Post.create(new Post(request.body))
  response.json(createdPost)
}))

// update one
postsRouter.patch('/:id', asyncHandler(async (request, response) => {
  const updatedPost = await Post.findOneAndUpdate({ _id: request.params.id }, { $set: request.body })
  response.json(updatedPost)
}))

// delete one
postsRouter.delete('/:id', asyncHandler(async (request, response) => {
  const deletedPost = await Post.findByIdAndDelete(request.params.id)
  response.json(deletedPost)
}))
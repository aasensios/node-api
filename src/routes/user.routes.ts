import asyncHandler from 'express-async-handler'
import Router from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { registerValidation, loginValidation } from '../validation/schemas'

export const usersRouter = Router()

usersRouter.post('/register', asyncHandler(async (request, response) => {

  // validate user fields
  const { error } = registerValidation(request.body)
  if (error) return response.status(400).send(error.details[0].message)

  // check if email already exists
  const emailExists = await User.findOne({ email: request.body.email })
  if (emailExists) return response.status(400).send('email already exists')

  // hash password
  const saltRounds = 10
  const hash = bcrypt.hashSync(request.body.password, saltRounds)

  const createdUser = await User.create({
    name: request.body.name,
    email: request.body.email,
    password: hash,
  })
  response.json({ user: createdUser.id })
}))

usersRouter.post('/login', asyncHandler(async (request, response) => {

  // validate user fields
  const { error } = loginValidation(request.body)
  if (error) return response.status(400).send(error.details[0].message)

  // check if email already exists
  const foundUser = await User.findOne({ email: request.body.email })
  if (!foundUser) return response.status(400).send('email is not registered yet')

  // check password
  const validPassword = bcrypt.compareSync(request.body.password, foundUser.password)
  if (!validPassword) return response.status(400).send('password is not correct')

  // create and assign a json web token
  const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET || 'secret')
  response.header('auth-token', token).send(token)
}))
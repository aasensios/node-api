import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface UserAuthRequest extends Request {
  user?: string | object
}

export const auth = (request: UserAuthRequest, response: Response, next: any) => {
  const token = request.header('auth-token')
  if (!token) return response.status(401).send('access denied')
  try {
    request.user = jwt.verify(token || 'default-token', process.env.JWT_SECRET || 'default-secret')
    next()
  } catch {
    response.status(400).send('invalid token')
  }
}
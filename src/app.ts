import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import { usersRouter } from './routes/user.routes'
import { postsRouter } from './routes/post.routes'
import { auth } from './validation/token'

dotenv.config()
const app: express.Application = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use('/users', usersRouter)
app.use('/posts', auth, postsRouter)
app.get('/', (request, response) => response.send('we are on home'))
mongoose.connect(
  process.env.MONGO_DNS_SEED_LIST_CONNECTION || 'mongodb://localhost:27017/blog',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log('connected to mongodb cloud Cluster0: blog database')
)
app.listen(port, () => console.log(`listening at http://localhost:${port}`))
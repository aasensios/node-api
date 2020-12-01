import mongoose, { Schema, Document } from 'mongoose'

interface Post extends Document {
  title: string
  description: string
  date: Date
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

export const Post = mongoose.model<Post>('Post', PostSchema)
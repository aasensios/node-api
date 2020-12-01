import mongoose, { Schema, Document } from 'mongoose'

interface User extends Document {
  name: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export const User = mongoose.model<User>('User', UserSchema)
import Mongoose, { Schema } from 'mongoose'
import sanitize from '../plugins/sanitize'
import Comment from './Comment'
import Like from './Like'

const postSchema = new Schema({
  user: {
    id: {type: String, required: true},
    name: {type: String, required: true}
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

postSchema.virtual('comments', {
  ref: 'Comment', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'post.id' // is equal to `foreignField`
})

postSchema.virtual('likes', {
  ref: 'Like', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'post.id' // is equal to `foreignField`
})

postSchema.virtual('comment_count').get(function () {
  return this.comments && this.comments.length || 0
})

postSchema.virtual('like_count').get(function () {
  return this.likes && this.likes.length || 0
})

postSchema.statics.deletePost = async function(postId) {
  return await this.findByIdAndRemove(postId).exec()
}

postSchema.pre('remove', async function(next) {
  const likes = await Like.find({ 'post.id': this._id }).remove().exec()
  const comments = await Comment.find({ 'post.id': this._id }).remove().exec()
  next()
})

postSchema.plugin(sanitize)
export default Mongoose.model('Quote', postSchema)

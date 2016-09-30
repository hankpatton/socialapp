import Mongoose, { Schema } from 'mongoose'
import sanitize from '../plugins/sanitize'

const commentSchema = new Schema({
  post: {
    id: { type: String, required: true }
  },
  user: {
    id: {type: String, required: true},
    name: {type: String, required: true},
    image: {type: String}
  },
  text: { type: String, required: true }
}, {
  timestamps: true
})

commentSchema.plugin(sanitize)
export default Mongoose.model('Comment', commentSchema)

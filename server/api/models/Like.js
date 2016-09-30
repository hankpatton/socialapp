import Mongoose, { Schema } from 'mongoose'
import sanitize from '../plugins/sanitize'

const likeSchema = new Schema({
  post: {
    id: { type: String, required: true }
  },
  user: {
    id: {type: String, required: true},
    name: {type: String, required: true}
  }
})

likeSchema.plugin(sanitize)
export default Mongoose.model('Like', likeSchema)

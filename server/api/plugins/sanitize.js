import mongoose from 'mongoose'

export default function sanitize (schema, keys = []) {
  const toJSON = schema.methods.toJSON || mongoose.Document.prototype.toJSON

  // Include virtual properties (eg: id)
  schema.set('toJSON', {
    virtuals: true
  })

  schema.methods.toJSON = function () {
    const json = toJSON.apply(this, arguments)
    return json
  }
}

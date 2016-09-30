import Router from 'koa-router'
import { authCheck } from '../middleware/auth'
import Comment from '../models/Comment'

const comments = new Router()

comments.get('/', async (ctx, next) => {
  try {
    ctx.body = await Comment.find({}).exec()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

comments.post('/', authCheck, async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = await new Comment(body).save()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

comments.put('/:id', authCheck, async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = await Comment.findByIdAndUpdate(ctx.params.id, body, { new: true }).exec()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

comments.delete('/:id', authCheck, async (ctx, next) => {
  try {
    ctx.body = await Comment.findByIdAndRemove(ctx.params.id).exec()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

export default comments

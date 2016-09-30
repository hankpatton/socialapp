import Router from 'koa-router'
import { authCheck } from '../middleware/auth'
import Like from '../models/Like'

const likes = new Router()

likes.get('/', async (ctx, next) => {
  try {
    ctx.body = await Like.find({}).exec()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

likes.post('/', authCheck, async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = await new Like(body).save()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

likes.put('/:id', authCheck, async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = await Like.findByIdAndUpdate(ctx.params.id, body)
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

likes.delete('/:id', authCheck, async (ctx, next) => {
  try {
    ctx.body = await Like.findByIdAndRemove(ctx.params.id).exec()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

export default likes

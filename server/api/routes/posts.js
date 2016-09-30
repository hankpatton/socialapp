import Router from 'koa-router'
import { authCheck } from '../middleware/auth'
import Post from '../models/Post'

const posts = new Router()

posts.get('/', async (ctx, next) => {
  try {
    ctx.body = await Post
    .find({})
    .populate('comments likes')
    .sort('-createdAt')
    .exec()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

posts.post('/', authCheck, async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = await new Post(body).save()
  } catch (err) {
    ctx.databaseError(err)
  }
  if (!body.text) ctx.throw('Please add text.', 404)
  await next()
})

posts.put('/:id', authCheck, async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = await Post.findByIdAndUpdate(ctx.params.id, body, { new: true }).exec()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

posts.delete('/:id', authCheck, async (ctx, next) => {
  try {
    const id = await Post.findById(ctx.params.id)
    ctx.body = await id.remove()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

posts.get('/:id', async (ctx, next) => {
  try {
    ctx.body = await Post
    .findById(ctx.params.id)
    .populate('comments likes')
    .exec()
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

posts.get('/posts/count', async (ctx, next) => {
  try {
    const count = await Post.find({}).count().exec()
    ctx.body = {count}
  } catch (err) {
    ctx.databaseError(err)
  }
  await next()
})

export default posts

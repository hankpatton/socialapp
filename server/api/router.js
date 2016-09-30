import Router from 'koa-router'

// Middleware
import bodyParser from 'koa-bodyparser'
import * as errorMw from './middleware/error'

// API Routes
import posts from './routes/posts'
import comments from './routes/comments'
import likes from './routes/likes'

// Create API router and apply middleware
const apiRouter = new Router()

// apiRouter.use(cors());
apiRouter.use(errorMw.databaseError)
apiRouter.use(errorMw.handleError)
apiRouter.use(bodyParser())

apiRouter.use('/posts', posts.routes(), posts.allowedMethods())
apiRouter.use('/comments', comments.routes(), comments.allowedMethods())
apiRouter.use('/likes', likes.routes(), likes.allowedMethods())

export default apiRouter

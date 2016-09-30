export default async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (ctx.app.context.isDevelopment) {
      console.log(error)
    }
    ctx.status = error.statusCode || error.status || 500
    ctx.body = {
      message: error.message
    }
  }
}

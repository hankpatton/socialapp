export default async (ctx, next) => {
  ctx.databaseError = function (error) {
    if (this.app.context.isDevelopment) {
      console.log(error)
    }
    this.throw('DATABASE_ERROR')
  }
  await next()
}

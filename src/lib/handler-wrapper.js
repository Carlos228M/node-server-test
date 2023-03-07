export const handlerWrapper = (handler) => {
   return async (req, res, next) => {
      try {
         await handler(req, res, next)
      } catch (err) {
         next(err)
      }
   }
}

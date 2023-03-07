import { Router } from 'express'
import { handlerWrapper } from '#lib/handler-wrapper.js'
import UserRegisterService from '#services/user-register.service.js'
import { userRegisterBodyValidator, userRegisterIDValidator } from '#dtos/user-register.dto.js'

const userRouter = Router()

userRouter.get(
   '/:id',
   handlerWrapper((req, res, next) => {
      req.log.info(`GET Usuario nº ${req.params.id}`)
      return res.send(`GET Usuario nº ${req.params.id}`)
      // throw new Error('error forzado')
   })
)

userRouter.post(
   '/register/:id',
   handlerWrapper((req, res, next) => {
      const isUserIDValid = userRegisterIDValidator(req.params.id)

      if (!isUserIDValid)
         return next(
            new Error(userRegisterBodyValidator.errors.map((error) => error.message).join('\n'))
         )

      const isUserBodyValid = userRegisterBodyValidator(req.body)
      if (!isUserBodyValid)
         return next(
            new Error(userRegisterBodyValidator.errors.map((error) => error.message).join('\n'))
         )
      req.log.info(`POST Usuario nº ${req.params.id}`)

      UserRegisterService(req.body)

      return res.send(`POST Usuario nº ${req.params.id}`)
   })
)

export default userRouter

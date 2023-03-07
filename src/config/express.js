import userRouter from '#routers/user.router.js'
import express, { json, text } from 'express'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { httpLogger } from './logger.js'

const expressApp = express()
const PATH = dirname(fileURLToPath(import.meta.url))
// App middlewares
expressApp.use(cookieParser())
expressApp.use(json())
expressApp.use(text())
expressApp.use('/public', express.static(join(PATH, '../../public')))
expressApp.use((req, res, next) => {
   httpLogger(req, res)
   next()
})

// Routers
expressApp.use('/users', userRouter)

// Error handling middleware
expressApp.use((err, req, res, next) => {
   res.err = {
      message: err.message,
      stack: err.stack
   }
   next(err)
})

expressApp.use((err, req, res, next) => {
   return res.status(500).send({ errorMessages: err.message.split('\n') })
})

export default expressApp

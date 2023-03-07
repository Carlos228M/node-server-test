import uuid from 'uuid-random'
import { pinoHttp } from 'pino-http'

export const httpLogger = pinoHttp({
   genReqId: () => uuid(),
   customLogLevel: (req, res) => {
      if (res.statusCode < 400) return 'info'
      return 'error'
   },
   transport: {
      pipeline: [
         {
            target: 'pino-pretty',
            options: {
               destination: 1,
               translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
               levelFirst: true,
               minimumLevel: 'error'
            }
         }
      ]
   }
})

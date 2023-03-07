import expressApp from '#config/express.js'
import { createServer } from 'http'

const PORT = 3000

const httpServer = createServer(expressApp)
httpServer.listen(PORT, () => console.log(`Servidor HTTP en el puerto ${PORT}`))

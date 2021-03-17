const server = require('./server/server')
const serverAddress = '0.0.0.0:42069'

const main = () => {
    server.start(serverAddress)
}

main()

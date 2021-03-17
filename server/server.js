const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = `${__dirname}/../proto/messager.proto`
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, 
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
const messager_proto = grpc.loadPackageDefinition(packageDefinition).messager
const server = new grpc.Server()
const send = (call, callback) => {
    const {request} = call.request
    callback(null, {response: `Got: ${request}!`})
}
server.addService(messager_proto.Messager.service, {send: send})

const start = (serverAddress) => {
    server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return err 
        server.start()
    })
}

const stop = () => {
    server.tryShutdown(err => {
        if (err) console.log('Something went wrong when shutting down server.')
        else console.log('Server shutdown successfully!')
    })
}

module.exports = {
    start,
    stop
}

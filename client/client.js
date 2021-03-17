/**
 * The Client for sending a recieving the key-value rpc messages.
 */

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
const target = 'localhost:42069'
const client = new messager_proto.Messager(target, 
        grpc.credentials.createInsecure())

function send(request) {
    if (request) {
        client.send({request}, (err, response) => {
            if (!err) console.log(response)
            else console.log(err)
        })
    } else {
        console.log('Arguments not provided.')
    }
}

module.exports = {
    send
}
 
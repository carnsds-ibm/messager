const client = require('./client/client.js')

const keys = ['hello', 'bye', 'awesome']
const values = ['whatever', 1, 'sweet']

const main = () => {
    keys.forEach(key => {
        values.forEach(value => {
            client.send(key + ' ' + value)
        })
    });
}

main()
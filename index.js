const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const message = Buffer.from('Hello, ackcess!');

client.send(message, 80, '159.89.187.30', (err) => {
    if (err) {
        console.error(`Client error:\n${err.stack}`);
        client.close();
    } else {
        console.log('Message sent');
    }
});

client.on('message', (msg, rinfo) => {
    console.log(`Client received: ${msg} from ${rinfo.address}:${rinfo.port}`);
    client.close();
});

import socketio from 'socket.io-client';

const socket = socketio('http://10.0.0.12:3333', {
    autoConnect: false,
})

function subscribeToNewDevs(subscribeFunction) {
    socket.on('New-Dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }

    socket.connect();
    socket.on('message', text => {
        console.log(text);
    })
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}
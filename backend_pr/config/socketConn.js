const { Server } = require("socket.io");
let io = null;

function init(server) {
    io=new Server(server,{
        connectionStateRecovery: {},
        cors:{
            origin: 'http://localhost:3000',
        },
        credentials:'include',
        methods:["GET","POST"],
    })

    io.on('connection', socket => {
        console.log('A user connected');
        // console.log(socket.id);
    });
    return io;
}

function getIo() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = { init, getIo };

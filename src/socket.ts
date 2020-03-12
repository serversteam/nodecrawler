import { server } from './server';
import app from './app';
import socketio from "socket.io";

class Socket {
    public io = socketio();
    constructor() {
        this.initializeSocket();
    }

    public initializeSocket() {
        console.log('here');
        this.io.listen(server);
        this.io.on('connection', (socket) => {
            console.log('connected');
        });
        this.io.on('disconnect', (err:any) => {
            console.log('disconnect');
        })
    }
}

export default new Socket();
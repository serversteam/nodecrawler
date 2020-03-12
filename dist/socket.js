"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const socket_io_1 = __importDefault(require("socket.io"));
class Socket {
    constructor() {
        this.io = socket_io_1.default();
        this.initializeSocket();
    }
    initializeSocket() {
        console.log('here');
        this.io.listen(server_1.server);
        this.io.on('connection', (socket) => {
            console.log('connected');
        });
        this.io.on('disconnect', (err) => {
            console.log('disconnect');
        });
    }
}
exports.default = new Socket();
//# sourceMappingURL=socket.js.map
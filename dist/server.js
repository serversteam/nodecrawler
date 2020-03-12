"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const http_1 = __importDefault(require("http"));
const PORT = 3000;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = http_1.default.createServer(App_1.default);
exports.server = server;
server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port !${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map
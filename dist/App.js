"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const route_1 = require("./routes/route");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class App {
    constructor() {
        this.route = new route_1.Route();
        this.mongoUrl = process.env.MONGODB_URI;
        this.app = express_1.default();
        this.configureApp();
        this.initializeMongoConnection();
        this.route.routes(this.app);
    }
    configureApp() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //add cors headers
        this.corsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: process.env.FRONT_URL,
            preflightContinue: false
        };
        this.app.use(cors_1.default(this.corsOptions));
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    initializeMongoConnection() {
        mongoose_1.default.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=App.js.map
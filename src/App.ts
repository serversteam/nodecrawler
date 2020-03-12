import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import mongoose from 'mongoose';
import { Route } from "./routes/route";
import dotenv  from 'dotenv';
dotenv.config();

class App {

    public app: express.Application;
    public corsOptions: cors.CorsOptions;
    public route: Route = new Route();
    public mongoUrl: string = process.env.MONGODB_URI;

    constructor() {
        this.app = express();
        this.configureApp();
        this.initializeMongoConnection();

        this.route.routes(this.app);
    }

    private configureApp(): void {
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
        this.app.use(cors(this.corsOptions));
        
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private initializeMongoConnection(): void {
        mongoose.connect(this.mongoUrl, 
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true 
            }
        );
    }
}

export default new App().app;
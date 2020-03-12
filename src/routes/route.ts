import {Request, Response} from "express";
import { CrawlController } from '../controllers/crawlController';

export class Route {    
    private crawlController: CrawlController = new CrawlController();

    public routes(app:any): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        });

        app.route('/v1/api/get-data').get((req: Request, res: Response) => this.crawlController.getData(req, res));

        app.route('/v1/api/add-data').post((req: Request, res: Response) => this.crawlController.addData(req, res));

    }
}
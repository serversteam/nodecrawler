"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crawlController_1 = require("../controllers/crawlController");
class Route {
    constructor() {
        this.crawlController = new crawlController_1.CrawlController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.route('/v1/api/get-data').get((req, res) => this.crawlController.getData(req, res));
        app.route('/v1/api/add-data').post((req, res) => this.crawlController.addData(req, res));
    }
}
exports.Route = Route;
//# sourceMappingURL=route.js.map
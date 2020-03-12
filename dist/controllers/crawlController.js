"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crawlModel_1 = require("../models/crawlModel");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const bull_1 = __importDefault(require("bull"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Crawl = mongoose_1.default.model('scraper', crawlModel_1.CrawlModel);
class CrawlController {
    constructor() {
        this.urlScraping = new bull_1.default('URL scraping', process.env.REDIS_URL);
    }
    getData(req, res) {
        Crawl.find({}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
    addData(req, res) {
        let url = req.body.url;
        const data = { url: url };
        const options = { delay: 0, attempts: 1 };
        this.urlScraping.add(data, options);
        this.queueProcess();
        res.send('background process started');
    }
    scrapeData(url) {
        let baseUrl = url.match(/^https?:\/\/[^#?\/]+/)[0];
        axios_1.default(url)
            .then((response) => {
            const html = response.data;
            const $ = cheerio_1.default.load(html);
            let allUrls = [];
            $('body').find($('a')).each(function (i, url) {
                let innerUrl = $(this).attr('href');
                if (innerUrl && innerUrl.startsWith('/')) {
                    innerUrl = baseUrl + innerUrl;
                }
                if (innerUrl && innerUrl.includes(baseUrl) && !innerUrl.includes('#')) {
                    allUrls.push(innerUrl);
                }
            });
            allUrls = allUrls.filter((elem, pos) => {
                return allUrls.indexOf(elem) == pos;
            });
            this.getAllUrlsData(allUrls);
        })
            .catch(console.error);
    }
    getAllUrlsData(urls) {
        console.log(urls.length);
        let allPromises = [];
        urls.forEach((url) => {
            allPromises.push(axios_1.default.get(url));
        });
        axios_1.default.all(allPromises)
            .then((responses) => {
            responses.forEach((response) => {
                let html = response.data;
                let $ = cheerio_1.default.load(html);
                let json = {
                    url: response.config.url,
                    title: $('title').text(),
                    heading: $('h1').text(),
                    description: $('meta[name="description"]').attr('content'),
                };
                Crawl.find({ url: response.config.url }, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    if (data.length == 0) {
                        const crawl = new Crawl(json);
                        crawl.save((err, res) => {
                            if (err) {
                                console.log(err);
                            }
                            //console.log(res);
                        });
                    }
                });
            });
        });
    }
    queueProcess() {
        this.urlScraping.process((job, done) => {
            this.scrapeData(job.data.url);
            done();
            throw new Error('some unexpected error');
        });
    }
}
exports.CrawlController = CrawlController;
//# sourceMappingURL=crawlController.js.map
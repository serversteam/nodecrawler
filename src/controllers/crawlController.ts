import mongoose from 'mongoose';
import { CrawlModel } from '../models/crawlModel';
import { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import Queue from 'bull';

const Crawl = mongoose.model('scraper', CrawlModel);

export class CrawlController {

    private urlScraping = new Queue('URL scraping', process.env.REDIS_URL);
    constructor() {
        
    }

    public getData(req: Request, res: Response): void {
        
        Crawl.find({}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }

    public addData(req: Request, res: Response): void {
        let url = req.body.url;

        const data = {url: url} ;
        const options = { delay: 0, attempts: 1 };
        this.urlScraping.add(data, options);
        this.queueProcess();

        res.send('background process started');
    }

    private scrapeData(url:string) {
        let baseUrl = url.match(/^https?:\/\/[^#?\/]+/)[0];
        axios(url)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            
            let allUrls:any = [];
            $('body').find($('a')).each(function(i, url) {
                let innerUrl = $(this).attr('href');
                if(innerUrl && innerUrl.startsWith('/')) {
                    innerUrl = baseUrl + innerUrl;
                }

                if(innerUrl && innerUrl.includes(baseUrl) && !innerUrl.includes('#')) {
                    allUrls.push(innerUrl);
                }
            });

            allUrls = allUrls.filter((elem: string, pos: number) => {
                return allUrls.indexOf(elem) == pos;
            });

            this.getAllUrlsData(allUrls);
        })
        .catch(console.error);
    }

    private getAllUrlsData(urls:any) {
        console.log(urls.length);
        let allPromises:any = [];
        urls.forEach((url: string) => {
            allPromises.push(axios.get(url));
        });

        axios.all(allPromises)
        .then((responses) => {
            responses.forEach((response:any) => {
                let html = response.data;
                let $ = cheerio.load(html);
                let json = {
                    url: response.config.url,
                    title: $('title').text(),
                    heading: $('h1').text(),
                    description: $('meta[name="description"]').attr('content'),
                }
                Crawl.find({url: response.config.url}, (err, data) => {
                    if(err) {
                        console.log(err);
                    }

                    if(data.length == 0) {
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
        })
    }

    private queueProcess() : any{
        this.urlScraping.process((job, done) => {
            this.scrapeData(job.data.url);
            done();
            throw new Error('some unexpected error');
        });
    }
}
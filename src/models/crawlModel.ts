import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CrawlModel = new Schema({
    url: {
        type: String
    },
    title: {
        type: String,
    },
    heading: {
        type: String,
    },
    description: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
});
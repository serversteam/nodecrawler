"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
exports.CrawlModel = new Schema({
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
//# sourceMappingURL=crawlModel.js.map
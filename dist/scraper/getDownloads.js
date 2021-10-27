"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDownloads = void 0;
const cheerio_1 = require("cheerio");
const util_1 = require("../util");
const getDownloads = (request, url) => __awaiter(void 0, void 0, void 0, function* () {
    if (!util_1.OtakUtil.validateDownloadUrl(url))
        return [];
    const response = yield request.get(url);
    const $ = (0, cheerio_1.load)(response.getContent());
    if (!$('title').text().trim().match(/otaku/gi))
        return [];
    const downloads = $(url.match(/batch/gi) ? '.batchlink > ul > li' :
        '#venkonten > .venser > .venutama > .download > ul > li').map((_, el) => ({
        resolution: $(el).find('strong').text().trim(),
        links: $(el).find('a').map((_, el2) => ({
            name: $(el2).text().trim(),
            url: $(el2).attr('href'),
        })).toArray(),
    })).toArray();
    if (url.match(/lengkap/gi) && new Set(downloads).size !== downloads.length) {
        $('#venkonten > .download > h4').each((index, element) => {
            downloads[index]['title'] = $(element).text().trim();
        });
    }
    return downloads;
});
exports.getDownloads = getDownloads;

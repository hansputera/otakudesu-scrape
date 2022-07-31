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
exports.getExtraAnime = void 0;
const cheerio_1 = require("cheerio");
const phin = require("phin");
const constants_1 = require("../constants");
const getExtraAnime = (requestUrl, slug) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield phin({
        url: new URL((0, constants_1.getAnimeEndpoint)(slug), requestUrl),
    });
    if (response.statusCode < 200 && response.statusCode >= 300) {
        return undefined;
    }
    const $ = (0, cheerio_1.load)(response.body.toString());
    const details = $('.infozingle > p').map((_, el) => {
        const value = $(el).text().split(':')[1].trim();
        return {
            key: $(el).text().split(':')[0].trim().toLowerCase(),
            value: value.split(',').length > 3 ? value.split(', ') : value,
        };
    }).toArray().reduce((x, y) => {
        x[y.key] = y.value;
        return x;
    }, {});
    const episodes = $('.episodelist > ul > li').map((_, el) => ({
        title: $(el).find('span > a').text().trim(),
        url: $(el).find('span > a').attr('href'),
        date: $(el).find('.zeebr').text().trim(),
    })).toArray();
    return {
        episodes,
        details,
        synopsis: $('.sinopc').text(),
        image: $('.fotoanime > img').attr('src'),
        name: slug,
        url: new URL((0, constants_1.getAnimeEndpoint)(slug), requestUrl).href,
    };
});
exports.getExtraAnime = getExtraAnime;

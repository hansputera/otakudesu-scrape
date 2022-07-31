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
exports.getGenreList = void 0;
const cheerio_1 = require("cheerio");
const phin = require("phin");
const constants_1 = require("../constants");
const getGenreList = (requestUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield phin({
        'url': new URL(constants_1.ListEndpoint.genreList, requestUrl),
    });
    const $ = (0, cheerio_1.load)(response.body.toString('utf8'));
    return $('.venser > ul.genres > li > a')
        .map((_, genEl) => ({ name: $(genEl).text().trim(),
        url: new URL($(genEl).attr('href'), requestUrl).href,
    })).toArray();
});
exports.getGenreList = getGenreList;

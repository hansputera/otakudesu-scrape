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
exports.getAnime = void 0;
const cheerio_1 = require("cheerio");
const _1 = require(".");
const constants_1 = require("../constants");
const getAnime = (request, q, ext = false) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get((0, constants_1.getSearchAnimeEndpoint)(q));
    const $ = (0, cheerio_1.load)(response.getContent());
    return $('ul.chivsrc > li').map((_, element) => {
        var _a;
        return ({
            name: $(element).find('h2').text().trim(),
            image: $(element).find('img').attr('src'),
            meta: $(element).find('.set').map((_, metaElement) => {
                const text = $(metaElement).text().trim();
                return {
                    key: text.split(':')[0].trim().toLowerCase(),
                    value: text.split(':')[1].replace(/\s/, '').toLowerCase(),
                };
            }).toArray()
                .reduce((x, y) => {
                x[y.key] = y.value.split(',').length > 1 ? y.value.split(',') : y.value;
                return x;
            }, {}),
            url: $(element).find('h2 > a').attr('href'),
            slug: (_a = $(element).find('h2 > a').attr('href')) === null || _a === void 0 ? void 0 : _a.split('/').filter((s) => s.length).pop(),
            extra: () => {
                var _a;
                return (0, _1.getExtraAnime)(request, (_a = $(element).find('h2 > a').attr('href')) === null || _a === void 0 ? void 0 : _a.split('/').filter((s) => s.length).pop());
            },
        });
    }).toArray();
});
exports.getAnime = getAnime;

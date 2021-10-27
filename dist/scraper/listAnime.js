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
exports.getListAnime = void 0;
const cheerio_1 = require("cheerio");
const constants_1 = require("../constants");
const getListAnime = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get(constants_1.ListEndpoint.animeList);
    const $ = (0, cheerio_1.load)(response.getContent());
    return $('#abtext > .bariskelom').map((_, el) => {
        var _a;
        return ({
            _index: parseInt($(el).find('.barispenz').text().trim()),
            name: $(el).find('.hodebgst').attr('title'),
            url: $(el).find('.hodebgst').attr('href'),
            slug: (_a = $(el).find('.hodebgst').attr('href')) === null || _a === void 0 ? void 0 : _a.split('/').filter((s) => s.length).pop(),
        });
    }).toArray();
});
exports.getListAnime = getListAnime;

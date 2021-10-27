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
const util_1 = require("hanif-tiny-http/dist/util");
const constants_1 = require("../constants");
const getGenreList = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get(constants_1.ListEndpoint.genreList);
    const $ = (0, cheerio_1.load)(response.getContent());
    return $('.venser > ul.genres > li > a')
        .map((_, genEl) => ({ name: $(genEl).text().trim(),
        url: util_1.Util.resolveUri($(genEl).attr('href'), request) })).toArray();
});
exports.getGenreList = getGenreList;

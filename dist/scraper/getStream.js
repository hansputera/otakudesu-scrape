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
exports.getAnimeStream = void 0;
const cheerio_1 = require("cheerio");
const hanif_tiny_http_1 = require("hanif-tiny-http");
const __1 = require("..");
const getAnimeStream = (req, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!__1.OtakUtil.validateDownloadUrl(url))
            return undefined;
        else if (/batch/gi.test(url)) {
            throw new TypeError('Batch video isn\'t supported on this method');
        }
        const response = yield req.get(url);
        const $ = (0, cheerio_1.load)(response.getContent());
        const desuStream = $('.player-embed > .responsive-embed-stream > iframe').attr('src');
        // getting desu video
        const responseDesu = yield hanif_tiny_http_1.tinyHttp.get(desuStream);
        const $desu = (0, cheerio_1.load)(responseDesu.getContent());
        const aaa = yield hanif_tiny_http_1.tinyHttp.get($desu('#mediaplayer > source').attr('src'), {
            stream: true,
        });
        return aaa.stream;
    }
    catch (err) {
        __1.signal.emit('error', err);
        return undefined;
    }
});
exports.getAnimeStream = getAnimeStream;

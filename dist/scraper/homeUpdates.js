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
exports.getHomeUpdates = void 0;
const cheerio_1 = require("cheerio");
const util_1 = require("../util");
const getHomeUpdates = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get('./');
    const $ = (0, cheerio_1.load)(response.getContent());
    return $('.venz > ul > li').map((_, el) => {
        var _a;
        return ({
            name: $(el).find('.thumb > a > .thumbz > .jdlflm').text().trim(),
            image: $(el).find('.thumb > a > .thumbz > img').attr('src'),
            releaseAt: util_1.OtakUtil.resolveReleaseDate($(el).find('.newnime').text().trim() + ' ' +
                $(el).find('.epztipe').text().trim()),
            url: $(el).find('.thumb > a').attr('href'),
            slug: (_a = $(el).find('.thumb > a').attr('href')) === null || _a === void 0 ? void 0 : _a.split('/').filter((s) => s.length).pop(),
        });
    }).toArray();
});
exports.getHomeUpdates = getHomeUpdates;

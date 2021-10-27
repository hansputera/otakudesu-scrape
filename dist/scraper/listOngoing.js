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
exports.getOngoingList = void 0;
const cheerio_1 = require("cheerio");
const constants_1 = require("../constants");
const util_1 = require("../util");
const getOngoingList = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get(constants_1.ListEndpoint.ongoing);
    const $ = (0, cheerio_1.load)(response.getContent());
    return $('.venz > ul > li').map((_, element) => ({
        episode: parseInt($(element).find('.detpost > .epz').text()
            .replace(/[a-z]/gi, '').trim()),
        releaseAt: util_1.OtakUtil.resolveReleaseDate($(element).find('.detpost > .newnime').text().trim() +
            ' ' + $(element).find('.detpost > .epztipe').text().trim()),
        image: $(element).find('.detpost > .thumb > a > .thumbz > img')
            .attr('src'),
        name: $(element).find('.detpost > .thumb > a > .thumbz > .jdlflm')
            .text().trim(),
        url: $(element).find('.detpost > .thumb > a').attr('href'),
        slug: $(element).find('.detpost > .thumb > a').attr('href')
            .split('/').filter((s) => s.length).pop(),
    })).toArray();
});
exports.getOngoingList = getOngoingList;

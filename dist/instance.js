"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtakudesuInstance = void 0;
const hanif_tiny_http_1 = require("hanif-tiny-http");
const _1 = require(".");
const constants_1 = require("./constants");
const scraper_1 = require("./scraper");
const util_1 = require("./util");
/**
 * @description - Otakudesu Instance, here you go.
 */
class OtakudesuInstance {
    /**
       *
       * @param {String} baseUrl - Base URL For Otakudesu site
       */
    constructor(baseUrl = constants_1.baseURL) {
        this.baseUrl = baseUrl;
        this.request = new hanif_tiny_http_1.TinyHttpClient({
            baseURL: this.baseUrl,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
        if (!util_1.OtakUtil.validateURL(baseUrl)) {
            throw new TypeError('Invalid Base URL URL');
        }
    }
    ;
    /**
     * @description You can use this method for getting genre list.
     * @return {Genre[]}
     */
    listGenre() {
        return (0, scraper_1.getGenreList)(this.request);
    }
    /**
     * @description You can use this method for getting ongoing anime list.
     * @return {OngoingAnime[]}
     */
    listOngoing() {
        return (0, scraper_1.getOngoingList)(this.request);
    }
    /**
     * @description You can use this method for getting news update from
     * site homepage.
     * @return {HomeAnimeUpdate[]}
     */
    listHomeUpdate() {
        return (0, scraper_1.getHomeUpdates)(this.request);
    }
    /**
     * @description You can use this method for getting anime information.
     * @param {String} anime - Fill this parameter with anime name. (Eg. Boruto)
     * @return {Anime[]}
     */
    getAnime(anime) {
        return (0, scraper_1.getAnime)(this.request, anime);
    }
    /**
     * @description You can use this method for getting extra anime information.
     * @param {String} slugAnime - Fill this parameter with anime slug.
     * @return {ExtraAnime}
     */
    getExtraAnime(slugAnime) {
        return (0, scraper_1.getExtraAnime)(this.request, slugAnime);
    }
    /**
     * @description You can use this method for getting otakudesu download(s) url.
     * @param {String} downloadUrl - Download URL (Episode URL)
     * @return {Download[]}
     */
    getDownloadsByUrl(downloadUrl) {
        return (0, scraper_1.getDownloads)(this.request, downloadUrl);
    }
    /**
     * @param {String} downloadUrl - Download URL
     * @return {PassThrough}
     */
    getStream(downloadUrl) {
        return (0, scraper_1.getAnimeStream)(this.request, downloadUrl);
    }
}
__decorate([
    _1.handleException
], OtakudesuInstance.prototype, "listGenre", null);
__decorate([
    _1.handleException
], OtakudesuInstance.prototype, "listOngoing", null);
__decorate([
    _1.handleException
], OtakudesuInstance.prototype, "listHomeUpdate", null);
__decorate([
    _1.handleException
], OtakudesuInstance.prototype, "getAnime", null);
__decorate([
    _1.handleException
], OtakudesuInstance.prototype, "getExtraAnime", null);
__decorate([
    _1.handleException
], OtakudesuInstance.prototype, "getDownloadsByUrl", null);
__decorate([
    _1.handleException
], OtakudesuInstance.prototype, "getStream", null);
exports.OtakudesuInstance = OtakudesuInstance;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtakudesuInstance = void 0;
const constants_1 = require("./constants");
const scraper_1 = require("./scraper");
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
    }
    /**
     * @description You can use this method for getting genre list.
     * @return {Genre[]}
     */
    listGenre() {
        return (0, scraper_1.getGenreList)(this.baseUrl);
    }
    /**
     * @description You can use this method for getting ongoing anime list.
     * @return {OngoingAnime[]}
     */
    listOngoing() {
        return (0, scraper_1.getOngoingList)(this.baseUrl);
    }
    /**
     * @description You can use this method for getting news update from
     * site homepage.
     * @return {HomeAnimeUpdate[]}
     */
    listHomeUpdate() {
        return (0, scraper_1.getHomeUpdates)(this.baseUrl);
    }
    /**
     * @description You can use this method for getting anime information.
     * @param {String} anime - Fill this parameter with anime name. (Eg. Boruto)
     * @return {Anime[]}
     */
    getAnime(anime) {
        return (0, scraper_1.getAnime)(this.baseUrl, anime);
    }
    /**
     * @description You can use this method for getting extra anime information.
     * @param {String} slugAnime - Fill this parameter with anime slug.
     * @return {ExtraAnime}
     */
    getExtraAnime(slugAnime) {
        return (0, scraper_1.getExtraAnime)(this.baseUrl, slugAnime);
    }
    /**
     * @description You can use this method for getting otakudesu download(s) url.
     * @param {String} downloadUrl - Download URL (Episode URL)
     * @return {Download[]}
     */
    getDownloadsByUrl(downloadUrl) {
        return (0, scraper_1.getDownloads)(this.baseUrl, downloadUrl);
    }
    /**
     * @param {String} downloadUrl - Download URL
     * @return {PassThrough}
     */
    getStream(downloadUrl) {
        return (0, scraper_1.getAnimeStream)(this.baseUrl, downloadUrl);
    }
}
exports.OtakudesuInstance = OtakudesuInstance;

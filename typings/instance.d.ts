/// <reference types="node" />
import { TinyHttpClient } from 'hanif-tiny-http';
import { PassThrough } from 'node:stream';
import type { Genre, Anime, OngoingAnime, ExtraAnime, Download, HomeAnimeUpdate } from './types';
/**
 * @description - Otakudesu Instance, here you go.
 */
export declare class OtakudesuInstance {
    private baseUrl;
    /**
       *
       * @param {String} baseUrl - Base URL For Otakudesu site
       */
    constructor(baseUrl?: string);
    request: TinyHttpClient;
    /**
     * @description You can use this method for getting genre list.
     * @return {Genre[]}
     */
    listGenre(): Promise<Genre[]>;
    /**
     * @description You can use this method for getting ongoing anime list.
     * @return {OngoingAnime[]}
     */
    listOngoing(): Promise<OngoingAnime[]>;
    /**
     * @description You can use this method for getting news update from
     * site homepage.
     * @return {HomeAnimeUpdate[]}
     */
    listHomeUpdate(): Promise<HomeAnimeUpdate[]>;
    /**
     * @description You can use this method for getting anime information.
     * @param {String} anime - Fill this parameter with anime name. (Eg. Boruto)
     * @return {Anime[]}
     */
    getAnime(anime: string): Promise<Anime[]>;
    /**
     * @description You can use this method for getting extra anime information.
     * @param {String} slugAnime - Fill this parameter with anime slug.
     * @return {ExtraAnime}
     */
    getExtraAnime(slugAnime: string): Promise<ExtraAnime | undefined>;
    /**
     * @description You can use this method for getting otakudesu download(s) url.
     * @param {String} downloadUrl - Download URL (Episode URL)
     * @return {Download[]}
     */
    getDownloadsByUrl(downloadUrl: string): Promise<Download[]>;
    /**
     * @param {String} downloadUrl - Download URL
     * @return {PassThrough}
     */
    getStream(downloadUrl: string): Promise<PassThrough | undefined>;
}

import { TinyHttpClient } from 'hanif-tiny-http';
import type { Genre, Anime, OngoingAnime } from './types';
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
     * @description You can use this method for getting anime information.
     * @param {String} anime - Fill this parameter with anime name. (Eg. Boruto)
     * @return {Anime[]}
     */
    getAnime(anime: string): Promise<Anime[]>;
}

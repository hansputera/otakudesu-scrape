import {TinyHttpClient} from 'hanif-tiny-http';
import {PassThrough} from 'node:stream';

import {baseURL} from './constants';
import {
  getAnime, getExtraAnime, getGenreList,
  getOngoingList, getDownloads, getHomeUpdates,
  getAnimeStream,
} from './scraper';

import type {
  Genre, Anime, OngoingAnime, ExtraAnime,
  Download, HomeAnimeUpdate,
} from './types';
import {OtakUtil} from './util';

/**
 * @description - Otakudesu Instance, here you go.
 */
export class OtakudesuInstance {
  /**
     *
     * @param {String} baseUrl - Base URL For Otakudesu site
     */
  constructor(private baseUrl: string = baseURL) {
    if (!OtakUtil.validateURL(baseUrl)) {
      throw new TypeError('Invalid Base URL URL');
    }
  };

  public request = new TinyHttpClient({
    baseURL: this.baseUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  /**
   * @description You can use this method for getting genre list.
   * @return {Genre[]}
   */
  public listGenre(): Promise<Genre[]> {
    return getGenreList(this.request);
  }

  /**
   * @description You can use this method for getting ongoing anime list.
   * @return {OngoingAnime[]}
   */
  public listOngoing(): Promise<OngoingAnime[]> {
    return getOngoingList(this.request);
  }

  /**
   * @description You can use this method for getting news update from
   * site homepage.
   * @return {HomeAnimeUpdate[]}
   */
  public listHomeUpdate(): Promise<HomeAnimeUpdate[]> {
    return getHomeUpdates(this.request);
  }

  /**
   * @description You can use this method for getting anime information.
   * @param {String} anime - Fill this parameter with anime name. (Eg. Boruto)
   * @return {Anime[]}
   */
  public getAnime(anime: string): Promise<Anime[]> {
    return getAnime(this.request, anime);
  }

  /**
   * @description You can use this method for getting extra anime information.
   * @param {String} slugAnime - Fill this parameter with anime slug.
   * @return {ExtraAnime}
   */
  public getExtraAnime(slugAnime: string): Promise<ExtraAnime | undefined> {
    return getExtraAnime(this.request, slugAnime);
  }

  /**
   * @description You can use this method for getting otakudesu download(s) url.
   * @param {String} downloadUrl - Download URL (Episode URL)
   * @return {Download[]}
   */
  public getDownloadsByUrl(downloadUrl: string): Promise<Download[]> {
    return getDownloads(this.request, downloadUrl);
  }

  /**
   * @param {String} downloadUrl - Download URL
   * @return {PassThrough}
   */
  public getStream(downloadUrl: string): Promise<PassThrough | undefined> {
    return getAnimeStream(this.request, downloadUrl);
  }
}


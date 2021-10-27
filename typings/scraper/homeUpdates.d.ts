import { TinyHttpClient } from 'hanif-tiny-http';
import { HomeAnimeUpdate } from '../types';
export declare const getHomeUpdates: (request: TinyHttpClient) => Promise<HomeAnimeUpdate[]>;

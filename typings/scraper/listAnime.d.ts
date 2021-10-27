import { TinyHttpClient } from 'hanif-tiny-http';
import type { AnimeListItem } from '../types';
export declare const getListAnime: (request: TinyHttpClient) => Promise<AnimeListItem[]>;

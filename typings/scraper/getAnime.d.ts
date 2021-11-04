import { TinyHttpClient } from 'hanif-tiny-http';
import type { Anime } from '../types';
export declare const getAnime: (request: TinyHttpClient, q: string, ext?: boolean) => Promise<Anime[]>;
